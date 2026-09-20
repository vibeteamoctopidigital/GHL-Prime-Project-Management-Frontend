import { Shield, Briefcase, Star, User } from 'lucide-react';

// Role → badge icon, shared by the member card and the detail modal.
export function getRoleIcon(role?: string) {
  if (role === 'HR') return Briefcase;
  if (role === 'CEO' || role === 'DEPT HEAD') return Shield;
  if (role === 'Team Lead') return Star;
  return User;
}
