export enum StatutReservation {
  AWAITING = 'en_attente',
  CONFIRMATION = 'confirmée',
  PAID = 'payée',
  CANCEL = 'annulée',
  FINISHED = 'terminée',
}
export interface ReservationInput {
  startDate: String!;
  endDate: String!;
  reservationMaterial: ReservationMaterialInput;
}

interface ReservationMaterialInput {
  material: {
    id: string;
    name: string;
  };
  price: string;
  quantity: string;
  size: string;
}

// Type pour Material
interface Material {
  id: string;
  name: string;
  picture: string;
}

// Type pour ReservationMaterial
export type ReservationMaterial = {
  id: string;
  price: number;
  quantity: number;
  size: string;
  material: Material;
  reservation: Reservation;
}

// Type pour Reservation
interface Reservation {
  id: string;
  start_date: string;
  end_date: string;
  status: string;
  reservationMaterials: ReservationMaterial[];
}

// Type pour la réponse de la requête
interface ReservationsByUserIdResponse {
  reservationsByUserId: Reservation[];
}

// Type pour les variables de la requête
interface ReservationsByUserIdVariables {
  reservationsByUserIdId: string;
}
