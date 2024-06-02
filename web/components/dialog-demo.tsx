"use client"
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,

} from "@/components/ui/dialog"
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { FormEvent, useState } from "react";
import { Textarea } from "./ui/textarea";

const DialogDemo = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [quantity_in_stock, setQuantity_in_stock] = useState("");
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const data = {
    //   name: name,
    //   description: description,
    //   price: price.replace(",", "."),
    //   discount: discount.replace("%", ""),
    //   quantity_in_stock: quantity_in_stock
    // }
    // console.log(JSON.stringify(data))
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
          <Button type="submit">Salvar</Button>
        </div>
      </form>

    </DialogContent >
  );
}

export default DialogDemo;