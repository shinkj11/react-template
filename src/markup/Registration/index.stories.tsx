import { useEffect, useState } from "@storybook/addons";
import { Meta } from "@storybook/react";
import dayjs from "dayjs";
import { ChangeEvent, useRef } from "react";
import Icon, { arrowBack, close } from "src/assets/svg";
import BankListBottomSheet from "src/components/BankListBottomSheet";
import ButtonedField from "src/components/ButtonedField";
import FilterBottomSheet from "src/components/FilterBottomSheet";
import Input from "src/components/Input";
import Nav from "src/components/Nav";
import { InputHandle, ReservationDateType } from "src/type";
import { getMonthlyDate, getNumberWithCommas } from "src/util/Util";

export default {
  title: "예약송금/B.등록",
} as Meta;

export const 등록_기본__markup = () => {
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

export const 등록_기본__component = () => {
  const [amountString, setAmountString] = useState<string>("");
  const [showBankSheet, setShowBankSheet] = useState<boolean>(false);
  const [showDateSheet, setShowDateSheet] = useState<boolean>(false);
  const [bankId, setBankId] = useState<number>(0);
  const [reservationDate, setReservationDate] = useState<ReservationDateType>({
    type: "MONTHLY",
    dateAt: "30",
  });
  const [startAt, setStartAt] = useState<string>(
    getMonthlyDate("30").format("YYYY.MM.DD")
  );
  const [finishAt, setFinishAt] = useState<string>("");
  const [showFinishAt, setShowFinishAt] = useState<boolean>(false);
  const titleRef = useRef<InputHandle>(null);
  const accountNumberRef = useRef<InputHandle>(null);

  const banks: { [key: number]: string } = {
    1: "카카오뱅크",
    2: "신한은행",
  };

  const onBankSelected = (bankId: number) => {
    setShowBankSheet(false);
    setBankId(bankId);
  };
  const onDateSelected = (reservationDate: ReservationDateType) => {
    setShowDateSheet(false);
    setReservationDate(reservationDate);
    if (reservationDate.type === "MONTHLY")
      setStartAt(getMonthlyDate(reservationDate.dateAt).format("YYYY.MM.DD"));
  };
  const onFinishAtChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFinishAt(e.target.value);
    if (!e.target.value) setShowFinishAt(false);
  };
  const onFinishAtCloseClick = () => {
    setFinishAt("");
    setShowFinishAt(false);
  };
  const getMinDate = () => {
    return dayjs(startAt).subtract(-1, "day").format("YYYY-MM-DD");
  };
  return (
    <>
      <Nav
        title="예약송금 등록"
        leftButton="back"
        onLeftButtonClick={() => {}}
      />
      <main className="RemittanceMain">
        <article className="RemittanceDetail">
          <Input
            ref={titleRef}
            placeholder="제목 예) 용돈, 학원비 등"
            defaultValue=""
          />
          <Input
            readOnly
            placeHolder="받는분"
            value={banks[bankId]}
            onClick={() => setShowBankSheet(true)}
            onCloseClick={() => setBankId(0)}
          />

          <BankListBottomSheet
            bankList={banks}
            show={showBankSheet}
            onBankSelect={onBankSelected}
          />
          {bankId !== 0 && (
            <Input
              ref={accountNumberRef}
              placeHolder="계좌번호"
              defaultValue={""}
            />
          )}
          <ButtonedField
            value={
              reservationDate.type === "MONTHLY"
                ? `매월 ${reservationDate.dateAt}일`
                : reservationDate.dateAt
            }
            buttonText={
              reservationDate.type === "MONTHLY" ? `${startAt} 부터` : ""
            }
            onButtonClick={() => setShowDateSheet(true)}
          />
          <FilterBottomSheet
            show={showDateSheet}
            onDateSelect={onDateSelected}
          />
          {reservationDate.type === "MONTHLY" &&
            (showFinishAt ? (
              <Input
                type="date"
                min={getMinDate()}
                value={finishAt}
                onChange={onFinishAtChange}
                onCloseClick={onFinishAtCloseClick}
              />
            ) : (
              <ButtonedField
                value="무한반복"
                buttonText="종료일 없음"
                onButtonClick={() => setShowFinishAt(true)}
              />
            ))}
          <Input
            value={amountString}
            variant="large"
            placeHolder="송금액(원)"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (e.target.value) {
                const withoutCommaNum = Number(
                  e.target.value.replaceAll(",", "")
                );
                if (!isNaN(withoutCommaNum))
                  setAmountString(withoutCommaNum.toLocaleString());
              } else {
                setAmountString("");
              }
            }}
            onCloseClick={() => setAmountString("")}
          />
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
