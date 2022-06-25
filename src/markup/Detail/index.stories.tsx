import { Meta } from "@storybook/react";
import Icon, { arrowBack } from "src/assets/svg";
import ButtonedField from "src/components/ButtonedField";
import Input from "src/components/Input";
import Nav from "src/components/Nav";
import { getNumberWithCommas } from "src/util/Util";

export default {
  title: "예약송금/C.상세",
} as Meta;

export const 상세_기본 = () => {
  return (
    <>
      <nav className="Navigation">
        <button
          type="button"
          className="Navigation__button Navigation__button--left"
          aria-label="뒤로가기"
        >
          <Icon icon={arrowBack} />
        </button>
        <strong>예약송금 상세</strong>
        <button
          type="button"
          className="Navigation__button Navigation__button--right"
        >
          삭제
        </button>
      </nav>
      <main className="RemittanceMain">
        <article className="RemittanceDetail">
          <div className="Input">
            <input
              className="Input__element"
              defaultValue="부모님 용돈"
              readOnly
            />
          </div>

          <p className="RemittanceDetail--paragraph-space-between">
            <span>KB국민 111122223333</span>
          </p>

          {/* 1회 예약 선택 시 */}
          <p className="RemittanceDetail--paragraph-space-between">
            <span>22.08.16</span>
          </p>

          {/* 반복예약 선택 시 */}
          {/* <p className="RemittanceDetail--paragraph-space-between">
            <span>매월 30일</span>
            <span className="RemittanceDetail__info RemittanceDetail__info--empty">
              22.05.08 부터
            </span>
          </p> */}

          <p className="RemittanceDetail--paragraph-space-between">
            <span>무한반복</span>
            <span className="RemittanceDetail__info RemittanceDetail__info--empty">
              종료일 없음
            </span>
          </p>

          <div className="Input Input--large">
            <input
              className="Input__element"
              defaultValue="1,000,000"
              readOnly
            />
          </div>
        </article>
      </main>
    </>
  );
};

export const 상세_기본__component = () => {
  return (
    <>
      <Nav title="예약송금 상세" leftButton="back" rightButton="delete" />
      <main className="RemittanceMain">
        <article className="RemittanceDetail">
          <Input value="부모님 용돈" showRemoveButton={false} readOnly />
          <Input
            value="KB국민 111122223333"
            showRemoveButton={false}
            readOnly
          />

          {/* 1회 예약 선택 시 */}
          <Input value="22.08.16" showRemoveButton={false} readOnly />

          {/* 반복예약 선택 시 */}
          {/* <ButtonedField
            value="매월 30일"
            buttonText="22.05.08 부터"
            buttonActive={false}
          /> */}

          <ButtonedField
            value="무한반복"
            buttonText="종료일 없음"
            buttonActive={false}
          />

          <Input
            variant="large"
            value={getNumberWithCommas("1000000")}
            showRemoveButton={false}
            readOnly
          />
        </article>
      </main>
    </>
  );
};
