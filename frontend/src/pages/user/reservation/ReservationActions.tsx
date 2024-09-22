import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
type HandleSubmitProps = () => Promise<void>;

function StepperFormActions({
  handleSubmit,
}: {
  handleSubmit: HandleSubmitProps;
}) {
  const router = useRouter();
  const backToHomePage = () => {
    router.push("/");
  };
  
  return (
    <div className="w-full flex justify-center mt-4 items-center gap-2">
      <>
        <Button
          type="submit"
          onClick={handleSubmit}
          className="my-2 mx-2 w-full bg-neutral-900 text-white rounded-full hover:bg-green-700"
        >
          Réserver et payer
        </Button>
        <Button
          onClick={backToHomePage}
          className=" bg-red-500 text-white rounded-full w-full hover:bg-red-700"
        >
          Abandonner
        </Button>
      </>
    </div>
  );
}

export default StepperFormActions;
