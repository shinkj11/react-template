import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import FloatingButton from "src/components/FloatingButton";
import Nav from "src/components/Nav";
import RemittanceCard from "src/components/RemittanceCard";
import RemittanceEmptyCard from "src/components/RemittanceEmptyCard";
import {
  bankNameQuery,
  pageState,
  reservationListQuery,
  selectedReservationState,
} from "src/recoil/Store";
import bankService from "src/services/rest-api/bank.service";
import { Reservation } from "src/type";

const RemittanceListPage = () => {
  const banks = useRecoilValue(bankNameQuery);
  const setPage = useSetRecoilState(pageState);
  const setSelectedId = useSetRecoilState(selectedReservationState);
  const [reservationList, setReservationList] =
    useRecoilState(reservationListQuery);

  const [isTitleHidden, setIsTitleHidden] = useState<boolean>(false);
  const mainRef = useRef<HTMLHeadingElement>(null);

  const callModifyReservationDetail = async (reservation: Reservation) => {
    const result = await bankService.modifyReservationDetail(reservation);
    return result;
  };

  const onActiveChange = useCallback((id: number, isActive: boolean) => {
    const changedIndex = reservationList.findIndex((item) => item.id === id);
    callModifyReservationDetail({
      ...reservationList[changedIndex]!,
      isActive: isActive,
    }).then((result) => {
      setReservationList((org) =>
        org.map((item, idx) => {
          if (idx === changedIndex) return result;
          else return item;
        })
      );
    });
  }, []);

  const onItemClick = (reservationId: number) => {
    setSelectedId(reservationId);
    setPage("detail");
  };

  const handleScroll = () => {
    if (mainRef.current) {
      const { top, height } = mainRef.current.getBoundingClientRect();
      top + height < 44 ? setIsTitleHidden(true) : setIsTitleHidden(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {reservationList.length > 0 ? (
        <div>
          <Nav title={isTitleHidden ? "예약송금" : ""} rightButton="close" />
          <main className="RemittanceMain">
            <h1 ref={mainRef} className="RemittanceTitle">
              예약송금
            </h1>
            {reservationList.map((item, index) => {
              return (
                <RemittanceCard
                  key={index}
                  {...item}
                  id={item.id!}
                  bankName={banks[item.bankId]}
                  onActiveChange={onActiveChange}
                  onClick={() => onItemClick(item.id!)}
                />
              );
            })}
            <FloatingButton
              onClick={() => {
                setPage("registration");
              }}
            />
          </main>
        </div>
      ) : (
        <>
          <Nav title={"예약송금"} rightButton={"close"} />
          <RemittanceEmptyCard
            onAddButtonClick={() => {
              setPage("registration");
            }}
          />
        </>
      )}
    </>
  );
};

export default RemittanceListPage;
