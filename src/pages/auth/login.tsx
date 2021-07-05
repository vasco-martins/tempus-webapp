import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { parseCookies, setCookie } from "nookies";
import React, { useState } from "react";
import CookieConsent from "react-cookie-consent";
import { Button } from "../../components/Button";
import { TextField } from "../../components/Forms/TextField";
import { Heading } from "../../components/Heading";

import Image from "next/image";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleKeydownEvent = async (e) => {
    if (!(e.key === "Enter") || email.length == 0 || password.length == 0)
      return;

    await submit();
  };

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
      const response = await axios.post(
        url,
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Content-Type": "application/json",
          },
        }
      );

      //const cookies = parseCookies();
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
        <div className="login flex items-center bg-white">
          <div className="w-2/3 grid grid-cols-1 gap-6  m-auto">
            <div className="flex">
              <Image src="/logo.svg" height={75} width={240} />
            </div>
            <Heading size={"h2"} weight={"bold"} className="">
              Login
            </Heading>
            <TextField
              name="email"
              type="email"
              error={emailError}
              onChange={setEmail}
              label="Email"
              onKeyDown={handleKeydownEvent}
            />
            <TextField
              name="password"
              type="password"
              onChange={setPassword}
              label="Password"
              error={passwordError}
              onKeyDown={handleKeydownEvent}
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
            <div className="group flex flex-col gap-2">
              <Link href="/auth/register">
                <p className="cursor-pointer">
                  Não tem uma conta?{" "}
                  <span className="underline text-primary">
                    Registe-se aqui!
                  </span>
                </p>
              </Link>
              <Link href="/auth/forgot-password">
                <p className="underline text-primary cursor-pointer">
                  Esqueci-me da password
                </p>
              </Link>
            </div>
            <CookieConsent
              style={{ background: "#F5F7FF", color: "#3D3D3D" }}
              buttonText="Compreendi!"
            >
              Este website utiliza cookies para melhorar a experiência de
              utilização
            </CookieConsent>
          </div>
        </div>
        <div
          className="md:items-center md:justify-center hidden md:flex md:flex-col gap-7"
          style={{
            background:
              "radial-gradient(51.04% 48.52% at 48.96% 51.48%, #17BDBF 0%, rgba(76, 91, 223, 0.54) 100%)",
          }}
        >
          <Image src={"/login_draw_2.png"} width={500} height={500} />
          <Heading size="h3" className="text-white">
            Torna as tuas ideias realidade
          </Heading>
        </div>
      </div>
    </>
  );
}
