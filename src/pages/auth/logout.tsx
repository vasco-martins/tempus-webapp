import axios from "axios";
import { redirect } from "next/dist/next-server/server/api-utils";
import Head from "next/head";
import { useRouter } from "next/router";

import nookies, { destroyCookie, parseCookies } from "nookies";
import React, { useEffect } from "react";

export default function Login() {
  const router = useRouter();

  const cookies = parseCookies();

  useEffect(() => {
    destroyCookie(null, "token");
    router.push("/auth/login");
  }, []);

  return (
    <>
      <Head>
        <title>Tempus | Login</title>
      </Head>

      <p>Logging out...</p>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const { token } = parseCookies(ctx);

  if (token) {
    const url = process.env.NEXT_PUBLIC_API_URL + "/auth/logout";
    axios.post(url, {
      Authorization: "Bearer " + token,
    });
  }

  return {
    props: {},
  };
}
