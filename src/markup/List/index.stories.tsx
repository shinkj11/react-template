import { Meta } from "@storybook/react";
import Icon, { close, add } from "src/assets/svg";
import FloatingButton from "src/components/FloatingButton";
import Nav from "src/components/Nav";
import RemittanceCard, {
  RemittanceCardProps,
} from "src/components/RemittanceCard";
import RemittanceEmptyCard, {
  RemittanceEmptyCardProp,
} from "src/components/RemittanceEmptyCard";
import ToggleButton from "src/components/ToggleButton";

export default {
  title: "예약송금/A.목록",
} as Meta;

export const 목록_미보유__markup = () => (
  <>
    <nav className="Navigation">
      <strong>예약송금</strong>
      <button
        type="button"
        className="Navigation__button Navigation__button--right"
        aria-label="닫기"
      >
        <Icon icon={close} />
      </button>
    </nav>
    <main className="RemittanceMain">
      <article className="RemittanceEmptyCard">
        <strong>
          자동이체와 예약이체를
          <br />
          모아서 한눈에 관리하세요
        </strong>
        <button type="button" aria-label="추가">
          <Icon icon={add} />
        </button>
      </article>
    </main>
  </>
);

export const 목록_미보유__component = () => (
  <>
    <Nav title={"예약송금"} rightButton={"close"} />
    <RemittanceEmptyCard onAddButtonClick={() => {}} />
  </>
);

export const 목록_보유__markup = () => (
  <>
    <nav className="Navigation">
      <strong></strong>
      <button
        type="button"
        className="Navigation__button Navigation__button--right"
        aria-label="닫기"
      >
        <Icon icon={close} />
      </button>
    </nav>
    <main className="RemittanceMain">
      <h1 className="RemittanceTitle">예약송금</h1>
      <div className="RemittanceCard">
        <button type="button" className="RemittanceCard__content">
          <div className="RemittanceCard__top">
            <div>
              <p>부모님 용돈</p>
              <span>KB국민 123412341234</span>
            </div>
            <div>오늘</div>
          </div>
          <div className="RemittanceCard__bottom">
            <span>매월 13일</span>
            380,000원
          </div>
        </button>
        <button className="ToggleButton" aria-label="스위치" />
      </div>
      <div className="RemittanceCard">
        <button type="button" className="RemittanceCard__content">
          <div className="RemittanceCard__top">
            <div>
              <p>부모님 용돈</p>
              <span>KB국민 123412341234</span>
            </div>
            <div>D-11</div>
          </div>
          <div className="RemittanceCard__bottom">
            <span>매월 13일</span>
            380,000원
          </div>
        </button>
      </div>
      <div className="RemittanceCard">
        <button type="button" className="RemittanceCard__content">
          <div className="RemittanceCard__top">
            <div>
              <p>부모님 용돈</p>
              <span>KB국민 123412341234</span>
            </div>
            <div>D-11</div>
          </div>
          <div className="RemittanceCard__bottom">
            <span>매월 13일</span>
            380,000원
          </div>
        </button>
      </div>
      <div className="RemittanceCard">
        <button type="button" className="RemittanceCard__content">
          <div className="RemittanceCard__top">
            <div>
              <p>부모님 용돈</p>
              <span>KB국민 123412341234</span>
            </div>
            <div>D-11</div>
          </div>
          <div className="RemittanceCard__bottom">
            <span>매월 13일</span>
            380,000원
          </div>
        </button>
      </div>
      <button type="button" className="RemittanceAddButton">
        <Icon icon={add} aria-label="추가" />
      </button>
    </main>
  </>
);

const remittanceCardPropList: RemittanceCardProps[] = [
  {
    title: "부모님 용돈",
    bankName: "KB국민",
    accountNumber: "123412341234",
    type: "MONTHLY",
    dateAt: "23",
    amount: 38000000,
    isActive: false,
  },
  {
    title: "부모님 용돈",
    bankName: "KB국민",
    accountNumber: "123412341234",
    type: "MONTHLY",
    dateAt: "13",
    amount: 38000000,
    isActive: true,
  },
  {
    title: "부모님 용돈",
    bankName: "KB국민",
    accountNumber: "123412341234",
    type: "MONTHLY",
    dateAt: "13",
    amount: 38000000,
    isActive: true,
  },
  {
    title: "부모님 용돈",
    bankName: "KB국민",
    accountNumber: "123412341234",
    type: "MONTHLY",
    dateAt: "13",
    amount: 38000000,
    isActive: true,
  },
];

export const 목록_보유__component = () => (
  <>
    <Nav rightButton="close" />
    <main className="RemittanceMain">
      <h1 className="RemittanceTitle">예약송금</h1>
      {remittanceCardPropList.map((item, index) => (
        <RemittanceCard key={index} {...item} />
      ))}
      <FloatingButton onClick={() => {}} />
    </main>
  </>
);
