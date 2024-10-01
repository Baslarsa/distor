import { Button } from "@headlessui/react";
import classNames from "classnames";
import { ButtonHTMLAttributes, Fragment, ReactNode } from "react";
import { HiOutlineUpload } from "react-icons/hi";

interface DefaultButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: ReactNode;
}
const DefaultButton = ({
  className,
  children,
  ...props
}: DefaultButtonProps) => {
  return (
    <Button as={Fragment}>
      {({ hover, active }) => (
        <button
          {...props} // Spread the rest of the props here
          className={classNames(
            className,
            hover && "bg-white text-black",
            "bg-transparent py-2 px-4"
          )}
        >
          {children}
        </button>
      )}
    </Button>
  );
};

export default DefaultButton;
