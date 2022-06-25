import { Meta } from "@storybook/react";
import BankListBottomSheet from "src/components/BankListBottomSheet";

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

export const 은행선택_component = () => {
  return <BankListBottomSheet bankList={banks} show />;
};

const banks = [
  {
    id: 1,
    name: "카카오뱅크",
  },
  {
    id: 2,
    name: "농협",
  },
  {
    id: 3,
    name: "신한",
  },
  {
    id: 4,
    name: "IBK기업",
  },
  {
    id: 5,
    name: "하나",
  },
  {
    id: 6,
    name: "우리",
  },
  {
    id: 7,
    name: "국민",
  },
  {
    id: 8,
    name: "SC제일",
  },
  {
    id: 9,
    name: "대구",
  },
  {
    id: 10,
    name: "부산",
  },
  {
    id: 11,
    name: "광주",
  },
  {
    id: 12,
    name: "새마을금고",
  },
  {
    id: 13,
    name: "신협",
  },
  {
    id: 14,
    name: "수협",
  },
  {
    id: 15,
    name: "우체국",
  },
  {
    id: 16,
    name: "씨티",
  },
  {
    id: 17,
    name: "케이뱅크",
  },
  {
    id: 18,
    name: "제주",
  },
  {
    id: 19,
    name: "산업",
  },
  {
    id: 20,
    name: "경남",
  },
];

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
