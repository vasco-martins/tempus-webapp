import Image from "next/image";
import React, { useRef, useState } from "react";
import { User } from "../../@types/user";
import { useOuterClick } from "react-outer-click";
import Link from "next/link";
import { useRouter } from "next/router";
import UserController from "../../controllers/UserController";

export interface HeaderProps {
  user: User;
}

export const Header: React.FC<HeaderProps> = ({ user }) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileDropdown = useRef(null);
  const router = useRouter();

  useOuterClick(profileDropdown, () => {
    setIsProfileMenuOpen(false);
  });

  const toggleIsProfileMenuOpen = () =>
    setIsProfileMenuOpen(!isProfileMenuOpen);

  return (
    <div className="w-full z-50 h-20 shadow-lg justify-between flex items-center px-12">
      <Image src="/logo.svg" height={35} width={150} />

      <div className="right flex items-center content-end">
        <div className="relative inline-block" ref={profileDropdown}>
          <div
            className="profile flex items-center select-none	 gap-4 cursor-pointer"
            id="options-menu"
            aria-expanded="true"
            aria-haspopup="true"
            onClick={toggleIsProfileMenuOpen}
          >
            <span className="text-gray-600">{user.name}</span>
            <Image
              className="rounded-full"
              src="/profile.png"
              alt="Picture of the author"
              width={38}
              height={38}
            />
          </div>
          {isProfileMenuOpen && (
            <div
              className="origin-top-right transition ease-out duration-100 absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <div className="py-1" role="none">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                  role="menuitem"
                >
                  Account settings
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                  role="menuitem"
                >
                  Support
                </a>

                <a
                  className="block px-4 py-2 text-sm text-red-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer transition-colors"
                  role="menuitem"
                  onClick={() => UserController.logout(router)}
                >
                  Logout
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
