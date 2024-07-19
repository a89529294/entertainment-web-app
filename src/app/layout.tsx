import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import logo from "@/assets/logo-32.png";
import Image from "next/image";
import "./globals.css";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Header } from "@/components/layout/header";

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Task Management",
  description: "Kanban Task Management",
};

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: {
    board_id?: string;
  };
}>) {
  console.log(params.board_id);
  return (
    <html lang="en" className="h-full">
      <body className="font-sans antialiased h-full">
        <main className="min-h-full bg-light-grey flex flex-col">
          <Header />
          <div className="flex-1">{children}</div>
        </main>
      </body>
    </html>
  );
}
