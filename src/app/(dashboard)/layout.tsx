import { Header } from "@/components/layout/header";
import { WithDynamicSidebar } from "@/components/layout/with-dynamic-sidebar";
import { ThemeProvider } from "@/contexts/theme-context";
import { getUserBoards } from "@/data/get-boards";
import { getUser } from "@/data/get-user-else-redirect-to-login";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();
  const boards = user ? await getUserBoards(user.id) : [];
  return (
    <main className="h-full">
      <ThemeProvider>
        <WithDynamicSidebar boards={boards} header={<Header boards={boards} />}>
          {children}
        </WithDynamicSidebar>
      </ThemeProvider>
    </main>
  );
}
