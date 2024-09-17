"use client";

import { useContext, useEffect, useState } from "react";
import { Link, useRouter } from "@/navigation";
import Image from "next/image";

import { useLogin } from "@/infrastructure/mutations/user";

import logo from "@/public/images/logo.svg";

import "@/ui/styles/pages/login.page.scss";
import Context from "@/ui/providers/ContextProvider.provider";

export default function LoginPage() {
  const router = useRouter();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const { refetchUser } = useContext(Context);

  const onSuccess = (data: { data: string }) => {
    localStorage.setItem("token", JSON.stringify(data.data));
    refetchUser();
    router.push("/generate");
  };

  const { mutate: logIn, error } = useLogin(onSuccess);

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
    alert(error?.message);
  }, [error]);

  return (
    <div className="auth-section__left">
      <form className="form login" onSubmit={handleSubmit}>
        <Link href={"/"}>
          <Image src={logo} alt="" />
        </Link>
        <div className="inputs">
          <div className="input">
            <label htmlFor="username">Username</label>
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
            <label htmlFor="password">Password</label>
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
        <button>Login</button>
        <p className="register-cta">
          {`Don't have an account?`} <Link href="/register">Register here</Link>
        </p>
      </form>
    </div>
  );
}
