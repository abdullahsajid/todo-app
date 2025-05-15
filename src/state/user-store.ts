import { create } from "zustand";

interface UserState {
  user: string | undefined;
  setUser: (user: string) => void;
  resetUser: () => void;
}
const useUserStore = create<UserState>((set) => ({
  user: undefined,
  setUser: (user) => set({ user }),
  resetUser: () => set({ user: undefined }),
}));

export default useUserStore;
