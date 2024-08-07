import { Header } from "@/components/layout/header";
import { cn } from "@/lib/utils";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className={cn("flex min-h-full flex-col bg-light-grey")}>
      <Header />
      <div className="relative flex-1 dark:bg-very-dark-grey">{children}</div>
    </main>
  );
}
