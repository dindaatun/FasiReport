import { createContext, useContext, useState, useEffect } from "react";
import { dataService } from "../services/dataService";
const AuthContext = createContext(void 0);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState(null);
  useEffect(() => {
    try {
      const existingUser = dataService.getCurrentUser();
      const existingToken = dataService.getToken();
      if (existingUser && existingToken) {
        setUser(existingUser);
        setToken(existingToken);
      }
    } catch (err) {
      console.warn("Failed to restore session:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);
  const showToast = (message, type = "info") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((prev) => prev?.message === message ? null : prev);
    }, 4e3);
  };
  const login = async (email, password) => {
    try {
      const res = dataService.login(email, password);
      setUser(res.user);
      setToken(res.token);
      showToast(`Selamat datang kembali, ${res.user.name}!`, "success");
    } catch (err) {
      showToast(err.message || "Gagal masuk", "error");
      throw err;
    }
  };
  const logout = () => {
    dataService.logout();
    setUser(null);
    setToken(null);
    showToast("Anda telah berhasil keluar dari sistem.", "info");
  };
  return <AuthContext.Provider
    value={{
      user,
      token,
      isLoading,
      toast,
      showToast,
      login,
      logout
    }}
  >
      {children}
    </AuthContext.Provider>;
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
