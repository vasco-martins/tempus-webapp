import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

// import { Container } from './styles';

export interface SidebarItemProps {
  icon: Object;
  name: string;
  href: string;
  blank?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  name,
  href,
  blank,
}) => {
  const router = useRouter();

  const [className, setClassName] = useState(
    "link-body flex gap-4 items-center cursor-pointer"
  );

  useEffect(() => {
    console.log(window.location.pathname);
    if (window.location.pathname === href) {
      setClassName(`${className} text-blue-600 font-bold`);
    }
  }, []);

  if (blank) {
    return (
      <a href={href} target="_blank">
        <div className={className}>
          {icon}
          <a className="text-lg">{name}</a>
        </div>
      </a>
    );
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
