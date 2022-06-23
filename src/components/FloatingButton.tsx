import Icon, { add } from "src/assets/svg";

export interface FloatingButtonProps {
  onClick: () => void;
}

const FloatingButton = ({ onClick }: FloatingButtonProps) => {
  return (
    <button type="button" className="RemittanceAddButton" onClick={onClick}>
      <Icon icon={add} aria-label="추가" />
    </button>
  );
};

export default FloatingButton;
