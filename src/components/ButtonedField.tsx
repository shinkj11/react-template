export interface ButtonedFieldProps {
  value: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

const ButtonedField = ({
  value,
  buttonText = "",
  onButtonClick,
}: ButtonedFieldProps) => {
  return (
    <p className="RemittanceDetail--paragraph-space-between">
      <span>{value}</span>
      <button
        type="button"
        className="RemittanceDetail__button RemittanceDetail__button--empty"
        onClick={onButtonClick}
      >
        {buttonText}
      </button>
    </p>
  );
};

export default ButtonedField;
