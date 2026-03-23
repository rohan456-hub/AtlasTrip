import { createContext, useContext, useEffect, useState } from "react";
import { getJson, postJson } from "../api/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("travel_token"));
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("travel_user");
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(Boolean(token));

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    getJson("/auth/me", token)
      .then((data) => setUser(data))
      .catch(() => logout())
      .finally(() => setLoading(false));
  }, [token]);

  const persist = (nextToken, nextUser) => {
    setToken(nextToken);
    setUser(nextUser);
    localStorage.setItem("travel_token", nextToken);
    localStorage.setItem("travel_user", JSON.stringify(nextUser));
  };

  const login = async (payload) => {
    const data = await postJson("/auth/login", payload);
    persist(data.token, data.user);
  };

  const register = async (payload) => {
    const data = await postJson("/auth/register", payload);
    persist(data.token, data.user);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("travel_token");
    localStorage.removeItem("travel_user");
  };

  return (
    <AuthContext.Provider value={{ token, user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
