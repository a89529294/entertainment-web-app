import { Header } from "@/components/layout/header";
import { cn } from "@/lib/utils";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className={cn("min-h-full bg-light-grey flex flex-col")}>
      <Header />
      <div className="flex-1 dark:bg-very-dark-grey relative">{children}</div>
    </main>
  );
}
