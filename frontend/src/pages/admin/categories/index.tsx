import { useQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { ADMIN_GET_CATEGORIES } from '@/admin/requetes/queries/category.queries';
import { ADMIN_DELETE_CATEGORY } from "@/admin/requetes/mutations/category.mutations";
import Link from "next/link";
import { Eye, Pen, Trash } from "lucide-react";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { CategoryType } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

function CategoriesAdminPage() {
  const router = useRouter();
  const {data, error, loading } = useQuery(ADMIN_GET_CATEGORIES, {
    fetchPolicy: "no-cache",
  });

  const [deleteCategory] = useMutation(ADMIN_DELETE_CATEGORY, {
    fetchPolicy: "no-cache",
  });

  const handleDeleteCategory = (id: string) => {
    console.log('id: ', id)
    deleteCategory({
      variables: {
        deleteCategoryId: id,
      },
      onCompleted:(res) => {
        console.log("SUCCESS TO DELETE")
        console.log("res: ", res)
        
        if(res) {
          console.log('data after result: ', data)
          data.categories = data?.categories.filter((c: CategoryType, index: number) => res.deleteCategory.id !== c.id )
          toast({
            title: "Delete",
            description: "Successfully deleted"
          })
          
          router.push("/admin/categories")
        }
      },

      onError: (error) => {
        console.log("ERROR", error.message)
      },
      
    })
  }

  const columns: ColumnDef<CategoryType>[] = [
    {
      accessorKey: "name",
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
            Name
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>
    },
    
    {
      header: "Action",
      cell: ({ row }) => {
        // console.log('row: ', row)
        // console.log('row.original: ', row.original)
        return (
          <div className="flex lowercase gap-2">
  
           <Link
              href={`/admin/categories/${row.original.id}`}
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
              href={`/admin/categories/edit/${row.original.id}`}
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
                handleDeleteCategory(row.original.id)
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

  return <div>
    List of Categories
    <div className="w-full">
      <div className="flex items-cente bg-white py-4">
        {data && (
          <DataTable 
            columns={columns} 
            data={data.categories}
            title="List of categories"
            createEntity="categories"
          />
        )}
      </div>
    </div>
  </div>
}
export default CategoriesAdminPage;