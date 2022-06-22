import { useEffect } from "@storybook/addons";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import Icon, { close, noticeError } from "src/assets/svg";

type InputVariantType = "regular" | "large";
type InputHandle = {
  getValue: () => string;
};

export interface InputProps {
  defaultValue?: string;
  variant?: InputVariantType;
  error?: boolean;
}

const Input = forwardRef<InputHandle, InputProps>(
  ({ defaultValue = "", variant = "regular", error = false }, ref) => {
    const [isFocus, setIsFocus] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => ({
      getValue: () => {
        return inputRef.current ? inputRef.current.value : "";
      },
    }));
    const getClassName = (): string => {
      let className: string[] = [];
      if (error) className.push("Input--error-bottom-border");
      if (variant === "large") className.push("Input--large");
      return className.join(" ");
    };
    const onCloseClick = (): void => {
      if (inputRef.current) inputRef.current.value = "";
    };

    return (
      <>
        <main className="RemittanceMain">
          <article className="RemittanceDetail">
            <div
              className={`Input ${
                isFocus && "Input--add-bottom-border"
              } ${getClassName()}`}
            >
              <input
                className="Input__element"
                defaultValue={defaultValue}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                ref={inputRef}
              />
              {variant === "regular" && (
                <div>
                  <button
                    onClick={onCloseClick}
                    type="button"
                    className="Input__button-delete"
                  >
                    <Icon icon={close} size={18} />
                  </button>
                </div>
              )}
            </div>
          </article>
        </main>
      </>
    );
  }
);

export default Input;
