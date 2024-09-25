import { REGISTER } from "@/requetes/mutations/auth.mutations";
import { RegisterInput } from "@/types/auth";
import { useMutation } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";

function Register() {
  const router = useRouter();
  const [register, { data, loading, error }] = useMutation(REGISTER);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formDataObject = Object.fromEntries(formData.entries());
    const data = formDataObject as unknown as RegisterInput;

    if (
      data.email &&
      data.password &&
      data.lastName &&
      data.firstName &&
      data.phone
    ) {
      try {
        const response = await register({
          variables: {
            infos: {
              email: data.email,
              password: data.password,
              lastName: data.lastName,
              firstName: data.firstName,
              phone: data.phone,
            },
          },
        });

        if (response.data) {
          router.push("/success");
        }
      } catch (err) {
        console.error("Error registering user:", err);
      }
    } else {
      console.error("All fields are required");
    }
  };

  const errorWhenRegisterText = `Erreur lors de l'inscription`;

  return (
    <main className="flex min-h-3/4 m-8 flex-col items-center justify-center p-8 font-poppins">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 shadow-md rounded-lg w-1/2"
      >
        <h1 className="font-bold text-center text-2xl mb-10 text-black">
          Inscription
        </h1>
        <div className="mb-6">
          <input
            type="text"
            name="firstName"
            placeholder="Prénom"
            className="w-full px-4 py-2 border rounded-lg text-black placeholder-gray-500"
            required
          />
        </div>
        <div className="mb-6">
          <input
            type="text"
            name="lastName"
            placeholder="Nom"
            className="w-full px-4 py-2 border rounded-lg text-black placeholder-gray-500"
            required
          />
        </div>
        <div className="mb-6">
          <input
            type="email"
            name="email"
            placeholder="Indiquez votre email"
            className="w-full px-4 py-2 border rounded-lg text-black placeholder-gray-500"
            required
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            name="password"
            placeholder="Indiquez votre mot de passe"
            className="w-full px-4 py-2 border rounded-lg text-black placeholder-gray-500"
            required
          />
        </div>
        <div className="mb-6">
          <input
            type="tel"
            name="phone"
            placeholder="06..."
            className="w-full px-4 py-2 border rounded-lg text-black placeholder-gray-500"
            required
          />
        </div>
        <input
          type="submit"
          value="S'inscrire"
          className="w-1/2 bg-black text-white py-2 rounded-lg hover:bg-neutral-100 hover:text-neutral-950 hover:font-bold cursor-pointer"
          style={{ display: "block", margin: "0 auto" }}
        />
      </form>
      {loading && <p className="text-center">Inscription en cours...</p>}
      {error && (
        <p className="text-center text-red-500">
          {errorWhenRegisterText} : {error.message}
        </p>
      )}
      {data && (
        <p className="text-center text-blue-500">Inscription réussie!</p>
      )}
      <div className="mt-8 text-center">
        <Link
          href="/auth/reset"
          className="text-black hover:text-gray-600 block"
        >
          Mot de passe oublié?
        </Link>
        <Link
          href="/auth/login"
          className="text-black hover:text-gray-600 block mt-2"
        >
          Déjà inscrit ? Connectez-vous
        </Link>
      </div>
    </main>
  );
}

export default Register;
