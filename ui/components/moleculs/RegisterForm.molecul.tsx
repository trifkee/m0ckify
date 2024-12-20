"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/routing";

import Button from "@/ui/components/atoms/Button.atom";
import Spinner from "@/ui/components/atoms/Spinner.atom";

import { useRegisterUser } from "@/infrastructure/mutations/user";

import { IoClose } from "react-icons/io5";

export default function RegisterForm() {
  const t = useTranslations("auth");

  const {
    mutate: register,
    isPending,
    data,
    error,
    isSuccess,
  } = useRegisterUser();

  const [registerError, setRegisterError] = useState<string | null>(null);

  const router = useRouter();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    repeatPassword: "",
    email: "",
    firstName: "",
    lastName: "",
  });

  const [passMatch, setPassMatch] = useState(false);

  useEffect(() => {
    setPassMatch(credentials.password === credentials.repeatPassword);
  }, [credentials.password, credentials.repeatPassword]);

  useEffect(() => {
    const message = error?.message;
    if (message?.includes("409")) {
      setRegisterError(t("register.errors.409"));
      return;
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      setCredentials({
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        repeatPassword: "",
        username: "",
      });

      router.push("/generate");
    }
  }, [isSuccess]);

  const handleChange = (e: any) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!passMatch) {
      setRegisterError(t("register.errors.missPw"));

      return;
    }

    register({
      username: credentials.username,
      password: credentials.password,
      email: credentials.email,
      firstName: credentials.firstName || "Mockify",
      lastName: credentials.lastName || " ",
    });
  };

  return (
    <form className="form login" onSubmit={handleSubmit}>
      <Link prefetch={false} href={"/"}>
        <Image
          width={200}
          height={200}
          src="https://utfs.io/f/iztaqYgynMhQAAScNDp45cXet67xjMIG139haKqJYUSiEkFB"
          alt="Mockify"
        />
      </Link>

      <AnimatePresence presenceAffectsLayout mode="wait">
        {registerError && (
          <motion.div
            className="error-message"
            initial={{
              opacity: 0,
              width: 0,
            }}
            animate={{
              opacity: 1,
              width: "100%",
              transformOrigin: "top left",
              transition: {
                duration: 0.5,
                delay: 0.5,
              },
            }}
            exit={{
              opacity: 0,
              width: 0,
            }}
          >
            <p>{registerError}</p>
            <Button
              type="button"
              onClick={() => setRegisterError(null)}
              variant="transparent"
            >
              <IoClose />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="inputs">
        <div className="input">
          <label htmlFor="email">
            {t("register.email")} <span>*</span>
          </label>
          <input
            onChange={handleChange}
            value={credentials.email}
            type="email"
            id="email"
            name="email"
            required
            placeholder="email"
          />
        </div>
        <div className="input">
          <label htmlFor="username">
            {t("register.username")} <span>*</span>
          </label>
          <input
            onChange={handleChange}
            value={credentials.username}
            type="text"
            id="username"
            name="username"
            required
            placeholder="Username"
          />
        </div>
        {/* <div className="input">
        <label htmlFor="email">{t("register.firstName")}</label>
        <input
          onChange={handleChange}
          value={credentials.firstName}
          type="text"
          id="firstName"
          name="firstName"
          placeholder="first name"
        />
      </div>
      <div className="input">
        <label htmlFor="email">{t("register.lastName")}</label>
        <input
          onChange={handleChange}
          value={credentials.lastName}
          type="text"
          id="lastName"
          name="lastName"
          placeholder="last name"
        />
      </div> */}
        <div className="input">
          <label htmlFor="password">
            {t("register.password")} <span>*</span>
          </label>
          <input
            style={{
              outline: !passMatch ? "1px solid #e23a5b" : "none",
            }}
            min={7}
            onChange={handleChange}
            type="password"
            id="password"
            required
            value={credentials.password}
            name="password"
            placeholder="••••••••••••••••"
          />
        </div>
        <div className="input">
          <label htmlFor="password">
            {t("register.confirmPassword")}
            <span>*</span>
          </label>
          <input
            style={{
              outline: !passMatch ? "1px solid #e23a5b" : "none",
            }}
            onChange={handleChange}
            type="password"
            id="repeatPassword"
            required
            value={credentials.repeatPassword}
            name="repeatPassword"
            placeholder="••••••••••••••••"
          />
        </div>
      </div>
      <button disabled={isPending}>
        {isPending ? <Spinner /> : t("register.submit")}
      </button>
      {/* <p className="forgot-password">Forgot your password?</p> */}
      <p className="register-cta">
        {t("register.login")}{" "}
        <Link prefetch={false} href="/login">
          {t("register.loginCta")}
        </Link>
      </p>
    </form>
  );
}
