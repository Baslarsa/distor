import classNames from "classnames";
import { ChangeEventHandler } from "react";

type TextAreaProps = {
  label?: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  value: string;
  className?: string;
};
const TextArea = ({ label, onChange, value, className }: TextAreaProps) => {
  return (
    <div className="text-white w-full">
      {label && (
        <div className="pb-2 text-sm">
          <p>{label}</p>
        </div>
      )}
      <div>
        <textarea
          rows={5}
          className={classNames(
            className,
            "text-white bg-white/5 border-b border-b-white py-2 px-3 outline-none w-full"
          )}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default TextArea;
