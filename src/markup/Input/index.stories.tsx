import { Meta } from "@storybook/react";
import { useState } from "react";
import Icon, { close, noticeError } from "src/assets/svg";
import Input, { InputProps } from "src/components/Input";

export default {
  title: "예약송금/컴포넌트/Input",
} as Meta;

export const RegularInput = (props: InputProps) => {
  return (
    <main className="RemittanceMain">
      <article className="RemittanceDetail">
        <Input readOnly defaultValue="홍길동" />
      </article>
    </main>
  );
};

export const RegularInputFocus__markup = () => {
  const [displayedValue, setDisplayedValue] = useState("홍길동");
  return (
    <>
      <main className="RemittanceMain">
        <article className="RemittanceDetail">
          <div className={"Input Input--add-bottom-border"}>
            <input className="Input__element" defaultValue={displayedValue} />
          </div>
        </article>
      </main>
    </>
  );
};

export const RegularInputError = () => {
  const [displayedValue, setDisplayedValue] = useState("홍길동");
  return (
    <>
      <main className="RemittanceMain">
        <article className="RemittanceDetail">
          <div className={"Input Input--error-bottom-border"}>
            <input className="Input__element" defaultValue={displayedValue} />
            <div>
              <span className="Input__error-message">{"입력오류"}</span>
              <button type="button" className="Input__button-delete">
                <Icon icon={close} size={18} />
              </button>
            </div>
          </div>
        </article>
      </main>
    </>
  );
};

export const LargeInputFocus = () => {
  const [displayedValue, setDisplayedValue] = useState("2,000,000");
  return (
    <>
      <main className="RemittanceMain">
        <article className="RemittanceDetail">
          <div className={"Input Input--add-bottom-border Input--large"}>
            <input className="Input__element" defaultValue={displayedValue} />
          </div>
        </article>
      </main>
    </>
  );
};

export const LargeInputError = () => {
  const [displayedValue, setDisplayedValue] = useState("2,000,000");
  return (
    <>
      <main className="RemittanceMain">
        <article className="RemittanceDetail">
          <div
            className={
              "Input Input--add-bottom-border Input--large Input--error-bottom-border"
            }
          >
            <input className="Input__element" defaultValue={displayedValue} />
          </div>
          <div className="Input__error-underline-message">
            <Icon icon={noticeError} size={18} />
            {"송금한도가 초과 되었습니다"}
          </div>
        </article>
      </main>
    </>
  );
};
