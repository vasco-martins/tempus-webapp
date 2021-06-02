import axios from "axios";
import Head from "next/head";
import { parseCookies, setCookie } from "nookies";
import React, { useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { TextField } from "../../components/Forms/TextField";
import { Heading } from "../../components/Heading";
import { useRouter } from "next/router";
import nookies from "nookies";
import Link from "next/link";
import useDidMountEffect from "../../helpers/hooks/useDidMountEffect";
import UserController from "../../controllers/UserController";
import CookieConsent from "react-cookie-consent";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const submit = async () => {
    setLoading(true);
    setSuccess(false);

    const response = await UserController.register(
      name,
      email,
      password,
      passwordConfirmation
    );

    if (response.errors) {
      setLoading(false);
      setErrors(() => response.errors);
      return;
    }

    setCookie(null, "token", response, {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });
    setSuccess(true);
    router.push("/");
  };

  return (
    <>
      <Head>
        <title>Tempus | Register</title>
      </Head>
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
        <div className="login flex items-center bg-white">
          <div className="w-2/3 grid grid-cols-1 gap-6  m-auto ">
            <Heading size={"h2"} weight={"bold"} className="">
              Registar
            </Heading>
            <TextField
              name="name"
              onChange={setName}
              label="Nome"
              error={errors?.name || null}
            />
            <TextField
              name="email"
              type="email"
              error={errors?.email || null}
              onChange={setEmail}
              label="Email"
            />
            <TextField
              name="password"
              type="password"
              onChange={setPassword}
              label="Password"
              error={errors?.password || null}
            />
            <TextField
              name="password_confirm"
              type="password"
              onChange={setPasswordConfirmation}
              label="Confirmar Password"
              error={errors?.password_confirmation || null}
            />
            <Button
              onClick={submit}
              loading={loading}
              color={success ? "success" : "primary"}
              disabled={
                email.length == 0 ||
                name.length == 0 ||
                password.length == 0 ||
                passwordConfirmation.length == 0
              }
              className="md:w-1/4"
            >
              Registar
            </Button>
            <Link href="/auth/login">
              <p className="cursor-pointer">
                Já tem uma conta?{" "}
                <span className="underline text-primary">Faça login aqui!</span>
              </p>
            </Link>
          </div>
        </div>
        <CookieConsent
          style={{ background: "#F5F7FF", color: "#3D3D3D" }}
          buttonText="Compreendi!"
        >
          Este website utiliza cookies para melhorar a experiência de utilização
        </CookieConsent>
        <div className="image hidden md:block bg-blue-50"></div>
      </div>
    </>
  );
}
