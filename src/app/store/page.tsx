"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      router.push("/catalog");
    }
  }, [router]);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.API_URL}/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        if (response.status === 401) {
          toast.error('Usuário ou senha incorreto', { theme: 'dark' });
        } else {
          toast.error("Ocorreu um erro. Tente novamente mais tarde.");
        }
        return;
      }

      const data = await response.json();

      Cookies.set("token", data.access_token, { expires: 1 });

      router.push("/customers");
    } catch (error) {
      console.error("Error:", error);
      toast.error(`Ocorreu um erro ao fazer login. ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen 
        bg-gradient-to-r from-indigo-950 via-indigo-800 to-indigo-700 
        dark:from-black dark:via-indigo-950 dark:to-indigo-900">
  <div className="flex items-center">
    <div className="relative">
      <div className="card bg-indigo-300 shadow-lg w-full h-full rounded-3xl absolute transform rotate-3 transition duration-500 ease-in-out bg-gradient-to-r dark:from-indigo-900 dark:via-indigo-950 dark:to-black border-transparent" />
      <div className="relative w-full rounded-3xl px-12 py-10 bg-gradient-to-r from-white to-indigo-50 shadow-lg transition duration-300 ease-in-out dark:from-black dark:via-indigo-950 dark:to-indigo-900">
        <div className="flex justify-center mb-4">
          <h1 className="text-3xl font-bold text-indigo-900 dark:text-white">Bem-vindo à RodTech</h1>
        </div>
        <form onSubmit={handleLogin} className="mt-10 grid gap-4">
          <input 
            type="email" 
            required 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="focus:outline-none text-center block w-full h-12 rounded-xl shadow-md hover:bg-indigo-100 focus:bg-indigo-200 focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out" 
          />
          <input 
            type="password" 
            required 
            placeholder="Senha" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="focus:outline-none text-center block w-full h-12 rounded-xl shadow-md hover:bg-indigo-100 focus:bg-indigo-200 focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out" 
          />
          <button className="mt-4 bg-indigo-800 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-300 ease-in-out transform hover:scale-105 bg-gradient-to-tr from-indigo-700 to-indigo-950" disabled={isLoading}>
            {isLoading ? "Carregando..." : "Login"}
          </button>
        </form>

        {isLoading && (
          <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 rounded-3xl">
            <ThreeDots
              height="80"
              width="80"
              radius="9"
              color="white"
              ariaLabel="three-dots-loading"
              visible={true}
            />
          </div>
        )}
      </div>
    </div>
  </div>
</div>

  );
};
