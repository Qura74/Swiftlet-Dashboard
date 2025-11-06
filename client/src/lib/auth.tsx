import { createContext, useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

interface AuthUser {
  username: string | null;
  role: string | null;
  token: string | null;
}

interface AuthContextProps {
  user: AuthUser;
  login: (token: string, username: string, role: string) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextProps>({
  user: { username: null, role: null, token: null },
  login: () => {},
  logout: () => {},
  loading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser>({
    username: localStorage.getItem("username"),
    role: localStorage.getItem("role"),
    token: localStorage.getItem("token"),
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 300);
  }, []);

  const login = (token: string, username: string, role: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    localStorage.setItem("role", role);
    setUser({ token, username, role });
  };

  const logout = () => {
    localStorage.clear();
    setUser({ username: null, role: null, token: null });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export function RequireAuth({ children }: { children: JSX.Element }) {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user.token) return <Navigate to="/sign-in" replace />;

  return children;
}
