import { useState } from "react";
import { ReservationType } from "src/type";
import { getDateDiff, getNumberWithCommas } from "src/util/Util";
import ToggleButton from "./ToggleButton";

export interface RemittanceCardProps {
  title: string;
  bankName: string;
  accountNumber: string;
  type: ReservationType;
  dateAt: string;
  amount: number;
  isActive: boolean;
  onActiveChange?: (isActive: boolean) => void;
}

const RemittanceCard = ({
  title,
  bankName,
  accountNumber,
  type,
  dateAt,
  amount,
  isActive,
  onActiveChange,
}: RemittanceCardProps) => {
  const getDateString = () => {
    if (type === "MONTHLY") return `매월 ${parseInt(dateAt)}일`;
    else return dateAt;
  };

  const getDateDiffString = () => {
    const dateDiffNum = getDateDiff(dateAt, type);
    return dateDiffNum > 0 ? `D-${dateDiffNum}` : "오늘";
  };

  return (
    <div className="RemittanceCard">
      <button type="button" className="RemittanceCard__content">
        <div className="RemittanceCard__top">
          <div>
            <p>{title}</p>
            <span>{`${bankName} ${accountNumber}`}</span>
          </div>
          <div>{getDateDiffString()}</div>
        </div>
        <div className="RemittanceCard__bottom">
          <span>{getDateString()}</span>
          {`${getNumberWithCommas(amount)}원`}
        </div>
      </button>
      <ToggleButton isActive={isActive} onChange={onActiveChange} />
    </div>
  );
};

export default RemittanceCard;
