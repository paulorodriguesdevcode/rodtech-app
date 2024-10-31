import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./contexts/user-context";

const inter = Inter({ subsets: ["latin"] });
 
export const metadata: Metadata = {
  title: "RodTech - Inovação e Transformação Digital",
  description: "A RodTech é uma empresa de tecnologia dedicada a criar soluções digitais personalizadas que transformam ideias em realidade. Junte-se a nós e descubra como a tecnologia pode elevar seu negócio.",
  keywords: [
    "RodTech", 
    "tecnologia", 
    "soluções digitais", 
    "transformação digital", 
    "inovação tecnológica", 
    "desenvolvimento de software", 
    "consultoria técnica"
  ],
  authors: [
    { name: "Equipe RodTech", url: "https://rodtech.tech/" },
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
