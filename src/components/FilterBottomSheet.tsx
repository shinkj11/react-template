import { ReservationDateType, ReservationType } from "src/type";
import { useState, useCallback, useRef } from "react";
import dayjs from "dayjs";
import MonthlyDatePicker, { ListHandle } from "./MonthlyDatePicker";
import OnceDatePicker from "./OnceDatePicker";

export interface FilterBottomSheetProps {
  onDateSelect: (reservationDate: ReservationDateType) => void;
  show?: boolean;
  reservationType?: ReservationType;
  monthlyDateAt?: string;
  onceDateAt?: string;
}

interface IndexListType {
  left: number;
  center: number;
  right: number;
}

const FILTER_ITEM_MARGIN = 40;
const FILTER_ITEM_HEIGHT = 36;

const FilterBottomSheet = ({
  onDateSelect,
  show = false,
  reservationType = "MONTHLY",
  monthlyDateAt,
  onceDateAt,
}: FilterBottomSheetProps) => {
  const datePickerRef = useRef<ListHandle>(null);

  const [activeTabIndex, setActiveTabIndex] = useState<number>(
    reservationType === "MONTHLY" ? 0 : 1
  );
  const [indexList, setIndexList] = useState<IndexListType>({
    left: 0,
    center: 0,
    right: 0,
  });

  // 좌측 필터 스크롤 함수
  const onScrollLeftFilter = useCallback(() => {
    const top = datePickerRef.current?.leftTop();

    if (top) {
      const index =
        Math.round((top - FILTER_ITEM_HEIGHT) / FILTER_ITEM_MARGIN) + 1;
      setIndexList((org) => ({ ...org, left: index }));
    }
  }, []);

  // 우측 필터 스크롤 함수
  const onScrollRightFilter = useCallback(() => {
    const top = datePickerRef.current?.rightTop();

    if (top) {
      const index =
        Math.round((top - FILTER_ITEM_HEIGHT) / FILTER_ITEM_MARGIN) + 1;
      console.log("우측 필터 인덱스", index);
      setIndexList((org) => ({ ...org, right: index }));
    }
  }, []);

  // 가운데 필터 스크롤 함수
  const onScrollCenterFilter = useCallback(() => {
    const top =
      datePickerRef.current?.centerTop && datePickerRef.current?.centerTop();

    if (top) {
      const index =
        Math.round((top - FILTER_ITEM_HEIGHT) / FILTER_ITEM_MARGIN) + 1;
      setIndexList((org) => ({ ...org, center: index }));
    }
  }, []);

  const onConfirmButtonClick = useCallback(() => {
    const { left, center, right } = indexList;
    const type = activeTabIndex == 0 ? "MONTHLY" : "ONCE";
    let dateAt: string;
    if (activeTabIndex == 0) dateAt = String(right + 1).padStart(2, "0");
    else {
      const year = dayjs().year() + left;
      const month = left === 0 ? dayjs().month() + center : center;
      const date =
        left === 0 && center === 0 ? dayjs().date() + right : right + 1;
      dateAt = dayjs()
        .set("year", year)
        .set("month", month)
        .set("date", date)
        .format("YYYY.MM.DD");
    }
    onDateSelect({
      type,
      dateAt,
    });
  }, [activeTabIndex, indexList]);

  return (
    <div className={`BottomSheet BottomSheet${show ? "--show" : ""}`}>
      <div className="BottomSheet__dim" />
      <div className="BottomSheet__contents">
        <div className="FilterBottomSheet__tab">
          <button
            type="button"
            className={`${activeTabIndex === 0 && "active"}`}
            onClick={() => setActiveTabIndex(0)}
          >
            반복예약
          </button>
          <button
            type="button"
            className={`${activeTabIndex === 1 && "active"}`}
            onClick={() => setActiveTabIndex(1)}
          >
            1회예약
          </button>
        </div>

        <div className="FilterBottomSheet__body">
          {activeTabIndex === 0 && (
            <MonthlyDatePicker
              ref={datePickerRef}
              onScrollLeftFilter={onScrollLeftFilter}
              onScrollRightFilter={onScrollRightFilter}
              defalutValue={monthlyDateAt}
            />
          )}
          {activeTabIndex === 1 && (
            <OnceDatePicker
              ref={datePickerRef}
              onScrollLeftFilter={onScrollLeftFilter}
              onScrollRightFilter={onScrollRightFilter}
              onScrollCenterFilter={onScrollCenterFilter}
              defalutValue={onceDateAt}
              selectedYearIndex={indexList.left}
              selectedMonthIndex={indexList.center}
            />
          )}
        </div>
        <div className="FilterBottomSheet__footer">
          <button type="button" onClick={onConfirmButtonClick}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBottomSheet;
