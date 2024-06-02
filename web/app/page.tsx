"use client"

import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Ellipsis, Loader2, Search } from "lucide-react";
import { useEffect, useState } from "react";
import ProductCard from "@/components/product-card";
import { DataApi, getData } from "./helpers/getData";
import {
  calculateProducTotalPrice,
  formatCurrency
} from "./helpers/format-price";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


import { Input } from "@/components/ui/input";
import RegisterProduct from "@/components/register-product-dialog";



export default function Home() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DataApi>()

  useEffect(() => {
    getData("products", setData, setLoading);
  }, []);

  return (
    <div className=" sm:pl-44">
      <div className=" sm:w-[90%]">
        <div className="flex justify-between pt-4">
          <h1 className="font-semibold text-xl">Produtos:</h1>
          <div className="flex items-center gap-2">
            <Input type="search" className="focus-visible:ring-1 p-4" placeholder="Buscar produto" />
            <Button variant={"destructive"} className="p-2">
              <Search size={22} />
            </Button>
          </div>
        </div>
        <Table className="[&::-webkit-scrollbar]:hidden">
          <TableHeader className="">
            <TableRow className="text-xs sm:text-sm  ">
              <TableHead className="text-zinc-50">Código</TableHead>
              <TableHead className="text-zinc-50">Nome</TableHead>
              <TableHead className="text-zinc-50">Preço final</TableHead>
              <TableHead className="text-right sm:text-start text-zinc-50">Estoque</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="[&::-webkit-scrollbar]:hidden">
            {data?.products.map((product) => (
              <TableRow key={product.id} className="text-sm">
                <TableCell className="font-medium pl-6">{product.id}</TableCell>
                <TableCell className="text-muted-foreground max-w-[170px] px-0">{product.name}</TableCell>
                <TableCell className="text-muted-foreground">{formatCurrency(calculateProducTotalPrice(product))}</TableCell>
                <TableCell className="text-right sm:text-start text-muted-foreground">
                  {product.quantity_in_stock} Unidades
                </TableCell>
                <TableCell className=" text-right">
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <Button size='icon' className="size-9 p-2" variant={'outline'} asChild >
                        <Ellipsis />
                      </Button>
                    </AlertDialogTrigger>
                    <ProductCard
                      loading={loading}
                      product={product}
                      setData={setData}
                      setIsLoading={setLoading}
                    />
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table >
        <div className="flex justify-center py-5">
          {loading && (<Loader2 className="animate-spin text-muted-foreground" />)}
        </div>
        <RegisterProduct setIsLoading={setLoading} setData={setData} />
      </div>

    </div>
  )
}
