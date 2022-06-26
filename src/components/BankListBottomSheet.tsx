import { Bank } from "src/type";

export interface BankListBottomSheetProps {
  bankList: { [key: number]: string };
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
          {Object.keys(bankList).map((bankId, index) => (
            <li key={index}>
              <button
                type="button"
                onClick={() => {
                  onBankSelect && onBankSelect(parseInt(bankId));
                }}
              >
                <i />
                <span>{bankList[parseInt(bankId)]}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BankListBottomSheet;
