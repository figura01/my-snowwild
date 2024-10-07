/* eslint-disable @next/next/no-img-element */
import { useStepper } from "@/components/stepper";
import {
  BANK_STORAGE_KEY,
  CART_STORAGE_KEY,
  DATES_STORAGE_KEY,
} from "@/constants";
import { AuthContext } from "@/contexts/authContext";
import { useCart } from "@/contexts/CartContext";
import { EmptyLocalStorage } from "@/hooks/useLocalStorage";
import { CREATE_RESERVATION } from "@/requetes/mutations/reservation.mutations";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useContext } from "react";
import StepperFormActions from "./ReservationActions";
import { DateFormInfos } from "@/types/form";

function BasketComponent({ dateFormInfo }: { dateFormInfo: DateFormInfos }) {
  const router = useRouter();

  const { user } = useContext(AuthContext);
  const { cart, setCart } = useCart();
  const [createReservation] = useMutation(CREATE_RESERVATION);
  console.log("userReser", user);
  console.log("DATE", dateFormInfo);

  const reservationMaterials = cart.map((item) => ({
    materialId: item.id,
    quantity: item.quantity,
    size: item.selectedSize,
  }));
  const { nextStep } = useStepper();
  const hasItemInBasket = reservationMaterials.length < 0;
  const handleSubmit = async () => {
    if (reservationMaterials.length === 0) {
      console.error("Error: No materials to reserve.");
      router.push("/");
      return;
    }

    try {
      const response = await createReservation({
        variables: {
          data: {
            start_date: dateFormInfo.start_date,
            end_date: dateFormInfo.end_date,
            materials: reservationMaterials,
            user: {
              id: user?.userId,
            },
          },
        },
      });
      console.log("Reservation created successfully:", response.data);
      
      nextStep();
    } catch (error) {
      console.error("Error creating reservation:", error);
    }
  };

  // if (activeStep !== steps.length) {
  //   return null;
  // }
  const numberOfArticleText = "Nombre d'articles";
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  return (
    <>
      <main className="container mx-auto px-4 py-8 font-poppins grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="col-span-2 ">
          <h1 className="text-3xl text-neutral-950 font-bold mb-8 mt-8">
            Votre panier
          </h1>
          <div className="space-y-4 rounded-lg  max-h-96 overflow-y-auto ">
            {cart.map((item, index) => (
              <div
                key={`${item.id}-${item.selectedSize}`}
                className="bg-white flex overflow-hidden relative"
              >
                <div className="relative h-48">
                  <img
                    className="m-5 max-w-28 object-contain"
                    src={process.env.NEXT_PUBLIC_IMAGE_URL + item.picture}
                    alt={item.name}
                  />
                </div>
                <div className="p-6 flex flex-col w-full">
                  
                    <h2 className="text-2xl font-bold mb-2">{item.name}</h2>
                    <div className=" flex mt-2 items-center gap-6 ">
                    <p className="text-gray-700">
                      Taille : <span className="underline">{item.selectedSize}</span>
                    </p>
                    <div className="flex items-center">
                      <span className="mr-2">Quantité : {item.quantity}</span>
                    </div>
                  </div>
                </div>
                {index < cart.length - 1 && (
                  <div className="absolute bottom-0 mt-2 left-6 right-6 border-t-2 border-black"></div>
                )}
                {/* {index < cart.length - 1 && (
                  <div className="flex justify-center">
                    <div className="border-t-2 border-gray-300 w-2/3"></div>
                  </div>
                )} */}
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-1">
          <div className="bg-white p-5 rounded-lg ">
            <h2 className="text-2xl font-bold mb-4">Récapitulatif</h2>
            <div className="flex justify-between mt-6 items-center border-b-2 pb-2">
              <p className="text-gray-700">{numberOfArticleText}</p>
              <p className="text-gray-700">{totalItems}</p>
            </div>
            <div className="flex justify-between items-center pt-2">
              <p className="text-gray-700">Total :</p>
              <p className="text-gray-700">{totalPrice}€</p>
            </div>
            <StepperFormActions handleSubmit={handleSubmit} />
          </div>
        </div>
      </main>
    </>
  );
}

export default BasketComponent;
