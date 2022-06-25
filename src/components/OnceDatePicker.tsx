import dayjs from "dayjs";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { ListHandle } from "./MonthlyDatePicker";

export interface OnceDatePickerProps {
  onScrollLeftFilter: () => void;
  onScrollCenterFilter: () => void;
  onScrollRightFilter: () => void;
  selectedYearIndex: number;
  selectedMonthIndex: number;
  defalutValue?: string;
}

const OnceDatePicker = forwardRef<ListHandle, OnceDatePickerProps>(
  (
    {
      onScrollLeftFilter,
      onScrollCenterFilter,
      onScrollRightFilter,
      defalutValue,
      selectedYearIndex,
      selectedMonthIndex,
    },
    ref
  ) => {
    const leftFilterRef = useRef<HTMLUListElement>(null);
    const centerFilterRef = useRef<HTMLUListElement>(null);
    const rightFilterRef = useRef<HTMLUListElement>(null);
    const currentYear = dayjs().year();
    const currentMonth = dayjs().month();
    const currentDate = dayjs().date();
    useImperativeHandle(ref, () => ({
      leftTop: () => leftFilterRef.current?.scrollTop,
      centerTop: () => centerFilterRef.current?.scrollTop,
      rightTop: () => rightFilterRef.current?.scrollTop,
    }));
    const getMonthList = (): number[] => {
      const monthList = Array.from(Array(12).keys());
      return selectedYearIndex === 0
        ? monthList.filter((value) => value >= currentMonth)
        : monthList;
    };
    const getDateList = (): number[] => {
      const selectedMonth =
        selectedYearIndex === 0
          ? currentMonth + selectedMonthIndex + 1
          : selectedMonthIndex + 1;
      const datePerMonth = [1, 3, 5, 7, 8, 10, 12].includes(selectedMonth)
        ? 31
        : 30;
      const dateList = Array.from(Array(datePerMonth).keys());
      return selectedYearIndex === 0 && selectedMonthIndex === 0
        ? dateList.filter((value) => value >= currentDate - 1)
        : dateList;
    };
    return (
      <div className="filter-picker add-row">
        <ul ref={leftFilterRef} onScroll={onScrollLeftFilter}>
          {Array.from({ length: 4 }).map((_, i) => {
            return (
              <li
                key={i}
                className={
                  defalutValue && i === dayjs(defalutValue).year() - currentYear
                    ? "active"
                    : ""
                }
              >
                {currentYear + i}일
              </li>
            );
          })}
        </ul>
        <ul ref={centerFilterRef} onScroll={onScrollCenterFilter}>
          {getMonthList().map((monthIndex, i) => {
            return (
              <li
                key={i}
                className={
                  defalutValue && monthIndex === dayjs(defalutValue).month()
                    ? "active"
                    : ""
                }
              >
                {monthIndex + 1}월
              </li>
            );
          })}
        </ul>
        <ul ref={rightFilterRef} onScroll={onScrollRightFilter}>
          {getDateList().map((dateIndex, i) => {
            return (
              <li
                key={i}
                className={
                  defalutValue && dateIndex + 1 === dayjs(defalutValue).date()
                    ? "active"
                    : ""
                }
              >
                {dateIndex + 1}일
              </li>
            );
          })}
        </ul>
        <div className="filter-active">
          <span />
          <span />
          <span />
        </div>
      </div>
    );
  }
);

export default OnceDatePicker;
