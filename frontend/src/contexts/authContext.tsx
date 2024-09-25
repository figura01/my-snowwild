import Cookies from "js-cookie";
import { createContext, useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { LOGOUT } from '@/requetes/queries/auth.queries';
import { useRouter } from "next/router";
import { toast } from "@/components/ui/use-toast";
type UserType = {
  email: string | undefined;
  userId: string | undefined;
  role: string | undefined;
};

const COOKIE_KEY = "authUser";
export const AuthContext = createContext<{
  user: UserType | null;
  setAuthUser: ({
    userId,
    email,
    role,
  }: {
    userId: string;
    email: string;
    role: string;
  }) => void;
  logout: () => void;
  authReady: boolean;
}>({
  user: null,
  setAuthUser: () => {},
  logout: () => {},
  authReady: false,

});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router= useRouter();
  const [user, setUser] = useState<UserType | null>(null);
  const [authReady, setAuthReady] = useState<boolean>(false);
  const [userLogout] = useLazyQuery(LOGOUT)
  const setAuthUser = ({
    userId,
    role,
    email,
  }: {
    userId: string;
    email: string;
    role: string;
  }) => {
    const userData = { userId, email, role };
    setUser(userData);
    Cookies.set(COOKIE_KEY, JSON.stringify(userData), { expires: 7 });
  };
  useEffect(() => {
    const storedUser = Cookies.get(COOKIE_KEY);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setAuthReady(true); // Indique que l'état d'authentification est prêt
  }, []);

  const logout = () => {
// Nettoyer le localStorage lors de la déconnexion
    userLogout({
      onCompleted: (data) => {
        console.log('user Logout: ', data)
        setUser(null);
        Cookies.remove(COOKIE_KEY);
        Cookies.remove("userId");
        Cookies.remove("role");
        Cookies.remove("email");
        toast({
          title: "Logout",
          description: data.logout.message
        })
        router.push("/")
      },
    })
  };

  return (
    <AuthContext.Provider value={{ user, setAuthUser, logout, authReady }}>
      {children}
    </AuthContext.Provider>
  );
};
