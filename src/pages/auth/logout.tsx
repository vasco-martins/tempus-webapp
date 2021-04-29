import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { destroyCookie, parseCookies } from "nookies";
import React, { useEffect } from "react";

export default function Login() {
  const router = useRouter();

  useEffect(() => {
    destroyCookie(null, "token");
    router.push("/auth/login");
  }, []);

  return (
    <>
      <Head>
        <title>Tempus | Login</title>
      </Head>

      <p className="m-4">Logging out...</p>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const { token } = parseCookies(ctx);

  if (token) {
    const url = process.env.NEXT_PUBLIC_API_URL + "/auth/logout";
    axios.post(
      url,
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
  }

  return {
    props: {},
  };
}
