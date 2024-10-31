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
    <div className='flex justify-center h-screen w-screen 
        bg-gradient-to-r from-indigo-950 via-indigo-800 to-indigo-700 
      dark:from-black dark:via-indigo-950 dark:to-indigo-900'>
      <div className="flex items-center">
        <div className="flex relative">
          <div className="card bg-indigo-200 shadow-lg w-full h-full rounded-3xl absolute transform rotate-3 bg-gradient-to-r  dark:from-indigo-900 dark:via-indigo-950 dark:to-black border-transparent" />
          <div className="relative w-full rounded-3xl px-12 py-10 bg-indigo-50 shadow-md bg-gradient-to-r  dark:from-black dark:via-indigo-950 dark:to-indigo-900">
            <div className="flex justify-center mb-4">
              
            </div>
            <form onSubmit={handleLogin} className="mt-10 grid gap-2 ">
              <input type="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="focus:outline-indigo-200 text-center block w-full bg-indigo-50 h-11 rounded-xl shadow-lg hover:bg-indigo-100 focus:bg-indigo-100 focus:ring-0 pointer" />
              <input type="password" required placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} className="focus:outline-indigo-200 text-center block w-full border-none bg-indigo-50 h-11 rounded-xl shadow-lg hover:bg-indigo-100 focus:bg-indigo-100 focus:ring-0" />
              <button className="mt-4 bg-indigo-800 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105 bg-gradient-to-tr from-indigo-700 to-indigo-950" disabled={isLoading}>
                {isLoading ? "Loading..." : "Login"}
              </button>
            </form>

            {isLoading && (
              <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
                <ThreeDots
                  height="80"
                  width="80"
                  radius="9"
                  color="black"
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
