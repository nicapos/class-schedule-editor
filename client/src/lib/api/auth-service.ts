const AuthService = {
  signOut: () => {
    return fetch("http://localhost:8080/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
  },
};

export default AuthService;
