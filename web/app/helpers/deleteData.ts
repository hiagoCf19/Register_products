import { toast } from "sonner";
import { DataApi, getData } from "./getData";
import { Dispatch, SetStateAction } from "react";

export const deletAPI = async (
  id: number,
  setData: Dispatch<SetStateAction<DataApi | undefined>>,
  setIsLoading: Dispatch<SetStateAction<boolean>>
) => {
  try {
    const response = await fetch(
      `http://localhost:8080/products/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 204) {
      getData("products", setData, setIsLoading);
      toast.success("Produto excluido com sucesso!");
    } else {
      const error = await response.json();
      toast.error(error.message);
    }
  } catch (error) {
    toast.error("Ops! houve um erro de conexão.");
  }
};
