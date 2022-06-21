import { useState, useCallback, useRef } from "react";
import { Meta } from "@storybook/react";

export default {
  title: "예약송금/컴포넌트/BottomSheet",
} as Meta;

const FILTER_ITEM_MARGIN = 40;
const FILTER_ITEM_HEIGHT = 36;

export const 예약일자 = () => {
  const leftFilterRef = useRef<HTMLUListElement>(null);
  const rightFilterRef = useRef<HTMLUListElement>(null);
  const centerFilterRef = useRef<HTMLUListElement>(null);

  const [activeTabIndex, setActiveTabIndex] = useState(0);

  // 좌측 필터 스크롤 함수
  const onScrollLeftFilter = useCallback(() => {
    const top = leftFilterRef.current?.scrollTop;

    if (top) {
      const index =
        Math.round((top - FILTER_ITEM_HEIGHT) / FILTER_ITEM_MARGIN) + 1;
      console.log(`좌측 필터 인덱스 : ${index}`);
    }
  }, []);

  // 우측 필터 스크롤 함수
  const onScrollRightFilter = useCallback(() => {
    const top = rightFilterRef.current?.scrollTop;

    if (top) {
      const index =
        Math.round((top - FILTER_ITEM_HEIGHT) / FILTER_ITEM_MARGIN) + 1;
      console.log(`우측 필터 인덱스 : ${index}`);
    }
  }, []);

  // 가운데 필터 스크롤 함수
  const onScrollCenterFilter = useCallback(() => {
    const top = centerFilterRef.current?.scrollTop;

    if (top) {
      const index =
        Math.round((top - FILTER_ITEM_HEIGHT) / FILTER_ITEM_MARGIN) + 1;
      console.log(`가운데 필터 인덱스 : ${index}`);
    }
  }, []);

  return (
    // FilterBottomSheet--show 클래스로 visible 처리 가능합니다.
    <div className="BottomSheet BottomSheet--show">
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
            <div className="filter-picker">
              <ul ref={leftFilterRef} onScroll={onScrollLeftFilter}>
                <li className="active">매월</li>
              </ul>
              <ul ref={rightFilterRef} onScroll={onScrollRightFilter}>
                {Array.from({ length: 30 }).map((_, i) => {
                  return (
                    <li key={i} className={i === 0 ? "active" : ""}>
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
          )}
          {activeTabIndex === 1 && (
            <div className="filter-picker add-row">
              <ul ref={leftFilterRef} onScroll={onScrollLeftFilter}>
                <li className="active">2022년</li>
                <li>2023년</li>
                <li>2024년</li>
                <li>2025년</li>
              </ul>
              <ul ref={centerFilterRef} onScroll={onScrollCenterFilter}>
                <li>1월</li>
                <li>2월</li>
                <li>3월</li>
                <li>4월</li>
                <li className="active">5월</li>
                <li>6월</li>
                <li>7월</li>
                <li>8월</li>
                <li>9월</li>
                <li>9월</li>
                <li>10월</li>
                <li>11월</li>
                <li>12월</li>
              </ul>
              <ul ref={rightFilterRef} onScroll={onScrollRightFilter}>
                <li>1일</li>
                <li>2일</li>
                <li className="active">3일</li>
                <li>4일</li>
                <li>5일</li>
                <li>6일</li>
                <li>7일</li>
                <li>8일</li>
                <li>9일</li>
              </ul>
              <div className="filter-active">
                <span />
                <span />
                <span />
              </div>
            </div>
          )}
        </div>
        <div className="FilterBottomSheet__footer">
          <button type="button">확인</button>
        </div>
      </div>
    </div>
  );
};
