"use client";

import Button from "@/ui/components/atoms/Button.atom";

import mockifyBackground from "@/public/images/bg.jpg";
import logo from "@/public/images/logo.png";

import "@/ui/styles/pages/notFound.page.scss";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function RootNotFound() {
  <html lang="en">
    <body>
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
              <Button variant="primary">Home Page</Button>
            </Link>
            <Link href={"/generate"}>
              <Button variant="danger">Let&apos;s Work!</Button>
            </Link>
          </div>
        </div>
        <div className="right">
          <Image src={mockifyBackground} alt="Mockify" />
        </div>
      </main>
      {/* <Error statusCode={404} /> */}
    </body>
  </html>;
}
