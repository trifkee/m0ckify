"use client";

import { useContext, useEffect, useState } from "react";
import { Link, useRouter } from "@/navigation";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { useLogin } from "@/infrastructure/mutations/user";

import logo from "@/public/images/logo.svg";

import Context from "@/ui/providers/ContextProvider.provider";
import Button from "@/ui/components/atoms/Button.atom";

import { IoClose } from "react-icons/io5";

import "@/ui/styles/pages/login.page.scss";
import Spinner from "../atoms/Spinner.atom";

export default function LoginForm({ modal }: { modal?: boolean }) {
  const t = useTranslations("auth.login");

  const [loginError, setLoginError] = useState<string | null>(null);

  const router = useRouter();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const { refetchUser, user } = useContext(Context);

  if (user) {
    router.replace("/generate");
  }

  const onSuccess = (data: { data: string }) => {
    localStorage.setItem("token", JSON.stringify(data.data));
    refetchUser();
    router.push("/generate");
  };

  const { mutate: logIn, error, isPending } = useLogin(onSuccess);

  const handleChange = (e: any) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    logIn({
      username: credentials.username,
      password: credentials.password,
    });
  };

  useEffect(() => {
    setLoginError(error?.message ?? null);
    console.error(error?.message);
  }, [error]);

  return (
    <form className="form login" onSubmit={handleSubmit}>
      {modal ? (
        <Image
          src={logo}
          alt="'.."
          style={{
            maxWidth: "8rem",
          }}
        />
      ) : (
        <Link href={modal ? "/generate" : "/"}>
          <Image src={logo} alt="" />
        </Link>
      )}

      <AnimatePresence presenceAffectsLayout mode="wait">
        {loginError && (
          <motion.div
            className="error-message"
            initial={{
              opacity: 0,
              // height: 0,
              padding: "inherit",
              width: 0,
            }}
            animate={{
              opacity: 1,
              // height: "auto",
              width: "100%",
              transformOrigin: "top left",
              transition: {
                duration: 0.5,
                delay: 0.5,
              },
            }}
            exit={{
              opacity: 0,
              // height: 0,
              width: 0,
            }}
          >
            <p>{t("errors.invalidCredentials")}</p>
            <Button
              type="button"
              onClick={() => setLoginError(null)}
              variant="transparent"
            >
              <IoClose />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="inputs">
        <div className="input">
          <label htmlFor="username">{t("username")}</label>
          <input
            onChange={handleChange}
            value={credentials.username}
            type="text"
            id="username"
            name="username"
            placeholder="Username"
          />
        </div>
        <div className="input">
          <label htmlFor="password">{t("password")}</label>
          <input
            onChange={handleChange}
            type="password"
            id="password"
            value={credentials.password}
            name="password"
            placeholder="••••••••••••••••"
          />
        </div>
      </div>
      <button disabled={isPending}>
        {isPending ? <Spinner /> : t("submit")}
      </button>
      <p className="register-cta">
        {t("register")} <Link href="/register">{t("registerCta")}</Link>
      </p>
    </form>
  );
}
