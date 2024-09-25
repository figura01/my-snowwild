import { useQuery, useMutation } from "@apollo/client";
// import { DELETE_USER_BY_ADMIN } from '@/admin/requetes/mutations/user.mutations'; 
import { useRouter } from "next/router";
import {
  CaretSortIcon
} from "@radix-ui/react-icons";
import { Eye, Pen, Router, Trash } from "lucide-react"
import { ReservationType, UserType } from "@/types"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/data-table";
import { GET_RESERVATIONS } from "@/admin/requetes/queries/reservation.queries";
import { DELETE_RESERVATION_BY_ADMIN } from "@/admin/requetes/mutations/reservation.mutations";
function Reservations() {
  const router = useRouter();
  let { data, error, loading } = useQuery(GET_RESERVATIONS, {
    fetchPolicy: "no-cache",
  });
  console.log(data)
  console.log(error)
  const [deleteReservation] = useMutation(DELETE_RESERVATION_BY_ADMIN, {
    fetchPolicy: "network-only",
    // refetchQueries: [{ query: GET_RESERVATIONS }]
  });

  const handleDeleteReservation = (id: string) => {
    console.log('id: ', id)
    deleteReservation({
      variables: {
        adminDeleteReservationId: id,
      },
      onCompleted:(res) => {
        console.log("SUCCESS TO DELETE")
        console.log("res: ", res)
        
        if(res) {
          console.log('data after result: ', data)
          data.reservations = data.users.filter((u: UserType, index: number) => res.deleteAdminUser.id !== u.id )
          router.push("/admin/users")
        }
      },

      onError: (error) => {
        console.log("ERROR", error)
      },
      
    })
  }

  const columns: ColumnDef<ReservationType>[] = [
    {
      accessorKey: "user",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => {
                console.log(column.getIsSorted() === "desc")
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            }
          >
            User
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="lowercase">{row.original.user.firstName} {row.original.user.lastName}</div>
    },
    {
      accessorKey: "start_date",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => {
                console.log(column.getIsSorted() === "desc")
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            }
          >
            Start Date
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue("start_date")}</div>
    },
    {
      accessorKey: "end_date",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => {
                console.log(column.getIsSorted() === "desc")
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            }
          >
            End date
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue("end_date")}</div>
    },
    {
      accessorKey: "status",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => {
                console.log(column.getIsSorted() === "desc")
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            }
          >
            Status
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue("status")}</div>
    },
    {
      header: "Action",
      cell: ({ row }) => {
        // console.log('row: ', row)
        // console.log('row.original: ', row.original)
        return (
          <div className="flex lowercase gap-2">
  
           <Link
              href={`/admin/users/${row.original.id}`}
            >
               <div className='
                flex rounded-full bg-gray-200 shadow-sm p-2
                hover:bg-black hover:text-white transition-all'
              >
                <Eye />
              </div>
               
            </Link>
  
            <Link
              className='rounded-full'
              href={`/admin/users/edit/${row.original.id}`}
            >
              <div className='
                flex rounded-full bg-gray-200 shadow-sm p-2
                hover:bg-black hover:text-white transition-all'
              >
                <Pen/>
              </div>
            </Link>
  
            <div
              onClick={() => {
                handleDeleteReservation(row.original.id)
              }}
            >             
              <div className='
                flex rounded-full bg-gray-200 shadow-sm p-2
                hover:bg-black hover:text-white transition-all'
              >
                <Trash />
              </div>
            </div>
            {/* <Link href={`/admin/users/${row.original.id}`}>show</Link>
            <Link href={`/admin/users/edit/${row.original.id}`}>Edit</Link> */}
  
          </div>
        )
      }
    }
  ]

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Some Error Occurred...</p>;
  }

  return data && (
    <div className="w-full">
      <div className="flex items-cente bg-white py-4">
        {data && (
          <DataTable 
            columns={columns} 
            data={data.adminGetReservations}
            title="List of reservations"
            createEntity="reservations"
          />
        )}
      </div>
    </div>
  )
}

export default Reservations;