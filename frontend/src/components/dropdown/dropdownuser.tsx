 "use client"
import { AuthContext } from "@/contexts/authContext";
import { LOGIN } from "@/requetes/queries/auth.queries";
import { useLazyQuery } from "@apollo/client";
import Link from "next/link";
import router, { useRouter } from "next/router";
import React, { useContext } from "react";



const DropdownUser: React.FC = () => {

    const { user, setAuthUser, logout } = useContext(AuthContext);
    const router = useRouter();
    const [login, { data, error }] = useLazyQuery(LOGIN);

    console.log(user?.role)
  
   
    const handleConnect = () => {
    router.push("/auth/login");
     };

  const handleRegister = () => {
    router.push("/auth/register");
  };
  const handleLogout = () => {
    logout();

    router.push("/auth/login");
  };
   if (user?.role === "USER"){
    return ( <div className="absolute right-6 mt-2 w-96 bg-white shadow-lg rounded-lg z-50">
        <div className="p-5">
            <h2 className="text-left text-2xl ">Mon compte</h2>
            <h3 className="text-left text-lg mt-5 ">Bonjour {user.email}</h3>
            <div className=" flex flex-col text-left mt-5 mb-5 ">
            <Link href="/user/reservationUser" className="text-left mt-2 text-black hover:text-gray-600"> Mes informations</Link>
            <Link href="/user/reservationUser" className="text-left mt-2 text-black hover:text-gray-600"> Mes réservations </Link>
            <Link href="/user/reservationUser" className="text-left mt-2 text-black hover:text-gray-600"> Mes factures </Link>
            </div>
            
            <button onClick= {handleLogout} className="bg-black w-full text-white mt-4 p-2 rounded-lg hover:bg-neutral-100 hover:text-neutral-950 hover:font-bold cursor-pointer">  Je me deconnecte </button>
            </div>
        </div>)
        } else if (user?.role === "ADMIN"){
          return ( <div className="absolute right-6 mt-2 w-96 bg-white shadow-lg rounded-lg z-50">
            <div className="p-5">
                <h2 className="text-left text-2xl ">Mon compte</h2>
                <h3 className="text-left text-lg mt-5 ">Bonjour {user.email}</h3>
                <div className=" flex flex-col text-left mt-5 mb-5 ">
                <Link href="/admin/dashboard" className="text-left mt-2 text-black hover:text-gray-600"> Mon Dashboard</Link>
                <Link href="/user/reservationUser" className="text-left mt-2 text-black hover:text-gray-600"> Mes réservations </Link>
                <Link href="/user/reservationUser" className="text-left mt-2 text-black hover:text-gray-600"> Mes factures </Link>
                </div>
                
                <button onClick= {handleLogout} className="bg-black w-full text-white mt-4 p-2 rounded-lg hover:bg-neutral-100 hover:text-neutral-950 hover:font-bold cursor-pointer">  Je me deconnecte </button>
                </div>
            </div>)
        }
  
    return (
      
        <div className="absolute right-6 mt-2 w-96 bg-white shadow-lg rounded-lg z-50">
            
        <div className="p-5">
          <h2 className="text-left text-2xl ">Mon compte</h2>
          <h3 className="text-left text-base mt-5 ">Déjà Snow wilder ?</h3>
          <p className="text-left text-sm mt-2 ">Connectez-vous pour bénéficier d'une expérience personnalisée et accéder à vos offres et avantages.</p>
          <button onClick= {handleConnect} className="bg-black w-full text-white mt-4 p-2 rounded-lg hover:bg-neutral-100 hover:text-neutral-950 hover:font-bold cursor-pointer"> Je me connecte </button>
          <h3 className="text-left text-base mt-5  ">Pas encore dans la team ?</h3>
          <button onClick= {handleRegister} className="bg-black w-full text-white mt-4 p-2 rounded-lg hover:bg-neutral-100 hover:text-neutral-950 hover:font-bold cursor-pointer">  Je créé mon compte </button>
        </div>
      </div>
    )
   }
  
  export default DropdownUser