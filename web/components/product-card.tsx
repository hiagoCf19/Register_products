"use client"
import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
} from "@/components/ui/dialog"

import { Products, calculateProducTotalPrice, formatCurrency } from "../app/helpers/format-price";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Edit2, Loader2, Trash } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { AlertDialog } from "@radix-ui/react-alert-dialog";
import { deletAPI } from "@/app/helpers/deleteData";
import { DataApi } from "@/app/helpers/getData";
import EditProduct from "./edit-product-dialog";
interface ProductCartProps {
  product: Products;
  loading: boolean
  setData: Dispatch<SetStateAction<DataApi | undefined>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}
const ProductCard = ({ product, loading, setData, setIsLoading }: ProductCartProps) => {
  const [isOpenDialogDelete, setIsOpenDialogDelete] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const handleDeleteClick = () => {

    deletAPI(product.id, setData, setIsLoading, setIsOpenDialogDelete)

  }
  return (
    <>
      <AlertDialogContent className="h-screen sm:h-auto overflow-hidden
      ">
        <AlertDialogHeader >
          <AlertDialogTitle>Informações do produto</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription asChild>
          <ul className="space-y-2 text-justify overflow-y-scroll [&::-webkit-scrollbar]:hidden">
            <li>
              <strong className=" text-zinc-50">
                Produto:{" "}
              </strong>
              {product.name}
            </li>
            <li>
              <strong className=" text-zinc-50">
                Descrição: {" "}
              </strong>

              {product.description}

            </li>
            <li>
              <strong className=" text-zinc-50">
                Disponibilidade: {" "}
              </strong>
              {product.quantity_in_stock} Unidades  disponíveis em estoque
            </li>
            <Separator className="my-5" />
          </ul>

        </AlertDialogDescription>
        <AlertDialogFooter className="flex flex-col sm:flex-col">
          <div className="flex justify-end ">
            <div className="flex flex-col gap-2 text-end">
              <p className="text-sm text-muted-foreground">
                <strong className="text-zinc-50 font-medium">Preço original: </strong>
                {formatCurrency(product.price)}
              </p>
              <p className="text-sm text-muted-foreground">
                <strong className="text-zinc-50 font-medium">
                  Desconto disponível: </strong>
                {product.discount} %
              </p>
              <p className="text-sm text-muted-foreground">
                <strong className="text-zinc-50 font-medium"> Preço final: </strong>
                {formatCurrency(calculateProducTotalPrice(product))}
              </p>
            </div>
          </div>
          <div className="flex justify-between sm:mt-3 items-center">
            <div className="space-x-4">
              <Button size={'icon'} variant={"outline"}>
                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                  <Button size={'icon'} variant={'outline'} onClick={() => setIsEditDialogOpen(true)}>
                    <Edit2 size={18} />
                  </Button>
                  <EditProduct
                    loading={loading}
                    product={product}
                    setData={setData}
                    setIsLoading={setIsLoading}

                    setIsEditDialogOpen={setIsEditDialogOpen}
                  />
                </Dialog>
              </Button>
              <Button
                size={'icon'}
                variant={"default"}
                onClick={() => setIsOpenDialogDelete(true)}
              >
                <Trash size={18} />
              </Button>
            </div>
            <AlertDialogCancel className="bg-secondary m-5">Fechar</AlertDialogCancel>
          </div>

        </AlertDialogFooter>
      </AlertDialogContent>

      <AlertDialog
        open={isOpenDialogDelete}
        onOpenChange={setIsOpenDialogDelete}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cuidado !</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação é irreversível, você deseja mesmo
              <strong className="text-primary"> excluir </strong>
              este produto? Confirme para continuar ou cancele para retornar
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button onClick={handleDeleteClick} disabled={loading}>
              {loading ? <Loader2 className="animate-spin" /> : 'Continuar'}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>


    </>

  );
}

export default ProductCard;