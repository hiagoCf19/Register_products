import { toast } from "sonner";
import { DataApi, getData } from "./getData";
import { Dispatch, SetStateAction } from "react";

export const deletAPI = async (
  id: number,
  setData: Dispatch<SetStateAction<DataApi | undefined>>,
  setIsLoading: Dispatch<SetStateAction<boolean>>,
  setIsOpenDialogDelete: Dispatch<SetStateAction<boolean>>
) => {
  try {
    setIsLoading(true);
    const response = await fetch(
      `https://register-products.onrender.com/products/delete/${id}`,
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
      setIsLoading(false);
    }
  } catch (error) {
    setIsLoading(false);
    toast.error("Ops! houve um erro de conexão.");
  }
};
