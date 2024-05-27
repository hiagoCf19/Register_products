import { Button } from "@/components/ui/button";
import Link from "next/link";




export default function Home() {
  return (
    <>
      <div className="flex justify-center font-semibold text-xl">

        <Link href={"/users"}>
          <Button >
            Ver usuários

          </Button>
        </Link>
      </div>
    </>
  );
}
