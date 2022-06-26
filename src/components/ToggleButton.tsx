import { useState, MouseEvent } from "react";

export interface ToggleButtonProps {
  isActive?: boolean;
  onChange?: (isActive: boolean) => void;
}

const ToggleButton = ({ isActive = false, onChange }: ToggleButtonProps) => {
  const [isToggleActive, setIsToggleActive] = useState<boolean>(isActive);

  const onToggleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsToggleActive((org) => {
      onChange && onChange(!org);
      return !org;
    });
  };

  return (
    <button
      className={`ToggleButton ${isToggleActive ? "ToggleButton--active" : ""}`}
      aria-label="스위치"
      onClick={onToggleClick}
    />
  );
};

export default ToggleButton;
