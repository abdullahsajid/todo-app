namespace UserService {
  export const authenticateUser = async (walletAddress: string) => {
    const body = JSON.stringify({
      walletAddress,
    });

    const res = await fetch("/api/auth", {
      method: "POST",
      body,
    });

    const user: IUser = await res.json();

    return user;
  };
}

export default UserService;
