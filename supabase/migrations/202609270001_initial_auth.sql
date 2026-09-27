create extension if not exists citext with schema extensions;

create type public.program_role as enum ('mentee', 'mentor', 'coordinator', 'admin');
create type public.profile_status as enum ('invited', 'active', 'inactive');
create type public.program_status as enum ('draft', 'active', 'archived');

create schema if not exists private;
revoke all on schema private from public, anon, authenticated;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  first_name text not null default '',
  last_name text not null default '',
  psu_email extensions.citext not null unique,
  psu_id extensions.citext unique,
  phone text,
  major text,
  class_year integer check (class_year between 2020 and 2100),
  title text,
  bio text,
  avatar_path text,
  status public.profile_status not null default 'invited',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.programs (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  term text not null,
  starts_on date,
  ends_on date,
  status public.program_status not null default 'draft',
  mentor_reveal_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (name, term),
  check (ends_on is null or starts_on is null or ends_on >= starts_on)
);

create table public.cohorts (
  id uuid primary key default gen_random_uuid(),
  program_id uuid not null references public.programs(id) on delete cascade,
  name text not null,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (program_id, name),
  unique (id, program_id)
);

create table public.program_memberships (
  id uuid primary key default gen_random_uuid(),
  program_id uuid not null references public.programs(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  role public.program_role not null,
  cohort_id uuid,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (program_id, user_id),
  foreign key (cohort_id, program_id) references public.cohorts(id, program_id)
);

create index program_memberships_user_active_idx on public.program_memberships (user_id, active);
create index program_memberships_program_role_idx on public.program_memberships (program_id, role) where active;

create trigger profiles_set_updated_at before update on public.profiles
for each row execute function public.set_updated_at();
create trigger programs_set_updated_at before update on public.programs
for each row execute function public.set_updated_at();
create trigger cohorts_set_updated_at before update on public.cohorts
for each row execute function public.set_updated_at();
create trigger memberships_set_updated_at before update on public.program_memberships
for each row execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, first_name, last_name, psu_email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'first_name', ''),
    coalesce(new.raw_user_meta_data ->> 'last_name', ''),
    new.email
  );
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

create or replace function private.is_program_manager(target_program_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.program_memberships membership
    where membership.program_id = target_program_id
      and membership.user_id = (select auth.uid())
      and membership.active
      and membership.role in ('coordinator', 'admin')
  );
$$;

create or replace function private.can_manage_user(target_user_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.program_memberships manager
    join public.program_memberships target on target.program_id = manager.program_id
    where manager.user_id = (select auth.uid())
      and manager.active
      and manager.role in ('coordinator', 'admin')
      and target.user_id = target_user_id
  );
$$;

revoke all on function private.is_program_manager(uuid) from public;
revoke all on function private.can_manage_user(uuid) from public;
grant usage on schema private to authenticated;
grant execute on function private.is_program_manager(uuid) to authenticated;
grant execute on function private.can_manage_user(uuid) to authenticated;

alter table public.profiles enable row level security;
alter table public.programs enable row level security;
alter table public.cohorts enable row level security;
alter table public.program_memberships enable row level security;

revoke all on public.profiles, public.programs, public.cohorts, public.program_memberships from anon;
grant select on public.profiles to authenticated;
grant update (first_name, last_name, phone, major, class_year, title, bio, avatar_path) on public.profiles to authenticated;
grant select, insert, update, delete on public.programs, public.cohorts, public.program_memberships to authenticated;

create policy profiles_select on public.profiles
for select to authenticated
using ((select auth.uid()) = id or private.can_manage_user(id));

create policy profiles_update_self on public.profiles
for update to authenticated
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id);

create policy programs_select_member on public.programs
for select to authenticated
using (exists (
  select 1 from public.program_memberships membership
  where membership.program_id = programs.id
    and membership.user_id = (select auth.uid())
    and membership.active
));

create policy programs_update_manager on public.programs
for update to authenticated
using (private.is_program_manager(id))
with check (private.is_program_manager(id));

create policy cohorts_select_member on public.cohorts
for select to authenticated
using (exists (
  select 1 from public.program_memberships membership
  where membership.program_id = cohorts.program_id
    and membership.user_id = (select auth.uid())
    and membership.active
));

create policy cohorts_insert_manager on public.cohorts
for insert to authenticated
with check (private.is_program_manager(program_id));

create policy cohorts_update_manager on public.cohorts
for update to authenticated
using (private.is_program_manager(program_id))
with check (private.is_program_manager(program_id));

create policy cohorts_delete_manager on public.cohorts
for delete to authenticated
using (private.is_program_manager(program_id));

create policy memberships_select_self_or_manager on public.program_memberships
for select to authenticated
using (user_id = (select auth.uid()) or private.is_program_manager(program_id));

create policy memberships_insert_manager on public.program_memberships
for insert to authenticated
with check (private.is_program_manager(program_id));

create policy memberships_update_manager on public.program_memberships
for update to authenticated
using (private.is_program_manager(program_id))
with check (private.is_program_manager(program_id));

create policy memberships_delete_manager on public.program_memberships
for delete to authenticated
using (private.is_program_manager(program_id));
