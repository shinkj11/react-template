import { Reservation } from "src/type";

export const reservationListMock: Reservation[] = [
  {
    title: "용돈",
    bankId: 1,
    accountNumber: "31233-009-123331",
    type: "MONTHLY",
    dateAt: "30",
    startAt: "20220630",
    finishAt: "",
    amount: 280000,
    isActive: true,
    id: 1,
  },
  {
    title: "월세",
    bankId: 7,
    accountNumber: "777-381-29-338927",
    type: "MONTHLY",
    dateAt: "07",
    startAt: "20220707",
    finishAt: "2022-12-31",
    amount: 820000,
    isActive: true,
    id: 2,
  },
  {
    title: "카메라 대금",
    bankId: 2,
    accountNumber: "2222-22222-22",
    type: "ONCE",
    dateAt: "20220907",
    startAt: "20220630",
    finishAt: "",
    amount: 1870000,
    isActive: false,
    id: 3,
  },
];

export const bankMock = [
  {
    id: 1,
    name: "카카오뱅크",
  },
  {
    id: 2,
    name: "농협",
  },
  {
    id: 3,
    name: "신한",
  },
  {
    id: 4,
    name: "IBK기업",
  },
  {
    id: 5,
    name: "하나",
  },
  {
    id: 6,
    name: "우리",
  },
];
