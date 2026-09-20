import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { normalizeRole, type TeamMember } from '@/lib/types';

export type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'unauthenticated';

interface AuthState {
  user: TeamMember | null;
  status: AuthStatus;
  showPasswordModal: boolean;
}

const initialState: AuthState = {
  user: null,
  status: 'idle',
  showPasswordModal: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setStatus(state, action: PayloadAction<AuthStatus>) {
      state.status = action.payload;
    },
    setUser(state, action: PayloadAction<TeamMember | null>) {
      // Canonicalise the role on the way in (see normalizeRole): a row created
      // before the role rename would otherwise match none of the UI's role
      // lists, leaving e.g. the sidebar with no nav links at all.
      const user = action.payload;
      state.user = user ? { ...user, role: normalizeRole(user.role) ?? user.role } : null;
      state.status = state.user ? 'authenticated' : 'unauthenticated';
    },
    patchUser(state, action: PayloadAction<Partial<TeamMember>>) {
      if (state.user) state.user = { ...state.user, ...action.payload };
    },
    clearAuth(state) {
      state.user = null;
      state.status = 'unauthenticated';
      state.showPasswordModal = false;
    },
    setShowPasswordModal(state, action: PayloadAction<boolean>) {
      state.showPasswordModal = action.payload;
    },
  },
});

export const { setStatus, setUser, patchUser, clearAuth, setShowPasswordModal } = authSlice.actions;
export default authSlice.reducer;
