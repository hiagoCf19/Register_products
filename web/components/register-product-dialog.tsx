import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "./ui/button";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { Input } from "./ui/input";
import { Loader2 } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";
import { DataApi, getData } from "@/app/helpers/getData";
import { Products } from "@/app/helpers/format-price";

interface Validation {
  field: string;
  message: string;
}
interface RegisterProductProps {
  setData: Dispatch<SetStateAction<DataApi | undefined>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}
const RegisterProduct = ({ setData, setIsLoading }: RegisterProductProps) => {
  const [registerDialogOpen, setRegisterDialogOpen] = useState(false)

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
      setLoading(false)
    }

  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createProduct();
  }

  return (
    <Dialog open={registerDialogOpen} onOpenChange={setRegisterDialogOpen}>
      <Button variant="secondary" onClick={() => setRegisterDialogOpen(true)}>Registrar novo produto</Button>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Registrar produto</DialogTitle>
          <DialogDescription>
            Registre um novo produto inserindo as informações nos campos predefinidos a baixo.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label className="text-sm" htmlFor="name" >
              Nome
            </label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome do produto"
            />
          </div>
          <div className="flex gap-2">
            <div className="space-y-2">
              <label className="text-sm" htmlFor="price" >
                Preço
              </label>
              <Input
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder=" ex: 299.99"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm" htmlFor="discount">
                Desconto (%)
              </label>
              <Input
                id="discount"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                placeholder=" ex: 15%"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm" htmlFor="quantity_in_stock" >
              Quantidade em estoque
            </label>
            <Input
              id="quantity_in_stock"
              value={quantity_in_stock}
              onChange={(e) => setQuantity_in_stock(e.target.value)}
              placeholder="Quantidade disponível para venda no estoque"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm" htmlFor="description" >
              Descrição
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva o produto..."
            />
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

      </DialogContent>
    </Dialog>
  );
}

export default RegisterProduct;