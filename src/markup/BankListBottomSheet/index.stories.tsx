import { Meta } from "@storybook/react";

export default {
  title: "예약송금/컴포넌트/BottomSheet",
} as Meta;

export const 은행선택 = () => {
  return (
    <div className="BottomSheet BottomSheet--show">
      <div className="BottomSheet__dim" />
      <div className="BottomSheet__contents">
        <ul className="BankList">
          {MOCK.map(({ bankName }, index) => (
            <li key={index}>
              <button type="button">
                <i />
                <span>{bankName}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const MOCK = [
  { bankName: "카카오뱅크" },
  { bankName: "농협" },
  { bankName: "신한" },
  { bankName: "IBK기업" },
  { bankName: "하나" },
  { bankName: "우리" },
  { bankName: "국민" },
  { bankName: "SC제일" },
];
