import Icon, { add } from "src/assets/svg";

export interface RemittanceEmptyCardProp {
  onAddButtonClick: () => void;
}

const RemittanceEmptyCard = ({ onAddButtonClick }: RemittanceEmptyCardProp) => {
  return (
    <main className="RemittanceMain">
      <article className="RemittanceEmptyCard">
        <strong>
          자동이체와 예약이체를
          <br />
          모아서 한눈에 관리하세요
        </strong>
        <button type="button" aria-label="추가" onClick={onAddButtonClick}>
          <Icon icon={add} />
        </button>
      </article>
    </main>
  );
};

export default RemittanceEmptyCard;
