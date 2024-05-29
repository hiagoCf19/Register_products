"use client"
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Ellipsis, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
interface Products {
  id: number;
  name: string;
  description: string;
  price: number;
  discount: number;
  quantity_in_stock: number;
}
interface DataApi {
  products: Products[]
}
const DashboardPage = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<DataApi>()

  useEffect(() => {

    getData();
  }, []);
  async function getData() {
    try {
      const response = await fetch("http://localhost:8080/products");
      const result = await response.json();
      setData(result);

    } catch (error) {
      toast.error("Erro ao buscar dados da api")
      setIsLoading(false)
    }
    finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Table>

        <TableHeader>
          <TableRow className="text-xs">
            <TableHead >Código</TableHead>
            <TableHead >Nome</TableHead>
            <TableHead>Preço</TableHead>
            <TableHead className="text-right">Estoque</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="[&::-webkit-scrollbar]:hidden">

          {
            data?.products.map((product) => (
              <TableRow key={product.id} className="text-sm">
                <TableCell className="font-medium pl-6">{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell className="">R$ {product.price},00</TableCell>
                <TableCell className="text-right">{product.quantity_in_stock}</TableCell>
                <TableCell className=" text-right">
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <Button size='icon' className="size-8" variant={'outline'} >
                        <Ellipsis />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>{product.name}</AlertDialogTitle>
                        <AlertDialogDescription>
                          {product.description}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Fechar</AlertDialogCancel>
                        {/* <AlertDialogAction>Continue</AlertDialogAction> */}
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>


                </TableCell>
              </TableRow>
            ))}
        </TableBody>

      </Table >
      <div className="flex justify-center py-5">

        {isLoading && (<Loader2 className="animate-spin text-muted-foreground" />)}
      </div>
    </>


  );
}

export default DashboardPage;