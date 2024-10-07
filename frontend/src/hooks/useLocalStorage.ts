"use client";
import { CartItem } from "@/contexts/CartContext";
// import { DateFormInfos } from "../pages/user/reservation/DatePickerComponent";
// FormDataCard : FOR LATER MAYBE
export const EmptyLocalStorage = (...storageKeys: string[]) => {
  storageKeys.forEach((key: string) => {
    localStorage.removeItem(key);
  });
};

export const SetToLocalStorage = (
  storageKey: string,
  itemToStore: CartItem[]
) => {
  if (itemToStore)
    localStorage.setItem(storageKey, JSON.stringify(itemToStore));
};

export const GetFromLocalStorage = (storageKey: string) => {
  if (typeof window !== "undefined") {
    const storedItem = localStorage.getItem(storageKey);
    if (storedItem) return JSON.parse(storedItem);
  }
};
