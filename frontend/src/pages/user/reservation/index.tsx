"use client";
import { Step, Stepper } from "@/components/stepper";
import "react-datepicker/dist/react-datepicker.css";
import ReservationDateStep from "./ReservationDateStep";
import ReservationPaiementStep from "./ReservationPaiementStep";

const steps = [
  { label: "Step 1", description: "Choix des dates" },
  { label: "Step 2", description: "Paiement" },
];

export default function StepperForm() {
  return (
    <div className="flex w-full flex-col gap-4 mt-8">
      <Stepper variant="circle-alt" initialStep={0} steps={steps}>
        {steps.map((stepProps, index) => {
          if (index === 0) {
            return (
              <Step key={stepProps.label} {...stepProps}>
                <ReservationDateStep />
              </Step>
            );
          }
          return (
            <Step key={stepProps.label} {...stepProps}>
             {
               <ReservationPaiementStep /> }
            </Step>
          );
        })}
      </Stepper>
    </div>
  );
}
