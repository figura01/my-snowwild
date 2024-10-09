import { ReservationMaterial, ReservationMaterialInput, StatutReservation } from "./reservation";

export type CategoryType = {
  id: string;
  name: string;
}

export type SizeType = {
  label: string,
  isActive: boolean
};

enum MaterialSizes {
  SkiSizes,
  SnowboardSizes,
}

export enum UserRoleEnum {
  admin = 'ADMIN',
  user = 'USER',
}

export enum MaterialCategories {
  SKI = "ski",
  SNOWBOARD = "sknowboard",
  BOOTS = "boots",
  STICK = "stick",
  ACCESSORY = "accessory",
}

export type UserType = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRoleEnum;
  phone?: string; 
  reservations?: ReservationMaterialInput[]
}

export type ReservationType = {
  id: string;
  user: UserType;
  start_date: Date;
  end_date: Date;
  createdAt: Date
  status: StatutReservation;
  reservationMaterials: ReservationMaterial[];
}