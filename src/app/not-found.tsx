"use client";

import Image from "next/image";
import { Link } from "@/navigation";

import Button from "@/ui/components/atoms/Button.atom";

import { Inter } from "next/font/google";

import mockifyBackground from "@/public/images/bg.jpg";
import logo from "@/public/images/logo.png";

import "@/ui/styles/pages/notFound.page.scss";

const inter = Inter({
  subsets: ["latin"],
});

export default function NotFound() {
  return (
    <html lang="en">
      <body>
        <main className={`not-found  ${inter.className}`}>
          <div className="left">
            <Link href={"/"}>
              <Image src={logo} alt="Mockify" />
            </Link>

            <div className="text">
              <h1>Something went wrong</h1>
              <p>We couldn't find the page you are looking for...</p>
            </div>
            <div className="links">
              <Link href={"/"}>
                <Button variant="primary">Home page</Button>
              </Link>
              <Link href={"/generate"}>
                <Button variant="danger">Let's work!</Button>
              </Link>
            </div>
          </div>
          <div className="right">
            <Image src={mockifyBackground} alt="Mockify" />
          </div>
        </main>
      </body>
    </html>
  );
}
