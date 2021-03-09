import axios from "axios";
import { redirect } from "next/dist/next-server/server/api-utils";
import Head from "next/head";

import nookies, { parseCookies } from "nookies";
import React from "react";

export default function Login() {
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

  nookies.destroy(ctx, "token");

  return {
    redirect: {
      destination: "/auth/login",
      permanent: false,
    },
  };
}
