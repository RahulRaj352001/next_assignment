"use client";

export const checkAuth = (): boolean => {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("isLoggedIn") === "true";
};

export const requireAuth = () => {
  if (typeof window !== "undefined" && !checkAuth()) {
    window.location.href = "/login";
    return false;
  }
  return true;
};
