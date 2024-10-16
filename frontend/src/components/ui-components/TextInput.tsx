import classNames from "classnames";
import { ChangeEventHandler } from "react";

type TextInputProps = {
  label?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string;
  className?: string;
};
const TextInput = ({ label, onChange, value, className }: TextInputProps) => {
  return (
    <div className="text-white w-full">
      {label && (
        <div className="pb-2 text-sm">
          <p>{label}</p>
        </div>
      )}
      <div>
        <input
          className={classNames(
            className,
            "text-white bg-white/5 border-b border-b-white py-2 px-3 outline-none w-full"
          )}
          value={value}
          onChange={onChange}
          type={"text"}
        />
      </div>
    </div>
  );
};

export default TextInput;
