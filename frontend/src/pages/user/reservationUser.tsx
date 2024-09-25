import { useLazyQuery, useQuery } from '@apollo/client';
import { GET_RESERVATIONS_BY_USER_ID } from '@/requetes/queries/reservation.queries';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { ReservationsByUserIdResponse, ReservationsByUserIdVariables } from '@/types/reservation';
import { AuthContext } from '@/contexts/authContext';

const UserReservations = () => {
  const { user } = useContext(AuthContext);
  console.log(user);

  const { data, loading, error } = useQuery<ReservationsByUserIdResponse, ReservationsByUserIdVariables>(
    GET_RESERVATIONS_BY_USER_ID,
    {
      variables: { reservationsByUserIdId: user?.userId?.toString() || '' },
      fetchPolicy: "no-cache"
    }
  );
  console.log(data);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

  return (
    <div className="container mx-auto p-4">
      {data?.reservationsByUserId.map((reservation) => (
        <div key={reservation.id} className="mb-8 bg-white shadow-lg rounded-lg p-6">
          <div className="border-b pb-4 mb-4">
            <h2 className="text-xl font-semibold mb-2">Reservation Details</h2>
            <div className="flex justify-between">
              <p><span className="font-semibold">Start Date:</span> {reservation.start_date}</p>
              <p><span className="font-semibold">End Date:</span> {reservation.end_date}</p>
              <p><span className="font-semibold">Status:</span> {reservation.status}</p>
            </div>
          </div>
          <h3 className="text-lg font-semibold mb-4">Materials</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reservation.reservationMaterials.map((material) => (
              <div key={material.id} className="border rounded-lg p-4 shadow-sm">
                <img src={process.env.NEXT_PUBLIC_IMAGE_URL + material.material.picture} alt={material.material.name} className="w-96 h-32 object-cover rounded mb-4" />
                <p className="font-semibold">{material.material.name}</p>
                <p>Price: ${material.price}</p>
                <p>Quantity: {material.quantity}</p>
                <p>Size: {material.size}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserReservations;
