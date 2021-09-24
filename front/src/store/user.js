import create from 'zustand';

const userStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

export default userStore;
