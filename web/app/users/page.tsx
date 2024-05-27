"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner"
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Loader2, Pencil, Trash2 } from "lucide-react";


interface UserData {
  id: number
  name: string;
  email: string;
}
interface Validation {
  field: string;
  message: string;
}
const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingCreated, setLoadingCreated] = useState(false)
  const handleNomeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNome(e.target.value);
  };
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {

    setEmail(e.target.value);
  };
  // get
  useEffect(() => {
    setIsLoading(true)
    getData();
  }, []);

  async function getData() {
    try {
      const response = await fetch("http://localhost:8080/users");
      const result = await response.json();
      setUsers(result);

    } catch (error) {
      toast.error("Erro ao buscar dados da api")
      setIsLoading(false)
    }
    finally {
      setIsLoading(false)
    }
  }
  //  POST
  const postAPI = async () => {
    const userData = {
      nome: nome,
      email: email,
    };

    try {
      setLoadingCreated(true)
      const response = await fetch("http://localhost:8080/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        toast("usuario criado com sucesso!");

      } else {
        const error = await response.json();
        error.map((e: Validation) => {
          toast.error(`O campo ${e.field} ${e.message}`)
        })
      }
      getData();
    } catch (error) {
      console.error("Error:", error);

    } finally {
      setLoadingCreated(false)
    }
  }
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postAPI()
  };
  const deletAPI = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8080/deleteUser/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (response.ok) {
        toast("usuario excluido com sucesso!");
        getData();
      }
      else {
        const error = await response.json();
        toast.error(error.message);
      }
    } catch (error) {
      toast.error("Erro ao se conectar com a api")
    }
  }


  const handleDeletClick = (user: UserData) => {
    deletAPI(user.id)
  }
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center gap-8"
      >
        <div className="space-y-4 p-5 justify-center flex flex-col items-center">
          <div>
            <label>
              Nome:
              <Input
                type="text"
                value={nome}
                onChange={handleNomeChange}
                className="border"
              />
            </label>
          </div>
          <div>
            <label>
              Email:
              <Input

                value={email}
                onChange={handleEmailChange}
                className="border"
              />
            </label>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <Button type="submit">
            {loadingCreated ? <Loader2 className="animate-spin" /> : 'Create User'}
          </Button>
        </div>
      </form>

      <div className="flex justify-center items-center w-full flex-col">
        <h1 className="font-semibold text-xl py-6">usuarios:</h1>
        <div>
          {isLoading && (
            <Loader2 className="animate-spin" />
          )}
          <div className="grid grid-cols-2 gap-2 p-2">

            {users.map((user: UserData) => (

              <Card key={user.id} >
                <CardHeader>
                  <CardTitle className="text-center">Usuário {user.id}</CardTitle>
                </CardHeader>
                <CardContent >
                  <p className="flex justify-center"> {user.name}</p>
                  <p className="flex justify-center"> {user.email}</p>
                </CardContent>
                <CardFooter className="flex justify-center gap-4">
                  <Button size={'icon'}>
                    <Pencil />
                  </Button>
                  <Button size={'icon'} onClick={() => handleDeletClick(user)}>
                    <Trash2 />
                  </Button>
                </CardFooter>

              </Card>

            ))}
          </div>
        </div>
      </div>



    </>
  );
}

export default UsersPage;