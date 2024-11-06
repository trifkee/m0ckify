"use client";

import Image from "next/image";
import Link from "next/link";

import Button from "@/ui/components/atoms/Button.atom";

import { Inter } from "next/font/google";

import logo from "@/public/images/logo.png";
import mockifyBackground from "@/public/images/bg.jpg";

import "@/ui/styles/pages/notFound.page.scss";

const inter = Inter({
  subsets: ["latin"],
});

export default function NotFound() {
  return (
    <html lang="en">
      <body className={` ${inter.className}  body`}>
        <main className="not-found">
          <div className="left">
            <Link href={"/"}>
              <Image src={logo} alt="Mockify" />
            </Link>

            <div className="text">
              <h1>Something went wrong</h1>
              <p>We couldn&apos;t find the page you are looking for...</p>
            </div>
            <div className="links">
              <Link href={"/"}>
                <Button variant="editor">Home Page</Button>
              </Link>
              <Link href={"/generate"}>
                <Button variant="editor" className="danger">
                  Let&apos;s Work!
                </Button>
              </Link>
            </div>
          </div>
          <div className="right">
            <Image src={mockifyBackground} alt="Mockify" />
          </div>
        </main>
        {/* <Error statusCode={404} /> */}
      </body>
    </html>
  );
}
