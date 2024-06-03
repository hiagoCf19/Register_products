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
  const [search, setSearch] = useState('')

  useEffect(() => {
    getData("products", setData, setLoading);
  }, []);
  const filterProducts = search !== '' ? data?.products.filter(p => p.name.toLowerCase().includes(search.toLowerCase())) : data?.products

  return (
    <div className=" sm:pl-44">
      <div className=" sm:w-[90%]">
        <div className="flex justify-between pt-4">
          <h1 className="font-semibold text-xl">Produtos:</h1>
          <div className="flex items-center gap-2">
            <Input type="search" className="focus-visible:ring-1 p-4" placeholder="Buscar produto" value={search} onChange={(e) => setSearch(e.target.value)} />
            <Button variant={"destructive"} className="p-2">
              <Search size={22} />
            </Button>
          </div>
        </div>
        <div className=" [&::-webkit-scrollbar]:hidden overflow-y-scroll max-h-[760px]">
          <Table >
            <TableHeader >
              <TableRow className="text-xs sm:text-sm">
                <TableHead className="text-zinc-50">Código</TableHead>
                <TableHead className="text-zinc-50">Nome</TableHead>
                <TableHead className="text-zinc-50">Preço final</TableHead>
                <TableHead className="text-right sm:text-start text-zinc-50 hidden sm:block">Estoque</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filterProducts?.map((product) => (
                <TableRow key={product.id} className="text-sm">
                  <TableCell className="font-medium pl-6">{product.id}</TableCell>
                  <TableCell className="text-muted-foreground sm:max-w-[170px] max-w-[200px] text-nowrap text-ellipsis overflow-hidden px-0">{product.name}</TableCell>
                  <TableCell className="text-muted-foreground">{formatCurrency(calculateProducTotalPrice(product))}</TableCell>
                  <TableCell className="text-right sm:text-start text-muted-foreground hidden sm:block">
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
        </div>
        {filterProducts?.length === 0 ?
          <div className="flex justify-center flex-col text-center py-5">
            <p className="text-2xl font-medium">Nenhum resultado encontrado para "{search}".</p>
            <span className="text-muted-foreground text-center text-sm"> Verifique se você digitou corretamente e tente novamente!</span>
          </div>
          : null}
        <div className="flex justify-center py-5">
          {loading && (<Loader2 className="animate-spin text-muted-foreground" />)}
        </div>
        <RegisterProduct setIsLoading={setLoading} setData={setData} />
      </div>

    </div>
  )
}
