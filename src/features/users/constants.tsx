import React from 'react';
import { Shield, Briefcase, Star, User } from 'lucide-react';
import type { Role } from '@/lib/types';

// Shared role presentation + permission helpers for the Team Directory.
// Hierarchy: CEO > HR > DEPT HEAD > Team Lead > team member.

export function getRoleIcon(role: string) {
  switch (role) {
    case 'CEO': return <Shield className="w-3.5 h-3.5" />;
    case 'HR': return <Briefcase className="w-3.5 h-3.5" />;
    case 'DEPT HEAD': return <Shield className="w-3.5 h-3.5" />;
    case 'Team Lead': return <Star className="w-3.5 h-3.5" />;
    default: return <User className="w-3.5 h-3.5" />;
  }
}

export function getRoleBadge(role: string) {
  switch (role) {
    case 'CEO': return 'bg-violet-50 text-violet-600 border-violet-200';
    case 'HR': return 'bg-teal-50 text-teal-600 border-teal-200';
    case 'DEPT HEAD': return 'bg-red-50 text-red-600 border-red-200';
    case 'Team Lead': return 'bg-amber-50 text-amber-600 border-amber-200';
    default: return 'bg-sky-50 text-sky-600 border-sky-200';
  }
}

// Which roles the current user is allowed to assign (optionally for a given
// target). Mirrors ASSIGNABLE_ROLES in backend/src/modules/users/users.controller.ts
// — the server is what actually enforces this; here it only shapes the dropdown.
export function getAvailableRoles(currentRole: Role | undefined, targetRole?: string): Role[] {
  if (currentRole === 'CEO') return ['CEO', 'HR', 'DEPT HEAD', 'Team Lead', 'team member'];

  if (currentRole === 'HR') {
    // HR cannot promote to, or demote, anyone at or above its own rank.
    if (targetRole === 'CEO' || targetRole === 'HR') return [targetRole as Role];
    return ['DEPT HEAD', 'Team Lead', 'team member'];
  }

  if (currentRole === 'DEPT HEAD') {
    // Likewise, a DEPT HEAD can't change its own rank or anything above it.
    if (targetRole === 'CEO' || targetRole === 'HR' || targetRole === 'DEPT HEAD') {
      return [targetRole as Role];
    }
    return ['Team Lead', 'team member'];
  }

  if (currentRole === 'Team Lead') return ['team member'];
  return [];
}
