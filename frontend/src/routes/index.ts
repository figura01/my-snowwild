export type Route = {
  pathname: string;
  title: string;
  protected: Protected;
};

export type Protected = "ADMIN" | "PRIVATE" | "PUBLIC";

export const routes: { [key: string]: Route } = {
  home: {
    pathname: "/",
    title: "Accueil",
    protected: "PUBLIC",
  },
  login: {
    pathname: "/auth/login",
    title: "Connexion",
    protected: "PUBLIC",
  },
  logout: {
    pathname: "/auth/logout",
    title: "Déconnexion",
    protected: "PUBLIC",
  },
  register: {
    pathname: "/auth/register",
    title: "Créer un compte",
    protected: "PUBLIC",
  },
  adminUsers: {
    pathname: "/admin/users",
    title: "Gestion des utilisateurs",
    protected: "ADMIN",
  },
  adminCreateProducts: {
    pathname: "/admin/products/create",
    title: "Créer un produit",
    protected: "ADMIN",
  },
  adminOneProducts: {
    pathname: "/admin/products/:id",
    title: "Gestion un materiel",
    protected: "ADMIN",
  },
  adminProducts: {
    pathname: "/admin/products",
    title: "Gestion des materiels",
    protected: "ADMIN",
  },
  adminMaterials: {
    pathname: "/admin/materials",
    title: "Gestion des materiels",
    protected: "ADMIN",
  },
  adminCategories: {
    pathname: "/admin/categories",
    title: "Gestion des categories",
    protected: "ADMIN",
  },
  adminReservations: {
    pathname: "/admin/reservations",
    title: "Gestion des reservations",
    protected: "ADMIN",
  },
  admin: {
    pathname: "/admin",
    title: "Dashboard",
    protected: "ADMIN",
  },
  profil: {
    pathname: "/profil",
    title: "Votre compte",
    protected: "PRIVATE",
  },
 
};