import type { Session, User } from "@supabase/supabase-js"
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import { isSupabaseConfigured, supabase } from "../lib/supabase"
import type { Database, ProgramRole } from "../types/database.types"

type Profile = Database["public"]["Tables"]["profiles"]["Row"]
type Membership = Database["public"]["Tables"]["program_memberships"]["Row"]

type AuthContextValue = {
  configured: boolean
  loading: boolean
  session: Session | null
  user: User | null
  profile: Profile | null
  membership: Membership | null
  role: ProgramRole | null
  error: string | null
  signIn: (email: string, password: string) => Promise<ProgramRole>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

async function loadUserContext(userId: string) {
  if (!supabase) return { profile: null, membership: null }

  const [profileResult, membershipResult] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", userId).maybeSingle(),
    supabase
      .from("program_memberships")
      .select("*")
      .eq("user_id", userId)
      .eq("active", true)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle(),
  ])

  if (profileResult.error) throw profileResult.error
  if (membershipResult.error) throw membershipResult.error

  return { profile: profileResult.data, membership: membershipResult.data }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(isSupabaseConfigured)
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [membership, setMembership] = useState<Membership | null>(null)
  const [error, setError] = useState<string | null>(null)

  const hydrate = useCallback(async (nextSession: Session | null) => {
    setSession(nextSession)
    setError(null)

    if (!nextSession?.user) {
      setProfile(null)
      setMembership(null)
      setLoading(false)
      return
    }

    try {
      const context = await loadUserContext(nextSession.user.id)
      setProfile(context.profile)
      setMembership(context.membership)
    } catch (contextError) {
      setProfile(null)
      setMembership(null)
      setError(
        contextError instanceof Error
          ? contextError.message
          : "Unable to load your MEPO access.",
      )
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      return
    }

    void supabase.auth.getSession().then(({ data, error: sessionError }) => {
      if (sessionError) {
        setError(sessionError.message)
        setLoading(false)
        return
      }
      void hydrate(data.session)
    })

    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      void hydrate(nextSession)
    })

    return () => data.subscription.unsubscribe()
  }, [hydrate])

  const signIn = useCallback(async (email: string, password: string) => {
    if (!supabase)
      throw new Error(
        "Supabase is not configured. Add the values from .env.example to .env.local.",
      )

    setLoading(true)
    setError(null)
    const { data, error: signInError } = await supabase.auth.signInWithPassword(
      { email, password },
    )
    if (signInError) {
      setLoading(false)
      throw signInError
    }

    const context = await loadUserContext(data.user.id)
    setSession(data.session)
    setProfile(context.profile)
    setMembership(context.membership)
    setLoading(false)

    if (!context.membership)
      throw new Error(
        "Your account has not been assigned to an active MEPO program.",
      )
    return context.membership.role
  }, [])

  const signOut = useCallback(async () => {
    if (supabase) {
      const { error: signOutError } = await supabase.auth.signOut()
      if (signOutError) throw signOutError
    }
    setSession(null)
    setProfile(null)
    setMembership(null)
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      configured: isSupabaseConfigured,
      loading,
      session,
      user: session?.user ?? null,
      profile,
      membership,
      role: membership?.role ?? null,
      error,
      signIn,
      signOut,
    }),
    [error, loading, membership, profile, session, signIn, signOut],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used inside AuthProvider.")
  return context
}
