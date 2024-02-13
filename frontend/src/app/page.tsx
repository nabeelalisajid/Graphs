import Image from "next/image";
import { Charts } from './components/mainpage';
export default function Home() {
  return (
    <main className=" container mx-auto flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 h-96	 w-full items-center justify-between font-mono text-sm lg:flex">

        <Charts />

      </div>

    </main>
  );
}
