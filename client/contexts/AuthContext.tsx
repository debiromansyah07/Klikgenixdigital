import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { authStorage } from "@/lib/api";

interface User {
  id: string;
  fullName: string;
  email: string;
  plan?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in on app start
    const storedUser = authStorage.getUser();
    const storedToken = authStorage.getToken();

    if (storedUser && storedToken) {
      setUser(storedUser);
    }

    setLoading(false);
  }, []);

  const login = (userData: User, token: string) => {
    setUser(userData);
    authStorage.setUser(userData);
    authStorage.setToken(token);
  };

  const logout = () => {
    setUser(null);
    authStorage.removeUser();
    authStorage.removeToken();
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
