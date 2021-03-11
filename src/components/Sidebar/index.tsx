import Head from "next/head";

import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { FiHome, FiSettings } from "react-icons/fi";
import SidebarItem from "../SidebarItem";

export default function Sidebar() {
  const router = useRouter();

  return (
    <div className="col-span-3 lg:col-span-2 sticky h-(screen-20) bg-sidebar overflow-y-auto">
      <div className="grid grid-flow-row gap-8 p-12">
        <SidebarItem icon={<FiHome />} name="Projetos" href="/" />
        <SidebarItem icon={<FiSettings />} name="Definições" href="/settings" />
      </div>
    </div>
  );
}
