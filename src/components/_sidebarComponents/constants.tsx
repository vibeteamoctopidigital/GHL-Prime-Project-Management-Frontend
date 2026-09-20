import React from 'react';
import {
  LayoutDashboard,
  KanbanSquare,
  TableProperties,
  Calendar,
  Users,
  CreditCard,
  UserCircle,
  Building2,
  FileBarChart,
  KeyRound,
} from 'lucide-react';

export const navSections: {
  label: string;
  items: { href: string; label: string; icon: React.ComponentType<{ className?: string }>; roles: string[]; secondary?: boolean }[];
}[] = [
  {
    label: 'Workspace',
    items: [
      { href: '/board', label: 'My Board', icon: KanbanSquare, roles: ['CEO', 'HR', 'DEPT HEAD', 'Team Lead', 'team member'] },
      { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['CEO', 'HR', 'DEPT HEAD'] },
      { href: '/projects', label: 'Projects', icon: KanbanSquare, roles: ['CEO', 'HR', 'DEPT HEAD', 'Team Lead', 'team member'] },
      { href: '/daily', label: 'Daily Planner', icon: Calendar, roles: ['CEO', 'HR', 'DEPT HEAD', 'Team Lead', 'team member'], secondary: true },
    ],
  },
  {
    label: 'Manage',
    items: [
      { href: '/reports', label: 'Reports', icon: FileBarChart, roles: ['CEO', 'HR', 'DEPT HEAD', 'Team Lead', 'team member'] },
      { href: '/clients', label: 'Clients', icon: Building2, roles: ['CEO', 'HR', 'DEPT HEAD', 'Team Lead'] },
      { href: '/admin/tasks', label: 'Task Manager', icon: TableProperties, roles: ['CEO', 'HR', 'DEPT HEAD', 'Team Lead'], secondary: true },
      { href: '/admin/users', label: 'Team Directory', icon: Users, roles: ['CEO', 'HR', 'DEPT HEAD'] },
      { href: '/admin/users', label: 'Team Management', icon: Users, roles: ['Team Lead'] },
      { href: '/subscriptions', label: 'Subscriptions', icon: CreditCard, roles: ['CEO', 'HR', 'DEPT HEAD', 'Team Lead'] },
      { href: '/password-vault', label: 'Password Vault', icon: KeyRound, roles: ['CEO', 'HR', 'DEPT HEAD', 'Team Lead', 'team member'] },
    ],
  },
  {
    label: 'Account',
    items: [
      { href: '/profile', label: 'Profile', icon: UserCircle, roles: ['CEO', 'HR', 'DEPT HEAD', 'Team Lead', 'team member'] },
    ],
  },
];
