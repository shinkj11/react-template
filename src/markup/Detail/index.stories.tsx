import { Meta } from "@storybook/react";
import Icon, { arrowBack } from "src/assets/svg";

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
          {/* <p className="RemittanceDetail--paragraph-space-between">
            <span>22.08.16</span>
          </p> */}

          {/* 반복예약 선택 시 */}
          <p className="RemittanceDetail--paragraph-space-between">
            <span>매월 30일</span>
            <span className="RemittanceDetail__info RemittanceDetail__info--empty">
              22.05.08 부터
            </span>
          </p>

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
