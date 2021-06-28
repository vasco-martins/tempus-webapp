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
import Image from "next/image";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [privacy, setPrivacy] = useState(false);

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
        <div className="login py-8 flex items-center bg-white">
          <div className="w-2/3 grid grid-cols-1 gap-6  m-auto ">
            <div className="flex">
              <Image src="/logo.svg" height={75} width={240} />
            </div>
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

            <div className="flex my-8">
              <input
                type="checkbox"
                className="h-6 w-6 rounded border-none bg-indigo-100 mr-4 font-thin"
                name="privacy"
                onChange={(e) => {
                  setPrivacy(e.target.checked);
                }}
                checked={privacy}
              />
              <p> Confirmo que li e concordo com a </p>
              <a href="/privacy-policy" target="_blank">
                <p className="cursor-pointer underline text-primary mx-1">
                  Política de Privacidade
                </p>
              </a>
              <p>.</p>
            </div>
            <Button
              onClick={submit}
              loading={loading}
              color={success ? "success" : "primary"}
              disabled={
                email.length == 0 ||
                name.length == 0 ||
                password.length == 0 ||
                passwordConfirmation.length == 0 ||
                !privacy
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
        <div
          className="md:items-center md:justify-center hidden md:flex md:flex-col gap-7"
          style={{
            background:
              "radial-gradient(51.04% 48.52% at 48.96% 51.48%, #17BDBF 0%, rgba(76, 91, 223, 0.54) 100%)",
          }}
        >
          <Image src={"/register_background_2.png"} width={600} height={600} />
          <Heading size="h3" className="text-white">
            Pronta(o) para embarcar?
          </Heading>
        </div>{" "}
      </div>
    </>
  );
}
