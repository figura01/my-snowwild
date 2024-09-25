/* eslint-disable @next/next/no-img-element */
import { useCart } from "@/contexts/CartContext";
import Link from "next/link";
import { useState } from "react";
import DropdownUser from "@/components/dropdown/dropdownuser";
import { TrendingUpIcon } from "lucide-react";

const TopBar: React.FC = () => {
  const { getItemCount } = useCart();
  const itemCount = getItemCount();

  const [showDropdownUser, setShowDropdowUser] = useState(false); 

  const toggleDropdown = () => {
    setShowDropdowUser(!showDropdownUser); 
   
  }

  return (
    <div>
      <nav className="bg-white p-4 px-20 flex items-center justify-between font-poppins">
        <Link href="/">
          <img
            src="/logoblanc.png"
            alt="logo"
            width={150}
            height={100}
            className="filter grayscale"
          />
        </Link>
        <div className="flex-1 flex justify-center">
          <div className="flex space-x-20">
            <Link href="/" className="text-black hover:text-gray-600">
              Qui sommes-nous
            </Link>
            <Link href="/user/advantages" className="text-black hover:text-gray-600">
              Nos avantages
            </Link>
            <Link
              href="/user/station"
              className="text-black hover:text-gray-600"
            >
              Notre station 
            </Link>
            <Link href="/" className="text-black hover:text-gray-600">
              Notre materiel
            </Link>
          </div>
        </div>
        <div className="flex space-x-10 relative">
         <button onClick={toggleDropdown} className="text-black relative">
            <svg
              className="h-8 w-8"
              fill="none"
              stroke="black"
              viewBox="0 0 448 512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                fill="#000000"
                d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"
              />
            </svg> 
            {showDropdownUser && <DropdownUser />} 
          </button>
          <Link href="/user/basket" className="text-black relative"> 
            <svg
              className="h-8 w-8"
              fill="none"
              stroke="black"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 7M7 13L6 18h12m-4 4a2 2 0 100-4 2 2 0 000 4zm-8 0a2 2 0 100-4 2 2 0 000 4z"
              />
            </svg>
            {itemCount > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </nav>
    

      <div className=" bg-black p-5 px-20 flex items-center justify-between font-poppins"></div>
    </div>
  );
};

export default TopBar;
