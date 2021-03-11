import { Transition } from "@headlessui/react";
import React, { useRef } from "react";
import { Button } from "../Button";
import { TextField } from "../Forms/TextField";
import { Heading } from "../Heading";
import { OuterClick } from "react-outer-click";

// import { Container } from './styles';

export interface ModalProps {
  isOpen: boolean;
  onOutsideClick?: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, children, onOutsideClick }) => {
  return (
    <Transition appear={true} show={isOpen}>
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20  sm:block sm:p-0">
          <Transition.Child
            enter="transition-opacity ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
          </Transition.Child>
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            enter="transition-all ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-950"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="transition-all ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            as="div"
            className="fixed inset-0 z-50 overflow-auto flex"
          >
            <OuterClick
              onOuterClick={onOutsideClick}
              as="div"
              className="relative p-12 bg-white w-2/4 m-auto flex-col transform shadow-sm flex rounded-lg"
            >
              <div>{children}</div>
              <span className="absolute top-0 right-0 p-4"></span>
            </OuterClick>
          </Transition.Child>
        </div>
      </div>
    </Transition>
  );
};

export default Modal;
function useOuterClick(
  profileDropdown: React.MutableRefObject<any>,
  arg1: () => void
) {
  throw new Error("Function not implemented.");
}
