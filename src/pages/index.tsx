import Head from "next/head";

import getCurrentUser from "../helpers/getUser";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { FiChevronDown } from "react-icons/fi";
import { Header } from "../components/Header";
import { User } from "../@types/user";
import Sidebar from "../components/Sidebar";

export default function Home({ user }) {
  return (
    <>
      <Head>
        <title>Tempus | Projects</title>
      </Head>
      <Header user={user} />
      <div className="grid grid-cols-12 z-10">
        <Sidebar />
        <div className="col-span-10">Content here</div>
      </div>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const user: User = await getCurrentUser(ctx);

  return { props: { user: user } };
}
