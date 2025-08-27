import { createContext, useState, useContext, useEffect } from 'react';
import { login as loginService } from '../services/auth.service';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('authToken'));

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const isExpired = decodedToken.exp * 1000 < Date.now();
        if (isExpired) {
          logout();
        } else {
          setUser({
            id: decodedToken.id,
            nome: decodedToken.nome,
            email: decodedToken.sub,
            role: decodedToken.role,
          });
        }
      } catch (error) {
        console.error("Invalid token:", error);
        logout();
      }
    }
  }, [token]);

  const login = async (email, password) => {
    const data = await loginService(email, password);
    localStorage.setItem('authToken', data.access_token);
    setToken(data.access_token);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);