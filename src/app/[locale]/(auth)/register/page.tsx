"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Link, useRouter } from "@/navigation";

import { useRegisterUser } from "@/infrastructure/mutations/user";

import logo from "@/public/images/logo.svg";

import "@/ui/styles/pages/login.page.scss";

export default function LoginPage() {
  const { mutate: register, isPending, data } = useRegisterUser();

  const router = useRouter();

  const handleSuccessRegister = () => {
    setCredentials({
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      repeatPassword: "",
      username: "",
    });

    localStorage.setItem("user_id", data?.data?.id);
    router.push("/generate");
  };

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    repeatPassword: "",
    email: "",
    firstName: "",
    lastName: "",
  });

  const [passMatch, setPassMatch] = useState(false);

  const handleChange = (e: any) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!passMatch) {
      alert("Passwords do not match!");
      return;
    }

    register({
      username: credentials.username,
      password: credentials.password,
      email: credentials.email,
      firstName: credentials.firstName || "Mockify",
      lastName: credentials.lastName || " ",
    });
    handleSuccessRegister();
  };

  useEffect(() => {
    localStorage.setItem("user_id", data?.data?.id);
  }, [data]);

  useEffect(() => {
    setPassMatch(credentials.password === credentials.repeatPassword);
  }, [credentials.password, credentials.repeatPassword]);

  return (
    <div className="auth-section__left">
      <form className="form login" onSubmit={handleSubmit}>
        <Link href={"/"}>
          <Image src={logo} alt="" />
        </Link>
        <div className="inputs">
          <div className="input">
            <label htmlFor="email">* Email</label>
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
            <label htmlFor="username">* Username</label>
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
          <div className="input">
            <label htmlFor="email">First name</label>
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
            <label htmlFor="email">Last name</label>
            <input
              onChange={handleChange}
              value={credentials.lastName}
              type="text"
              id="lastName"
              name="lastName"
              placeholder="last name"
            />
          </div>
          <div className="input">
            <label htmlFor="password">* Password</label>
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
            <label htmlFor="password">* Repeat Password</label>
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
        <button
          style={{
            backgroundColor: passMatch ? "#4f7bad" : "#e23a5b",
            color: "white",
            marginTop: "20px",
            width: "100%",
            cursor: "pointer",
            opacity: isPending ? 0.2 : 1,
            pointerEvents: isPending ? "none" : "auto",
          }}
        >
          Login
        </button>
        {/* <p className="forgot-password">Forgot your password?</p> */}
        <p className="register-cta">
          Already have an account? <Link href="/login">Login here</Link>
        </p>
      </form>
    </div>
  );
}
