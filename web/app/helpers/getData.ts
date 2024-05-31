import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import { Products } from "./format-price";
interface DataApi {
  products: Products[];
}
export async function getData(
  products: string,
  setData: Dispatch<SetStateAction<DataApi | undefined>>,
  setIsLoading: Dispatch<SetStateAction<boolean>>
) {
  try {
    const response = await fetch(`http://localhost:8080/${products}`);
    const result = await response.json();
    setData(result);
  } catch (error) {
    toast.error("Erro ao buscar dados da api");
    setIsLoading(false);
  } finally {
    setIsLoading(false);
  }
}