import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./contexts/user-context";

const inter = Inter({ subsets: ["latin"] });
 
export const metadata: Metadata = {
  title: "sarasabara - Transformando Vidas e Espalhando Fé",
  description: "A Igreja Sarasabara é um lugar de encontro, acolhimento e transformação. Venha conhecer mais sobre nossa missão e participe da nossa comunidade de fé.",
  keywords: ["Igreja Sarasabara", "comunidade de fé", "transformação espiritual", "acompanhamento pastoral", "eventos da igreja"],
  authors: [
    { name: "Equipe Sarasabara", url: "https://sarasabara.com.br/" },
    { name: "Paulo Rodrigues", url: "https://paulorodriguesdev.com.br/" }
  ],
  robots: "index, follow"

}; 

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          {children}
        </UserProvider>
          <ToastContainer />
      </body>
    </html>
  );
}
