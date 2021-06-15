import Head from "next/head";

import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { FiArrowLeft, FiHome, FiSettings, FiUser } from "react-icons/fi";
import SidebarItem from "../SidebarItem";
import SidebarWrapper from "./SidebarWrapper";

export default function Sidebar() {
  const router = useRouter();

  return (
    <SidebarWrapper>
      {router.pathname !== "/" && (
        <SidebarItem icon={<FiArrowLeft />} name="Voltar" href="/" />
      )}
      <SidebarItem icon={<FiHome />} name="Projetos" href="/" />
      <SidebarItem icon={<FiUser />} name="A minha conta" href="/profile" />
    </SidebarWrapper>
  );
}
