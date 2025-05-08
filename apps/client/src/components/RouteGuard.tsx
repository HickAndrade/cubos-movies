import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import LoadingModal from './LoadingModal'
import type { JSX } from 'react'

interface RouteGuardProps {
  children: JSX.Element
  requireAuth: boolean
  redirectTo?: string
}

export function RouteGuard({ children, requireAuth, redirectTo }: RouteGuardProps) {
  const { isAuth, isLoading } = useAuth()

  if (isLoading) return <LoadingModal />

  if (requireAuth && !isAuth) return <Navigate to={redirectTo || '/login'} />
  if (!requireAuth && isAuth) return <Navigate to={redirectTo || '/movies'} />

  return children
}
