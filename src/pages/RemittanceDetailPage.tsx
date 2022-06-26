import dayjs from "dayjs";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import ButtonedField from "src/components/ButtonedField";
import Input from "src/components/Input";
import Nav from "src/components/Nav";
import {
  bankNameQuery,
  pageSelector,
  reservationDetailQuery,
  selectedReservationState,
} from "src/recoil/Store";
import bankService from "src/services/rest-api/bank.service";
import { Reservation } from "src/type";
import { getNumberWithCommas } from "src/util/Util";

const RemittanceDetailPage = () => {
  const banks = useRecoilValue(bankNameQuery);
  const reservationDetail =
    useRecoilValue(reservationDetailQuery) ??
    ({
      title: "",
      bankId: 0,
      accountNumber: "",
      type: "MONTHLY",
      dateAt: "30",
    } as Reservation);
  const {
    title,
    bankId,
    accountNumber,
    type,
    dateAt,
    startAt,
    finishAt,
    amount,
  } = reservationDetail;
  const setPage = useSetRecoilState(pageSelector);
  const [reservationId, setReservationId] = useRecoilState(
    selectedReservationState
  );

  const onDeleteButtonClick = () => {
    if (window.confirm("삭제하시겠습니까?")) {
      bankService.removeReservationDetail(reservationId).then((value) => {
        setReservationId(0);
        setPage("list");
      });
    }
  };

  return (
    <>
      <Nav
        title="예약송금 상세"
        leftButton="back"
        onLeftButtonClick={() => {
          setPage("list");
        }}
        rightButton="delete"
        onRightButtonClick={onDeleteButtonClick}
      />
      <main className="RemittanceMain">
        <article className="RemittanceDetail">
          <Input value={title} showRemoveButton={false} readOnly />
          <Input
            value={`${banks[bankId]} ${accountNumber}`}
            showRemoveButton={false}
            readOnly
          />
          <ButtonedField
            value={type === "MONTHLY" ? `매월 ${dateAt}일` : dateAt}
            buttonText={
              type === "MONTHLY"
                ? `${dayjs(startAt).format("YYYY.MM.DD")} 부터`
                : ""
            }
            buttonActive={false}
          />
          {type === "MONTHLY" && (
            <ButtonedField
              value={finishAt ? finishAt : "무한반복"}
              buttonText={finishAt ? "" : "종료일 없음"}
              buttonActive={false}
            />
          )}
          <Input
            variant="large"
            value={getNumberWithCommas(amount)}
            showRemoveButton={false}
            readOnly
          />
        </article>
      </main>
    </>
  );
};

export default RemittanceDetailPage;
