import { forwardRef, useImperativeHandle, useRef } from "react";

export interface MonthlyDatePickerProps {
  onScrollLeftFilter: () => void;
  onScrollRightFilter: () => void;
  defalutValue?: string;
}

export interface ListHandle {
  leftTop: () => number | undefined;
  rightTop: () => number | undefined;
  centerTop?: () => number | undefined;
}

const MonthlyDatePicker = forwardRef<ListHandle, MonthlyDatePickerProps>(
  ({ onScrollLeftFilter, onScrollRightFilter, defalutValue }, ref) => {
    const leftFilterRef = useRef<HTMLUListElement>(null);
    const rightFilterRef = useRef<HTMLUListElement>(null);
    useImperativeHandle(ref, () => ({
      leftTop: () => leftFilterRef.current?.scrollTop,
      rightTop: () => rightFilterRef.current?.scrollTop,
    }));
    return (
      <div className="filter-picker">
        <ul ref={leftFilterRef} onScroll={onScrollLeftFilter}>
          <li className="active">매월</li>
        </ul>
        <ul ref={rightFilterRef} onScroll={onScrollRightFilter}>
          {Array.from({ length: 28 }).map((_, i) => {
            return (
              <li
                key={i}
                className={
                  defalutValue && i + 1 === parseInt(defalutValue)
                    ? "active"
                    : ""
                }
              >
                {i + 1}일
              </li>
            );
          })}
        </ul>
        <div className="filter-active">
          <span />
          <span />
        </div>
      </div>
    );
  }
);

export default MonthlyDatePicker;
