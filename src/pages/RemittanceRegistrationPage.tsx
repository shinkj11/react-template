import dayjs from "dayjs";
import React, { ChangeEvent, useCallback, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import BankListBottomSheet from "src/components/BankListBottomSheet";
import ButtonedField from "src/components/ButtonedField";
import FilterBottomSheet from "src/components/FilterBottomSheet";
import Input from "src/components/Input";
import Nav from "src/components/Nav";
import { bankNameQuery, pageSelector } from "src/recoil/Store";
import bankService from "src/services/rest-api/bank.service";
import { Reservation, ReservationDateType } from "src/type";
import { getMonthlyDate } from "src/util/Util";

const RemittanceRegistrationPage = () => {
  const banks = useRecoilValue(bankNameQuery);
  const setPage = useSetRecoilState(pageSelector);

  const [title, setTitle] = useState<string>("");
  const [accountNumber, setAccountNumber] = useState<string>("");
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
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onBankSelected = useCallback((bankId: number) => {
    setShowBankSheet(false);
    setBankId(bankId);
  }, []);

  const onDateSelected = useCallback((reservationDate: ReservationDateType) => {
    setShowDateSheet(false);
    setReservationDate(reservationDate);
    if (reservationDate.type === "MONTHLY")
      setStartAt(getMonthlyDate(reservationDate.dateAt).format("YYYY.MM.DD"));
  }, []);

  const onFinishAtChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFinishAt(e.target.value);
    if (!e.target.value) setShowFinishAt(false);
  }, []);

  const onFinishAtCloseClick = () => {
    setFinishAt("");
    setShowFinishAt(false);
  };

  const isButtonDisabled = () => {
    return (
      !title ||
      !bankId ||
      !accountNumber ||
      !reservationDate.type ||
      !reservationDate.dateAt ||
      !amountString ||
      isSubmitting
    );
  };

  const callAddReservation = async (reservation: Reservation) => {
    setIsSubmitting(true);
    return await bankService.addReservationDetail(reservation);
  };

  const onSubmitClick = () => {
    if (!isSubmitting) {
      const reservation: Reservation = {
        title,
        bankId,
        accountNumber,
        type: reservationDate.type,
        dateAt: reservationDate.dateAt.replaceAll(".", ""),
        startAt: startAt.replaceAll(".", ""),
        finishAt: finishAt.replaceAll(".", ""),
        amount: Number(amountString.replaceAll(",", "")),
        isActive: true,
      };
      callAddReservation(reservation)
        .then(() => setPage("list"))
        .catch((error) => alert("서버에러가 발생했습니다."));
    }
  };

  const getMinDate = () => {
    return dayjs(startAt).subtract(-1, "day").format("YYYY-MM-DD");
  };

  return (
    <>
      <Nav
        title="예약송금 등록"
        leftButton="back"
        onLeftButtonClick={() => {
          setPage("list");
        }}
      />
      <main className="RemittanceMain">
        <article className="RemittanceDetail">
          <Input
            value={title}
            placeholder="제목 예) 용돈, 학원비 등"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
          />
          <Input
            readOnly
            placeHolder="받는분"
            value={bankId ? banks[bankId] : ""}
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
              value={accountNumber}
              placeHolder="계좌번호"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setAccountNumber(e.target.value)
              }
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
          <button
            type="button"
            className="RemittanceDetail__button-edit"
            disabled={isButtonDisabled()}
            onClick={onSubmitClick}
          >
            등록하기
          </button>
        </article>
      </main>
    </>
  );
};

export default RemittanceRegistrationPage;
