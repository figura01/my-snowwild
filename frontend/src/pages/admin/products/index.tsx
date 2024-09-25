import React, { useEffect, useState} from "react";
import { useRouter } from "next/router";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { LIST_CATEGORIES } from "@/requetes/queries/category.queries"
import { LIST_MATERIAL } from "@/requetes/queries/material.queries";
import { DELETE_MATERIAL_BY_ADMIN } from '@/admin/requetes/mutations/material.mutations';
import Image from 'next/image'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Eye, Pen, Trash } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/data-table";
import { CategoryType } from "@/types";
import { Material } from "@/types/material";
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";


const ProductsAdminPage = () => {
  const { toast } = useToast()
  const [deleteProduct] = useMutation(DELETE_MATERIAL_BY_ADMIN);
  const {data, loading, error } = useQuery(LIST_MATERIAL, {
    fetchPolicy: "no-cache"
  });
  console.log('data matrial', data)
  const [getCategories] = useLazyQuery(LIST_CATEGORIES);
  const router = useRouter();
  const [categories, setCategories] = useState<CategoryType[]>([])
  const handleDeleteProduct = (idProduct: string) => {
    deleteProduct({
      variables: {
        deleteMaterialId: idProduct
      },
      onCompleted:((res) => {
        console.log("successfully delete", res)
        toast({
          title: "Delete",
          description: "Successfully deleted"
        })
        data.listMaterials = data.listMaterials.filter((m: Material, index: number) => res.deleteMaterial.id !== m.id )
        router.push("/admin/products");
      }),
      onError:((error) => {
        console.log("fail error")
        console.log(error)
      }),
      fetchPolicy: "no-cache"
    })
  }

  useEffect(() => {
    getCategories({
      onCompleted(data) {
        console.log('data categories: ', data)
        setCategories(data.categories)
      },
    });
  }, [getCategories]);

  const columns: ColumnDef<Material>[] = [
    {
      accessorKey: "picture",
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
            Picture
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="lowercase"><img src={`${process.env.NEXT_PUBLIC_IMAGE_URL}`+row.getValue("picture")} alt="#" width={"auto"} height={"50px"} style={{height: '50px'}} /></div>
    },
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
      accessorKey: "category",
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
            Category
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        console.log('row:',row)
        return (
          <div className="lowercase">{row.original.category.name}</div>
        )}
    },
    {
      accessorKey: "sizes",
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
            Sizes / Quantity
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        return (
          <div className="flex gap-2 lowercase">
            {row.original.sizes.map((s) => (
              <div key={s.size }className='flex flex-col items-center'>
                <div className='flex bg-black text-white rounded-md px-2 py-1'>{s.size}</div> 
                {s.quantity}
              </div>
            ))}
          </div>
        )
      }
    },
    {
      header: "Action",
      cell: ({ row }) => {
        // console.log('row: ', row)
        // console.log('row.original: ', row.original)
        return (
          <div className="flex lowercase gap-2">
  
           <Link
              href={`/admin/products/${row.original.id}`}
            >
               <div className='
                flex rounded-full bg-gray-200 shadow-sm p-2
                hover:bg-black hover:text-white transition-all'
              >
                <Eye />
              </div>
            </Link>
  
            <Link
  
              href={`/admin/products/edit/${row.original.id}`}
            >
               <div className='
                flex rounded-full bg-gray-200 shadow-sm p-2
                hover:bg-black hover:text-white transition-all'
              >
                <Pen />
              </div>
            </Link>
  
            <div 
              onClick={() => {
                handleDeleteProduct(row.original.id)
              }}
            >
              <div
                className='
                flex rounded-full bg-gray-200 shadow-sm p-2
                hover:bg-black hover:text-white transition-all'
              >
                <Trash />
              </div>
            </div>

          </div>
        )
      }
    }
  ];

  return (
    <div className="">
      <div className="flex items-cente bg-white py-4">
        {data && (
          <DataTable 
            columns={columns} 
            data={data.listMaterials}
            title="List of Products"
            createEntity="products"
          />
        )}       
      </div>
    </div>
  )
}

export default ProductsAdminPage;