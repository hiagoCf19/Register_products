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
  DialogTrigger,
} from "@/components/ui/dialog"

import { Products, calculateProducTotalPrice, formatCurrency } from "../app/helpers/format-price";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Edit2, Loader2, Trash } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { AlertDialog } from "@radix-ui/react-alert-dialog";
import { deletAPI } from "@/app/helpers/deleteData";
import { DataApi } from "@/app/helpers/getData";
import DialogDemo from "./dialog-demo";
interface ProductCartProps {
  product: Products;
  loading: boolean
  setData: Dispatch<SetStateAction<DataApi | undefined>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}
const ProductCard = ({ product, loading, setData, setIsLoading }: ProductCartProps) => {
  const [isOpenDialogDelete, setIsOpenDialogDelete] = useState(false)

  const handleDeleteClick = () => {

    deletAPI(product.id, setData, setIsLoading, setIsOpenDialogDelete)

  }
  return (
    <>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Informações do produto</AlertDialogTitle>
          <AlertDialogDescription asChild >
            <ul className="space-y-2">
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
              <div className="flex justify-end px-2 ">
                <div className="flex flex-col gap-2 text-end">
                  <p >
                    <strong className="text-zinc-50 font-medium">Preço original: </strong>
                    {formatCurrency(product.price)}
                  </p>
                  <p>
                    <strong className="text-zinc-50 font-medium">
                      Desconto disponível: </strong>
                    {product.discount} %
                  </p>
                  <p>
                    <strong className="text-zinc-50 font-medium"> Preço final: </strong>
                    {formatCurrency(calculateProducTotalPrice(product))}
                  </p>
                </div>
              </div>
            </ul>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex sm:justify-between  ">
          <div className="space-x-4">
            <Button size={'icon'} variant={"outline"}>
              <Dialog>
                <DialogTrigger asChild>
                  <Edit2 size={18} />
                </DialogTrigger>
                <DialogDemo />
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
          <AlertDialogCancel>Fechar</AlertDialogCancel>
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