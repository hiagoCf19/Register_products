import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import { Products } from "./format-price";
export interface DataApi {
  products: Products[];
}
export async function getData(
  endpoint: string,
  setData: Dispatch<SetStateAction<DataApi | undefined>>,
  setIsLoading: Dispatch<SetStateAction<boolean>>
) {
  try {
    const response = await fetch(
      `https://register-products.onrender.com/${endpoint}`
    );
    const result = await response.json();
    setData(result);
  } catch (error) {
    toast.error("Erro ao buscar dados da api");
    setIsLoading(false);
  } finally {
    setIsLoading(false);
  }
}
