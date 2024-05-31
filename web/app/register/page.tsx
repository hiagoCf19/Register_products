"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
interface Validation {
  field: string;
  message: string;
}
const RegisterNewProduct = () => {

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [discount, setDiscount] = useState('')
  const [quantity_in_stock, setQuantity_in_stock] = useState('')
  const [loading, setLoading] = useState(false)

  const createProduct = async () => {
    const data = {
      name: name,
      description: description,
      price: price.replace(",", "."),
      discount: discount.replace("%", ""),
      quantity_in_stock: quantity_in_stock
    }
    try {
      setLoading(true)

      const response = await fetch("http://localhost:8080/products/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      if (response.ok) {
        toast.success("Produto cadastrado com sucesso");
        setName('')
        setDescription('')
        setPrice('')
        setDiscount('')
        setQuantity_in_stock('')

      } else {
        const error = await response.json();
        error.map((e: Validation) => {
          toast.error(`O campo ${e.field} ${e.message}`)
        })
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false)
    }
  }
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createProduct();
  }
  return (
    <>
      <form className="p-5 flex flex-col gap-3" onSubmit={handleSubmit}>
        <label htmlFor="Produto">
          Produto:
          <Input className="my-2" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Preço:
          <Input type="number" className="my-2" value={price} onChange={(e) => setPrice(e.target.value)} />
        </label>
        <label>
          Porcentagem de desconto:
          <Input className="my-2" value={discount} onChange={(e) => setDiscount(e.target.value)} />
        </label>
        <label>
          Quantidade em estoque:
          <Input className="my-2" value={quantity_in_stock} onChange={(e) => setQuantity_in_stock(e.target.value)} />
        </label>
        <label >
          Descrição
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="my-2"
          />
        </label>
        <Button type="submit" disabled={loading}  >
          {loading ?
            <>
              <Loader2 className="animate-spin mx-1" />
              Processando...
            </>
            : "Enviar"}
        </Button>
      </form >
    </>
  );

}

export default RegisterNewProduct;