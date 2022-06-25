/**
 * 은행
 */
export interface Bank {
  /** 아이디 */
  id: number;
  /** 은행명 */
  name: string;
}

/**
 * 예약송금 타입
 */
export type ReservationType =
  | "MONTHLY" // 매월 예약
  | "ONCE"; // 1회 예약

/**
 * 예약송금
 */
export interface Reservation {
  /** 아이디, autoincrement id로 자동생성 */
  id?: number;
  /** 타이틀 */
  title: string;
  /** 은행 아이디 */
  bankId: number;
  /** 계좌번호 */
  accountNumber: string;
  /** 예약송금 타입 */
  type: ReservationType;
  /** 매월 예약인 경우 해당 일자(01, 02 등), 1회 예약인 경우 예약날짜(yyyyMMdd) */
  dateAt: string;
  /** 시작날짜(yyyyMMdd), 1회 예약인 경우 null */
  startAt?: string;
  /** 종료날짜(yyyyMMdd), 1회 예약 및 무한반복인 경우 null */
  finishAt?: string;
  /** 금액 */
  amount: number;
  /** 사용여부 */
  isActive: boolean;
}

/**
 * me 정보
 */

export interface Me {
  /** 현재까지 송금한 금액 */
  remittanceAmount: number;
}

export interface ReservationDateType {
  type: ReservationType;
  dateAt: string;
}
