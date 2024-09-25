import { useStepper } from "@/components/stepper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { DATES_STORAGE_KEY } from "@/constants";
import { SetToLocalStorage } from "@/hooks/useLocalStorage";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import * as z from "zod";
import BasketComponent from "./BasketComponent";

const FirstFormSchema = z.object({
  date: z
    .date({
      required_error: "La date est requise.",
      invalid_type_error: "Ce champ doit être une date.",
    })
    .refine((val) => val instanceof Date && !isNaN(val.getTime()), {
      message: "La date doit être valide.",
    }),
});
export interface DateFormInfos {
  start_date: Date;
  end_date: Date;
}
function ReservationDateStep() {
  const { nextStep } = useStepper();
  const actualDate = new Date(new Date().getFullYear(),new Date().getMonth(), new Date().getDate());
  const [formInfos, setFormInfos] = useState<DateFormInfos>({
    start_date: actualDate,
    end_date: new Date(
      actualDate.getFullYear(),
      actualDate.getMonth(),
      actualDate.getDate() + 7
    ),
  });
  useEffect(() => {
    if (formInfos) {
      SetToLocalStorage(DATES_STORAGE_KEY, formInfos);
    }
  }, [formInfos]);

  const form = useForm<z.infer<typeof FirstFormSchema>>({
    resolver: zodResolver(FirstFormSchema),
    defaultValues: {
      date: new Date(),
    },
  });

  function onSubmit(_data: z.infer<typeof FirstFormSchema>) {
    nextStep();
    toast({
      title: "First step submitted!",
    });
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
          <FormField
            control={form.control}
            name="date"
            render={() => (
              <FormItem>
                <FormLabel className="text-3xl text-neutral-950 font-bold ml-3 mb-8">
                  Mes dates de location
                </FormLabel>
                <FormControl>
                  <div className="flex justify-center h-20">
                    <div className="datePickerContainer  h-20 flex items-center justify-evenly w-full max-w-4xl">
                      <>
                        <span >Du</span>
                        <DatePicker
                          selected={formInfos.start_date}
                          onChange={(date) => {
                            if (date) {
                              setFormInfos({ ...formInfos, start_date: date });
                            }
                          }}
                          selectsStart
                          startDate={formInfos.start_date}
                          endDate={formInfos.end_date}
                          placeholderText="Date de début"
                          className="  rounded-lg border-2  border-black py-2 text-center mx-2"
                        />
                        <span>au</span>
                        <DatePicker
                          selected={formInfos.end_date}
                          onChange={(date) => {
                            console.log("date selected:", date);
                            if (date) {
                              setFormInfos({ ...formInfos, end_date: date });
                            }
                          }}
                          selectsEnd
                          startDate={formInfos.start_date}
                          endDate={formInfos.end_date}
                          minDate={formInfos.start_date}
                          placeholderText="Date de fin"
                          className="  rounded-lg border-2 border-black py-2 text-center mx-2"
                        />
                      </>
                    </div>
                    <span id="divider" />
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <BasketComponent dateFormInfo={formInfos} />
    </>
  );
}

export default ReservationDateStep;
