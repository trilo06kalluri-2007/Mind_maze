import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Mind Maze — A Premium Sliding Puzzle Game",
  description:
    "Challenge your mind with Mind Maze, a beautifully crafted sliding puzzle game. Arrange tiles, clear your thoughts, and conquer the maze.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'><rect width='40' height='40' rx='8' fill='%236366f1'/><path d='M10 10h8v8h-8z' fill='rgba(255,255,255,0.2)'/><path d='M22 10h8v8h-8z' fill='rgba(255,255,255,0.15)'/><path d='M10 22h8v8h-8z' fill='rgba(255,255,255,0.15)'/><path d='M22 22h8v8h-8z' fill='rgba(255,255,255,0.1)'/></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
