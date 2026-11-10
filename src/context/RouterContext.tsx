import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

interface RouterContextType {
  pathname: string;
  searchParams: URLSearchParams;
  navigate: (to: string, options?: { replace?: boolean }) => void;
  updateSearchParams: (params: Record<string, string | undefined>) => void;
}

const RouterContext = createContext<RouterContextType | null>(null);

export const useRouter = () => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error("useRouter must be used within a RouterProvider");
  }
  return context;
};

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pathname, setPathname] = useState<string>(
    typeof window !== "undefined" ? window.location.pathname || "/" : "/"
  );
  const [searchParams, setSearchParams] = useState<URLSearchParams>(
    new URLSearchParams(typeof window !== "undefined" ? window.location.search : "")
  );

  useEffect(() => {
    const handlePopState = () => {
      setPathname(window.location.pathname || "/");
      setSearchParams(new URLSearchParams(window.location.search));
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = useCallback((to: string, options?: { replace?: boolean }) => {
    const [pathPart, queryPart] = to.split("?");
    const targetPath = pathPart || "/";
    const targetQuery = queryPart ? `?${queryPart}` : "";
    const fullUrl = `${targetPath}${targetQuery}`;

    if (options?.replace) {
      window.history.replaceState({}, "", fullUrl);
    } else {
      window.history.pushState({}, "", fullUrl);
    }

    setPathname(targetPath);
    setSearchParams(new URLSearchParams(queryPart || ""));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const updateSearchParams = useCallback((updates: Record<string, string | undefined>) => {
    const current = new URLSearchParams(window.location.search);
    Object.entries(updates).forEach(([key, val]) => {
      if (val === undefined || val === "" || val === null) {
        current.delete(key);
      } else {
        current.set(key, val);
      }
    });
    const queryString = current.toString();
    const target = `${window.location.pathname}${queryString ? `?${queryString}` : ""}`;
    window.history.replaceState({}, "", target);
    setSearchParams(current);
  }, []);

  return (
    <RouterContext.Provider value={{ pathname, searchParams, navigate, updateSearchParams }}>
      {children}
    </RouterContext.Provider>
  );
};

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  className?: string;
  children: React.ReactNode;
}

export const Link: React.FC<LinkProps> = ({ to, className = "", children, onClick, ...rest }) => {
  const { navigate } = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);
    if (!e.defaultPrevented && e.button === 0 && !e.metaKey && !e.ctrlKey && !e.altKey && !e.shiftKey) {
      e.preventDefault();
      navigate(to);
    }
  };

  return (
    <a href={to} onClick={handleClick} className={className} {...rest}>
      {children}
    </a>
  );
};
