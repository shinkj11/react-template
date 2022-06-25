import {
  ChangeEvent,
  forwardRef,
  InputHTMLAttributes,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import Icon, { close } from "src/assets/svg";

type InputVariantType = "regular" | "large";
type InputHandle = {
  getValue: () => string;
};

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  placeHolder?: string;
  defaultValue?: string;
  variant?: InputVariantType;
  error?: boolean;
  readonly?: boolean;
  errorMessage?: string;
  onClick?: () => void;
  showRemoveButton?: boolean;
  onCloseClick?: () => void;
}

const Input = forwardRef<InputHandle, InputProps>(
  (
    {
      type = "text",
      placeHolder = "",
      defaultValue = "",
      variant = "regular",
      error = false,
      readOnly = false,
      errorMessage = "",
      showRemoveButton = true,
      onClick,
      onChange,
      onCloseClick,
      ...rest
    },
    ref
  ) => {
    const [isFocus, setIsFocus] = useState<boolean>(false);
    const [isEmpty, setIsEmpty] = useState<boolean>(!defaultValue);
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
    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      e.target.value ? setIsEmpty(false) : setIsEmpty(true);
      onChange && onChange(e);
    };
    const handleCloseClick = (): void => {
      if (ref) {
        if (inputRef.current) inputRef.current.value = "";
      } else {
        onCloseClick && onCloseClick();
      }
      setIsEmpty(true);
    };

    useEffect(() => {
      console.log(defaultValue);
    }, []);

    return (
      <>
        <div
          className={`Input ${
            isFocus && "Input--add-bottom-border"
          } ${getClassName()}`}
          onClick={onClick}
        >
          <input
            className="Input__element"
            type={type}
            placeholder={placeHolder}
            defaultValue={ref ? undefined : defaultValue}
            onFocus={() => !readOnly && setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            ref={ref && inputRef}
            readOnly={readOnly}
            onChange={onInputChange}
            {...rest}
          />
          {error && (
            <span className="Input__error-message">{errorMessage}</span>
          )}
          {!isEmpty && showRemoveButton && (
            <div>
              <button
                onClick={handleCloseClick}
                type="button"
                className="Input__button-delete"
              >
                <Icon icon={close} size={18} />
              </button>
            </div>
          )}
        </div>
      </>
    );
  }
);

export default Input;
