import axios from "axios";
import Head from "next/head";
import { parseCookies, setCookie } from "nookies";
import React, { useState } from "react";
import { Button } from "../../components/Button";
import { TextField } from "../../components/Forms/TextField";
import { Heading } from "../../components/Heading";
import { useRouter } from "next/router";
import nookies from "nookies";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const submit = async () => {
    setLoading(true);
    setEmailError(null);
    setPasswordError(null);
    setSuccess(false);
    const url = process.env.NEXT_PUBLIC_API_URL + "/auth/login";

    const emailRegexValidation = /\S+@\S+\.\S+/;

    if (!emailRegexValidation.test(email)) {
      setLoading(false);
      setEmailError("Email inválido");
      return;
    }

    try {
      const response = await axios.post(url, {
        email: email,
        password: password,
      });

      const cookies = parseCookies();
      setCookie(null, "token", response.data?.token, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });

      router.push("/");

      setSuccess(true);
    } catch (ex) {
      setEmailError("Email ou password errados");
      setLoading(false);
      return;
    }
  };
  return (
    <>
      <Head>
        <title>Tempus | Login</title>
      </Head>
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
        <div className="login flex items-center ">
          <div className="w-2/3 grid grid-cols-1 gap-6  m-auto">
            <Heading size={"h2"} weight={"bold"} className="">
              Login
            </Heading>
            <TextField
              name="email"
              type="email"
              error={emailError}
              onChange={setEmail}
              label="Email"
            />
            <TextField
              name="password"
              type="password"
              onChange={setPassword}
              label="Password"
              error={passwordError}
            />
            <Button
              onClick={submit}
              loading={loading}
              color={success ? "success" : "primary"}
              disabled={email.length == 0 || password.length == 0}
              className="md:w-1/4"
            >
              Login
            </Button>
          </div>
        </div>
        <div className="image hidden md:block bg-blue-50"></div>
      </div>
    </>
  );
}
