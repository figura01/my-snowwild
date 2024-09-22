import { AuthContext } from "@/contexts/authContext";
import { LOGIN } from "@/requetes/queries/auth.queries";
import { InputLogin } from "@/types/auth";
import { useLazyQuery } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";

function Login() {
  const { user, setAuthUser, logout } = useContext(AuthContext);
  const router = useRouter();
  const [login, { data, error }] = useLazyQuery(LOGIN);

  const handleLogout = () => {
    logout();

    router.push("/auth/login");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData) as unknown as InputLogin;
    if (data.email && data.password) {
      login({
        variables: { infos: { email: data.email, password: data.password } },
        onCompleted:(data) => {
          if (data) {
            setAuthUser({
              userId: data.login.id,
              email: data.login.email,
              role: data.login.role,
            });
            const redirectTo = router.query.redirect || "/";
            if (data?.login?.role === "ADMIN") {
              router.push("/admin/dashboard");
            } else {
              router.push(redirectTo as string);
            }
          }
        },
      });
    }
  };

  // if (user) {
  //   return (
  //     <main className="flex min-h-3/4 m-8 flex-col items-center justify-center p-8 font-poppins">
  //       <h1 className="font-bold text-center text-2xl mb-10 text-black">
  //         Bonjour, {user.email}!
  //       </h1>
  //       <a> Mes réservation </a>
  //       <button
  //         onClick={handleLogout}
  //         className="w-1/2 bg-black text-white py-2 rounded-lg hover:bg-neutral-100 hover:text-neutral-950 hover:font-bold cursor-pointer"
  //         style={{ display: "block", margin: "0 auto" }}
  //       >
  //         Déconnexion
  //       </button>
  //     </main>
  //   );
  // }

  return (
    <main className="flex min-h-3/4 m-8 flex-col items-center justify-center p-8 font-poppins">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 shadow-md rounded-lg w-1/2"
      >
        <h1 className="font-bold text-center text-2xl mb-10 text-black">
          Connexion
        </h1>
        <div className="mb-10">
          <input
            type="text"
            name="email"
            placeholder="Indiquez votre email"
            className="w-full px-4 py-2 border rounded-lg text-black placeholder-gray-500"
          />
        </div>
        <div className="mb-10">
          <input
            type="password"
            name="password"
            placeholder="Indiquez votre mot de passe"
            className="w-full px-4 py-2 border rounded-lg text-black placeholder-gray-500"
          />
        </div>
        <input
          type="submit"
          value="Je me connecte"
          className="w-1/2 bg-black text-white py-2 rounded-lg hover:bg-neutral-100 hover:text-neutral-950 hover:font-bold cursor-pointer"
          style={{ display: "block", margin: "0 auto" }}
        />
        <div className="mt-8 text-center">
          <span className="text-red-500 block">{error?.message}</span>
          {data?.login?.success ? (
            <span className="text-blue-500 block">{data?.login?.message}</span>
          ) : (
            <span className="text-red-500 block">{data?.login?.message}</span>
          )}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/auth/reset"
            className="text-black hover:text-gray-600 block"
          >
            Mot de passe oublié?
          </Link>
          <Link
            href="/auth/register"
            className="text-black hover:text-gray-600 block mt-2"
          >
            Pas encore inscrit ?
          </Link>
        </div>
      </form>
    </main>
  );
}

export default Login;