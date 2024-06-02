"use client"
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,

} from "@/components/ui/dialog"
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";
import { DataApi, getData } from "@/app/helpers/getData";
import { Products } from "@/app/helpers/format-price";
import { Loader2 } from "lucide-react";
interface DialogDemoProps {
  product: Products;
  loading: boolean
  setData: Dispatch<SetStateAction<DataApi | undefined>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setIsEditDialogOpen: Dispatch<SetStateAction<boolean>>;
}
const DialogDemo = ({ product, loading, setData, setIsLoading, setIsEditDialogOpen }: DialogDemoProps) => {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [quantity_in_stock, setQuantity_in_stock] = useState("");

  interface Validation {
    field: string;
    message: string;
  }
  const editProduct = async () => {
    const data = {
      id: product.id,
      name: name === "" ? null : name,
      description: description === "" ? null : description,
      price: price.replace(",", "."),
      discount: discount.replace("%", ""),
      quantity_in_stock: quantity_in_stock
    }
    if (data.name === null && data.description === null && data.price === '' && data.discount === '' && data.quantity_in_stock === '') {
      toast.error("Nenhuma informação foi alterada")
      return;
    }
    try {
      setIsLoading(true)
      const response = await fetch("http://localhost:8080/products/edit",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      if (response.ok) {
        toast.success("Informações modificadas com sucesso");
        setName('')
        setDescription('')
        setPrice('')
        setDiscount('')
        setQuantity_in_stock('')
        setIsEditDialogOpen(false)
        getData("products", setData, setIsLoading);

      } else {
        const error = await response.json();
        error.map((e: Validation) => {
          toast.error(`O campo ${e.field} ${e.message}`)
        })
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false)
    }
  }
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editProduct();

  }
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Editar Produto</DialogTitle>
        <DialogDescription>
          Insira apenas as informações que você deseja alterar e clique em <strong className="text-primary"> salvar </strong>
        </DialogDescription>
      </DialogHeader>
      <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label className="text-sm" htmlFor="name" >
            Nome
          </label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="flex gap-2">
          <div className="space-y-2">
            <label className="text-sm" htmlFor="price" >
              Preço
            </label>
            <Input id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
          </div>
          <div className="space-y-2">
            <label className="text-sm" htmlFor="discount">
              Desconto (%)
            </label>
            <Input id="discount" value={discount} onChange={(e) => setDiscount(e.target.value)} />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm" htmlFor="quantity_in_stock" >
            Quantidade em estoque
          </label>
          <Input id="quantity_in_stock" value={quantity_in_stock} onChange={(e) => setQuantity_in_stock(e.target.value)} />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm" htmlFor="description" >
            Descrição
          </label>
          <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className=" pt-5 -mb-3 flex justify-end">
          <Button type="submit" disabled={loading} className="flex gap-2">
            Salvar
            {loading && (
              <Loader2 className="animate-spin" size={16} />
            )}
          </Button>
        </div>
      </form>

    </DialogContent >
  );
}

export default DialogDemo;