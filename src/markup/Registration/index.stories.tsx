import { Meta } from "@storybook/react";
import Icon, { arrowBack, close } from "src/assets/svg";

export default {
  title: "예약송금/B.등록",
} as Meta;

export const 등록_기본 = () => {
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
        <strong>예약송금 등록</strong>
      </nav>
      <main className="RemittanceMain">
        <article className="RemittanceDetail">
          <div className={"Input"}>
            <input
              className="Input__element"
              placeholder="제목 예) 용돈, 학원비 등"
              defaultValue=""
            />
          </div>

          {/* 받는 사람이 선택되지 않는 상태 */}
          <p className="RemittanceDetail--paragraph-space-between empty">
            <span>받는분</span>
          </p>

          {/* 받는 사람이 선택된 상태 */}
          {/* <p className="RemittanceDetail--paragraph-space-between">
            <span>KB국민</span>
            <button type="button" className="Input__button-delete">
              <Icon icon={close} size={18} />
            </button>
          </p>

          <div className="Input">
            <input
              className="Input__element"
              placeholder="계좌번호"
              defaultValue=""
            />
            <div>
              <button type="button" className="Input__button-delete">
                <Icon icon={close} size={18} />
              </button>
            </div>
          </div> */}

          {/* 1회 예약 시 */}
          {/* <p className="RemittanceDetail--paragraph-space-between">
            <span>22.08.16</span>
            <button type="button" className="Input__button-delete">
              <Icon icon={close} size={18} />
            </button>
          </p> */}

          {/* 반복예약 선택 시 */}
          <p className="RemittanceDetail--paragraph-space-between">
            <span>매월 30일</span>
            <button
              type="button"
              className="RemittanceDetail__button RemittanceDetail__button--empty"
            >
              22.05.08 부터
            </button>
          </p>

          <p className="RemittanceDetail--paragraph-space-between">
            <span>무한반복</span>
            <button
              type="button"
              className="RemittanceDetail__button RemittanceDetail__button--empty"
            >
              종료일 없음
            </button>
          </p>

          {/* <p className="RemittanceDetail--paragraph-space-between">
            <span>22.08.16</span>
            <button type="button" className="Input__button-delete">
              <Icon icon={close} size={18} />
            </button>
          </p> */}

          <div className={"Input Input--large"}>
            <input
              className="Input__element"
              placeholder="송금액(원)"
              defaultValue=""
            />
          </div>
          <button type="button" className="RemittanceDetail__button-edit">
            등록하기
          </button>
        </article>
      </main>
    </>
  );
};

export const 등록_은행_선택 = () => {
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
        <strong>예약송금 등록</strong>
      </nav>
      <main className="RemittanceMain">
        <article className="RemittanceDetail">
          <div className="Input">
            <input
              className="Input__element"
              placeholder="제목 예) 용돈, 학원비 등"
              defaultValue=""
            />
          </div>

          {/* 받는 사람이 선택된 상태 */}
          <p className="RemittanceDetail--paragraph-space-between">
            <span>KB국민</span>
            <button type="button" className="Input__button-delete">
              <Icon icon={close} size={18} />
            </button>
          </p>

          <div className="Input">
            <input
              className="Input__element"
              placeholder="계좌번호"
              defaultValue=""
            />
          </div>

          {/* 1회 예약 시 */}
          {/* <p className="RemittanceDetail--paragraph-space-between">
            <span>22.08.16</span>
            <button type="button" className="Input__button-delete">
              <Icon icon={close} size={18} />
            </button>
          </p> */}

          {/* 반복예약 선택 시 */}
          <p className="RemittanceDetail--paragraph-space-between">
            <span>매월 30일</span>
            <button
              type="button"
              className="RemittanceDetail__button RemittanceDetail__button--empty"
            >
              22.05.08 부터
            </button>
          </p>

          <p className="RemittanceDetail--paragraph-space-between">
            <span>무한반복</span>
            <button
              type="button"
              className="RemittanceDetail__button RemittanceDetail__button--empty"
            >
              종료일 없음
            </button>
          </p>

          {/* <p className="RemittanceDetail--paragraph-space-between">
            <span>22.08.16</span>
            <button type="button" className="Input__button-delete">
              <Icon icon={close} size={18} />
            </button>
          </p> */}

          <div className="Input Input--large">
            <input
              className="Input__element"
              placeholder="송금액(원)"
              defaultValue=""
            />
          </div>

          <button type="button" className="RemittanceDetail__button-edit">
            등록하기
          </button>
        </article>
      </main>
    </>
  );
};

export const 등록_종료일_선택 = () => {
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
        <strong>예약송금 등록</strong>
      </nav>
      <main className="RemittanceMain">
        <article className="RemittanceDetail">
          <div className="Input">
            <input
              className="Input__element"
              placeholder="제목 예) 용돈, 학원비 등"
              defaultValue=""
            />
          </div>

          {/* 받는 사람이 선택된 상태 */}
          <p className="RemittanceDetail--paragraph-space-between">
            <span>KB국민</span>
            <button type="button" className="Input__button-delete">
              <Icon icon={close} size={18} />
            </button>
          </p>

          <div className="Input">
            <input
              className="Input__element"
              placeholder="계좌번호"
              defaultValue=""
            />
          </div>

          {/* 1회 예약 시 */}
          {/* <p className="RemittanceDetail--paragraph-space-between">
            <span>22.08.16</span>
            <button type="button" className="Input__button-delete">
              <Icon icon={close} size={18} />
            </button>
          </p> */}

          {/* 반복예약 선택 시 */}
          <p className="RemittanceDetail--paragraph-space-between">
            <span>매월 30일</span>
            <button
              type="button"
              className="RemittanceDetail__button RemittanceDetail__button--empty"
            >
              22.05.08 부터
            </button>
          </p>

          <p className="RemittanceDetail--paragraph-space-between">
            <span>22.08.16</span>
            <button type="button" className="Input__button-delete">
              <Icon icon={close} size={18} />
            </button>
          </p>

          <div className="Input Input--large">
            <input
              className="Input__element"
              placeholder="송금액(원)"
              defaultValue=""
            />
          </div>

          <button type="button" className="RemittanceDetail__button-edit">
            등록하기
          </button>
        </article>
      </main>
    </>
  );
};
