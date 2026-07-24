import React, { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for saved token on mount
    const savedToken = localStorage.getItem('sagason_token');
    if (savedToken) {
      try {
        const decoded = jwtDecode(savedToken);
        // Simple expiry check
        if (decoded.exp * 1000 < Date.now()) {
          logout();
        } else {
          setToken(savedToken);
          // We can optionally fetch the full user profile from the backend using the token here
          // For now, we just rely on what we saved in localStorage during login
          const savedUser = localStorage.getItem('sagason_user');
          if (savedUser) {
            setUser(JSON.parse(savedUser));
          }
        }
      } catch (e) {
        logout();
      }
    }
    setLoading(false);
  }, []);

  const login = async (credential, gdprConsent = true) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ credential, gdprConsent }),
      });

      if (!response.ok) {
        throw new Error('Authentication failed');
      }

      const data = await response.json();
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('sagason_token', data.token);
      localStorage.setItem('sagason_user', JSON.stringify(data.user));
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('sagason_token');
    localStorage.removeItem('sagason_user');
  };

  // B2B Company Validation
  const verifyCompanyStatus = (companyData) => {
    const updatedUser = {
      ...(user || { name: companyData.name || 'Usuario Empresa', email: companyData.email || 'empresa@sagason.cl' }),
      isCompany: true,
      isCompanyVerified: true,
      companyData: {
        ...companyData,
        verifiedAt: new Date().toISOString()
      }
    };
    setUser(updatedUser);
    localStorage.setItem('sagason_user', JSON.stringify(updatedUser));
    return updatedUser;
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, deleteAccount, verifyCompanyStatus }}>
      {children}
    </AuthContext.Provider>
  );
};
