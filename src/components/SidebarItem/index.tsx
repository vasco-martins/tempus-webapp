import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

// import { Container } from './styles';

export interface SidebarItemProps {
  icon: Object;
  name: string;
  href: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, name, href }) => {
  const router = useRouter();

  let className = "link-body flex gap-4 items-center cursor-pointer";
  if (router.pathname === href) {
    className = `${className} text-blue-600 font-bold`;
  }
  return (
    <Link href={href}>
      <div className={className}>
        {icon}
        <a className="text-lg">{name}</a>
      </div>
    </Link>
  );
};

export default SidebarItem;
