"use client"
import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Products, calculateDiscount, calculateProducTotalPrice, formatCurrency } from "../app/helpers/format-price";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Edit2, Trash } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { AlertDialog } from "@radix-ui/react-alert-dialog";
import { toast } from "sonner";
import { deletAPI } from "@/app/helpers/deleteData";
import { DataApi } from "@/app/helpers/getData";
interface ProductCartProps {
  product: Products;
  setData: Dispatch<SetStateAction<DataApi | undefined>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}
const ProductCard = ({ product, setData, setIsLoading }: ProductCartProps) => {
  const [isOpenDialogDelete, setIsOpenDialogDelete] = useState(false)

  const handleDeleteClick = () => {
    setIsOpenDialogDelete(false)
    deletAPI(product.id, setData, setIsLoading)
  }
  return (
    <>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Informações do produto</AlertDialogTitle>
          <AlertDialogDescription className="space-y-2">

            <h1>
              <strong className=" text-zinc-50">
                Produto:{" "}
              </strong>
              {product.name}
            </h1>
            <div className="space-y-2">
              <p>
                <strong className=" text-zinc-50">
                  Descrição: {" "}
                </strong>
                {product.description}
              </p>
              <p>
                <strong className=" text-zinc-50">
                  Disponibilidade: {" "}
                </strong>
                {product.quantity_in_stock} Unidades  disponíveis em estoque</p>
              <Separator className="my-5" />
              <div className="flex justify-end px-2 ">
                <div className="flex flex-col gap-2 text-end">
                  <p>Preço original: {formatCurrency(product.price)}</p>
                  <p>Desconto disponível: {product.discount} %</p>
                  <p>Preço final: {formatCurrency(calculateProducTotalPrice(product))}</p>

                </div>
              </div>
            </div>

          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex sm:justify-between  ">
          <div className="space-x-4">
            <Button size={'icon'} variant={"outline"}>
              <Edit2 size={18} />
            </Button>
            <Button size={'icon'} variant={"default"} onClick={() => setIsOpenDialogDelete(true)}>
              <Trash size={18} />
            </Button>
          </div>
          <AlertDialogCancel>Fechar</AlertDialogCancel>
          {/* <AlertDialogAction>Continue</AlertDialogAction> */}
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
              <strong className="text-primary">excluir</strong>
              este produto? Confirme para continuar ou cancele para retornar
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button onClick={handleDeleteClick}>
              Continuar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>


    </>

  );
}

export default ProductCard;