export interface ButtonedFieldProps {
  value: string;
  buttonText?: string;
  buttonActive?: boolean;
  onButtonClick?: () => void;
}

const ButtonedField = ({
  value,
  buttonText = "",
  buttonActive = true,
  onButtonClick,
}: ButtonedFieldProps) => {
  return (
    <p className="RemittanceDetail--paragraph-space-between">
      <span>{value}</span>
      {buttonActive ? (
        <button
          type="button"
          className="RemittanceDetail__button RemittanceDetail__button--empty"
          onClick={onButtonClick}
        >
          {buttonText}
        </button>
      ) : (
        buttonText && (
          <span className="RemittanceDetail__info RemittanceDetail__info--empty">
            {buttonText}
          </span>
        )
      )}
    </p>
  );
};

export default ButtonedField;
