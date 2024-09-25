import { z } from "zod";
import { useForm, SubmitHandler, useWatch, FieldErrors, ControllerRenderProps, FieldValues, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { useMutation } from "@apollo/client";
import { ADMIN_CREATE_CATEGORY } from "@/admin/requetes/mutations/category.mutations";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/router";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
})


function AdminCreateCategory () {
  const router = useRouter();
  const [createCategory, {data, loading, error}] = useMutation(ADMIN_CREATE_CATEGORY, {
    fetchPolicy: "network-only"
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  })



  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    createCategory({
      variables: {
        data: {
          name: values.name
        }
      },
      onCompleted:((res) => {
        console.log('res after completed', res);

        toast({
          title: "Success",
          description: "You successfully registred a category",
        })
        router.push("/admin/categories");
      }),
      onError:((error) => {
        console.log('ERROR: ', error.message)
        toast({
          title: "Error",
          description: "This name is already used !",
        })
      })
    });
  }

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card className="md:w-[500px] md:mx-auto">
            <CardHeader>Create a neuw user</CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem
                    className="mb-3"
                  >
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name of category" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit">Submit</Button>
            </CardFooter>
          </Card>
        </form>
    </Form>
  )
}

export default AdminCreateCategory;