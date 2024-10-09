import React, { useEffect, useRef } from 'react';
import { z } from "zod";
import { useForm, SubmitHandler, useWatch, FieldErrors, ControllerRenderProps, FieldValues, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@apollo/client"
import { LIST_CATEGORIES } from "@/requetes/queries/category.queries"
import { CREATE_MATERIAL_ADMIN } from '@/requetes/mutations/material.mutations';

import { Input } from "@/components/ui/input";
import ControlledInput from '@/admin/components/ControlledInput';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from '@/components/ui/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Card, CardHeader, CardFooter, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { CategoryType } from '@/types';
import { SkiSizes, SnowboardSizes, BootsSizes, ClothSizes, StickSizes } from '@/constantes';
import axios from 'axios';
import { CircleX } from 'lucide-react';
import SizeLabel from '@/admin/components/SizeLabel';

const formSchema = z.object({
  category: z.object({ 
    name: z.string(), 
    id: z.string()
  }, {message: "A category need to be choose"}),
  sizes: z.array(z.object({ size: z.string(), quantity: z.number()})),
  name: z.string().min(2, { message: "Name should be more than 2 carac"}),
  description: z.string().min(1, { message: "Product should have a description" }),
  picture: z
  .custom<File>((v) => v instanceof File, {
    message: 'Image is required',
  }),
  price: z.number().min(1, {message: "A price is required"}),
})

type FormSchema = z.infer<typeof formSchema>;

const FormHook = () => {
  const router = useRouter();
  const { data, loading, error} = useQuery(LIST_CATEGORIES, {
    fetchPolicy: "no-cache"
  });
  const [createMaterial] = useMutation(CREATE_MATERIAL_ADMIN, {
    fetchPolicy: "no-cache"
  });
  const inputFileRef = useRef<HTMLInputElement>(null);

  const form = useForm<FormSchema>({ 
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: undefined,
      sizes: [],
      name: '',
      description: '',
      picture: undefined,
      price: 0,
    }       ,
    mode: 'onChange',
  });

  const { watch } = form;
  const watchCategory = watch('category');
  const watchSizes = watch('sizes');

  const onSubmit: SubmitHandler<FormSchema> = (data) => {
    const formData = new FormData();
    if (!inputFileRef.current?.files) return;
    formData.append("file", inputFileRef?.current?.files[0], inputFileRef?.current?.files[0]?.name);
    axios.post(`${process.env.NEXT_PUBLIC_IMAGE_URL}/upload`, formData)
    .then((result) => {
      if (result?.data?.status == "success") {
        createMaterial({
          variables: {
            data: {
              ...data,
              picture: result.data.filename,
            },
          },
        }).then((res) => {
          console.log('res: =======>',res)
          if(res.data) {
            toast({
              title: "Success",
              description: "New material successfully created!"
            })
            router.push("/admin/products")
          };
        }).catch((err) => {
          console.log('err ===>', err)
        }) 
      }
    });
  };

  const handleClickSize = (field:ControllerRenderProps<FieldValues, "sizes">, size: string) => {
    if( !watchSizes?.some(e => e.size === size) ) {
      let copyArr = [...watchSizes, {size, quantity:0}];
      form.setValue('sizes', copyArr);

    } else {
      let filtredSizes = watchSizes.filter((s) =>  s.size !== size)
      form.setValue('sizes', filtredSizes);
    }
  }

  const findNameOfCategorie = (id:string) => {
    let cat = data.categories.find((el: CategoryType) => el.id === id);
    return cat.name;
  }

  const handleChangeCategory = (value: string, field:ControllerRenderProps<FieldValues, "category">) => {
    let name = findNameOfCategorie(value)
    if(name) {
      field.onChange({ name: name, id: value })
    } 
  }

  const renderSizesByCategory = (field: any) => {
    console.log('renderSizesByCategory :', watchCategory.name)
    switch(watchCategory.name) {
      case "ski":
        return (
          SkiSizes?.map((s: string, index: number) => {
            return (
              <SizeLabel
                key={`size_label_${s}`}
                label={s}
                field={field}
                isActive={watchSizes?.some(e => e.size === s)}
                onHandleClickSize={handleClickSize}
              />
            )
          
        }))
        // break;
        case "accessory":
          return (
            ClothSizes?.map((s: string, index: number) => {
              return (
                <SizeLabel
                  key={`size_label_${s}`}
                  label={s}
                  field={field}
                  isActive={watchSizes?.some(e => e.size === s)}
                  onHandleClickSize={handleClickSize}
                />
              )
            
          }))
        break;
        case "snowboard":
          return (
            SnowboardSizes?.map((s: string, index: number) => {
              return (
                <SizeLabel
                  key={`size_label_${s}`}
                  label={s}
                  field={field}
                  isActive={watchSizes?.some(e => e.size === s)}
                  onHandleClickSize={handleClickSize}
                />
              )       
            })
          )
        break;
        case "boots":
          return (
            BootsSizes?.map((s: string, index: number) => {
              return (
                <SizeLabel
                  key={`size_label_${s}`}
                  label={s}
                  field={field}
                  isActive={watchSizes?.some(e => e.size === s)}
                  onHandleClickSize={handleClickSize}
                />
              )       
            })
          )
        case "stick":
          return (
            StickSizes?.map((s: string, index: number) => {
              return (
                <SizeLabel
                  key={`size_label_${s}`}
                  label={s}
                  field={field}
                  isActive={watchSizes?.some(e => e.size === s)}
                  onHandleClickSize={handleClickSize}
                />
              )
            })
          )
    }
  }

  const renderBlocSizes = () => {
    return (
      <div className="mb-3">
        <Label>Select sizes</Label>
        <FormField
          control={form.control}
          name="sizes"
          render={({ field }) => (
            <FormItem 
              className="mb-3"
              {...field}
            >
              <FormControl>
                <div className="flex flex-row justify-start flex-wrap gap-1">
                  {renderSizesByCategory(field)}
                </div>
              </FormControl>
              
            </FormItem>
          )}
        />
      </div>
    )
  };

  const renderBlocSizePerQuantity = () => {
    return (
      watchSizes.map((s: {size: string, quantity: number}, index: number) => {
        return (
          <FormField
            control={form.control}
            key={`field.${index}`}
            name={`sizes`}
            render={({ field }) => {
              return (
                <>
                  <FormItem>
                    <FormLabel>Quantity per size(s)</FormLabel>
                    <FormControl>
                      <div className="flex items-center justify-strat gap-2">
                        <div className='flex items-center justify-center text-white text-sm bg-gray-950 rounded-md h-9 px-3 w-14'>{field.value[index]?.size}</div>
                        <ControlledInput 
                          initialValue={field.value[index]?.quantity || 0}
                          
                          index={index}
                          form={form}
                        />
                        <CircleX 
                          className="hover:text-red-400 hover:cursor-pointer"
                          onClick={() => {
                            let arrCopy = form.getValues('sizes').filter((s) => s.size !== field.value[index].size);
                            form.setValue('sizes', arrCopy)
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </>
              )
            }}
          />
        )
      })
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="form">
        <Card 
          className="mx-auto p-4 md:w-[400px]"
        >
          <CardHeader>
            <h1>Create a new product</h1>
          </CardHeader>

          <CardContent>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem 
                  className="mb-3"
                  onChange={(e: any) => { field.onChange(e?.target?.value)}}>
                  <FormLabel>Product&apos;s name</FormLabel>
                  <FormControl>
                    <Input 
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem 
                  className="mb-3"
                  onChange={(e: any) => { field.onChange(e.target?.value)}}>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
                
              )}
            />

            <FormField 
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem
                  className="mb-3"
                >
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <div className="flex items-center mb-3">
                      <Input
                        {...field}
                        type="number"
                        placeholder="100" 
                        className="w-full"
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                      <span
                        className="ml-4"
                      > €</span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField 
              control={form.control}
              name="picture"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem
                  className="mb-3"
                >
                  <FormLabel>Picture</FormLabel>
                  <FormControl>
                    <Input 
                      {...fieldProps}
                      type="file"
                      placeholder="image.jpeg"
                      ref={inputFileRef}
                      onChange={(event) =>
                        onChange(event.target.files && event.target.files[0])
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }: {field: any}) => (
                <FormItem
                  className="mb-3"
                
                >
                  <FormLabel>Category</FormLabel>
                  <Select 
                    onValueChange={(value) => { 
                      handleChangeCategory(value, field)
                    }}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {!loading && data?.categories.map((c: CategoryType, index: number) => {
                          return (
                            <SelectItem 
                              key={`category_${c.id}_${index}`}
                              value={c.id}
                            >
                              {c.name}
                            </SelectItem>
                          )
                        })}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              {watchCategory && watchCategory?.name.length > 0 &&
                <>
                  {renderBlocSizes()}
                  {watchSizes.length > 0 && (
                    <>
                      {renderBlocSizePerQuantity()}
                    </>
                  )}
                </>
              }
            </div>       
          </CardContent>
          <CardFooter>
            <Button type="submit">Add</Button>
          </CardFooter>
        
        </Card>
      </form>
    </Form>
  );
}

export default FormHook;