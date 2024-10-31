import "../../app/globals.css";

export default function OrdersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex-wrap ">
      <main className="min-h-screen bg-indigo-50 dark:bg-black">
        {children}
      </main>
    </div>
  );
}
