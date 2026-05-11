"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("kaimovie_user");
    if (saved) setUser(JSON.parse(saved));
    setLoading(false);
  }, []);

  const register = (username, password) => {
    const users = JSON.parse(localStorage.getItem("kaimovie_users") || "{}");
    if (users[username]) return { error: "Username sudah dipakai" };
    users[username] = { password, createdAt: Date.now() };
    localStorage.setItem("kaimovie_users", JSON.stringify(users));
    const userData = { username, avatar: username[0].toUpperCase() };
    localStorage.setItem("kaimovie_user", JSON.stringify(userData));
    setUser(userData);
    return { success: true };
  };

  const login = (username, password) => {
    const users = JSON.parse(localStorage.getItem("kaimovie_users") || "{}");
    if (!users[username]) return { error: "Username tidak ditemukan" };
    if (users[username].password !== password) return { error: "Password salah" };
    const userData = { username, avatar: username[0].toUpperCase() };
    localStorage.setItem("kaimovie_user", JSON.stringify(userData));
    setUser(userData);
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem("kaimovie_user");
    setUser(null);
  };

  // Watch history
  const addToHistory = (item) => {
    if (!user) return;
    const key = `kaimovie_history_${user.username}`;
    const history = JSON.parse(localStorage.getItem(key) || "[]");
    const existing = history.findIndex((h) => h.id === item.id && h.type === item.type);
    if (existing !== -1) history.splice(existing, 1);
    history.unshift({
      ...item,
      watchedAt: Date.now(),
    });
    // Keep max 50 items
    localStorage.setItem(key, JSON.stringify(history.slice(0, 50)));
  };

  const getHistory = () => {
    if (!user) return [];
    const key = `kaimovie_history_${user.username}`;
    return JSON.parse(localStorage.getItem(key) || "[]");
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout, addToHistory, getHistory }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
