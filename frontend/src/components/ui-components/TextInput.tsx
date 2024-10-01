import { ChangeEventHandler } from "react";

type TextInputProps = {
  label: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string;
};
const TextInput = ({ label, onChange, value }: TextInputProps) => {
  return (
    <div>
      <div className="pb-2 text-sm">
        <p>{label}</p>
      </div>
      <div>
        <input
          className="text-white bg-white/5 border-b border-b-white py-2 px-3 outline-none"
          value={value}
          onChange={onChange}
          type={"text"}
        />
      </div>
    </div>
  );
};

export default TextInput;
