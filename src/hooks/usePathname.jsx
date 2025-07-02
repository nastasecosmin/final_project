export const usePathname = () => {
  if (typeof window !== "undefined") {
    return window.location.pathname;
  }

  return "";
};
