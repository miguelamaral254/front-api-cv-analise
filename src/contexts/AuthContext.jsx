import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { login as loginService } from '../services/auth.service';
import { jwtDecode } from 'jwt-decode';

// Agora exportamos o contexto para que o hook possa usá-lo em outro arquivo
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('authToken'));

  const logout = useCallback(() => {
    localStorage.removeItem('authToken');
    setUser(null);
    setToken(null);
  }, []);

  useEffect(() => {
    let logoutTimer;

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now();
        const expiryTime = decodedToken.exp * 1000;
        const timeRemaining = expiryTime - currentTime;

        if (timeRemaining > 0) {
          setUser({
            id: decodedToken.id,
            nome: decodedToken.nome,
            email: decodedToken.sub,
            role: decodedToken.role,
          });
          logoutTimer = setTimeout(logout, timeRemaining);
        } else {
          logout();
        }
      } catch (error) {
        console.error("Token inválido:", error);
        logout();
      }
    }

    return () => {
      if (logoutTimer) {
        clearTimeout(logoutTimer);
      }
    };
  }, [token, logout]);

  const login = async (email, password) => {
    const data = await loginService(email, password);
    localStorage.setItem('authToken', data.access_token);
    setToken(data.access_token);
  };

  const updateUserContext = (updatedUserData) => {
    setUser(prevUser => ({ ...prevUser, ...updatedUserData }));
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, updateUserContext }}>
      {children}
    </AuthContext.Provider>
  );
};
