interface UserState {
  user?: IUser;
  setUser: (user: IUser) => void;
  resetUser: () => void;
}
