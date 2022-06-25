import { Bank } from "src/type";

export interface BankListBottomSheetProps {
  bankList: Bank[];
  show?: boolean;
  onBankSelect?: (bankId: number) => void;
}

const BankListBottomSheet = ({
  bankList,
  show = false,
  onBankSelect,
}: BankListBottomSheetProps) => {
  return (
    <div className={`BottomSheet BottomSheet${show ? "--show" : ""}`}>
      <div className="BottomSheet__dim" />
      <div className="BottomSheet__contents">
        <ul className="BankList">
          {bankList.map(({ name, id }, index) => (
            <li key={index}>
              <button
                type="button"
                onClick={() => {
                  onBankSelect && onBankSelect(id);
                }}
              >
                <i />
                <span>{name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BankListBottomSheet;
