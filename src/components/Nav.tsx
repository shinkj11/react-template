import Icon, { arrowBack, close } from "src/assets/svg";

type NavLeftButtonType = "back";
type NavRightButtonType = "close" | "delete";

export interface NavProps {
  title?: string;
  leftButton?: NavLeftButtonType;
  rightButton?: NavRightButtonType;
  onLeftButtonClick?: () => void;
  onRightButtonClick?: () => void;
}

const Nav = ({
  title = "",
  leftButton,
  rightButton,
  onLeftButtonClick,
  onRightButtonClick,
}: NavProps) => {
  return (
    <nav className="Navigation">
      {leftButton === "back" && (
        <button
          type="button"
          className="Navigation__button Navigation__button--left"
          aria-label="뒤로가기"
          onClick={onLeftButtonClick}
        >
          <Icon icon={arrowBack} />
        </button>
      )}
      <strong>{title}</strong>
      {rightButton === "delete" && (
        <button
          type="button"
          className="Navigation__button Navigation__button--right"
          onClick={onRightButtonClick}
        >
          삭제
        </button>
      )}
      {rightButton === "close" && (
        <button
          type="button"
          className="Navigation__button Navigation__button--right"
          aria-label="닫기"
          onClick={onRightButtonClick}
        >
          <Icon icon={close} />
        </button>
      )}
    </nav>
  );
};

export default Nav;
