import dayjs from "dayjs";
import { atom, selector } from "recoil";
import bankService from "src/services/rest-api/bank.service";
import { Reservation } from "src/type";

export const pageState = atom({
  key: "pageState",
  default: "list",
});

export const selectedReservationState = atom({
  key: "selectedReservationState",
  default: 1,
});

export const apiRefresher = atom({
  key: "apiRefresher",
  default: 0,
});

export const pageSelector = selector<string>({
  key: "pageSelector",
  get: ({ get }) => {
    return "";
  },
  set: ({ set }, newValue) => {
    set(pageState, newValue);
    set(apiRefresher, dayjs().valueOf());
  },
});

export const bankNameQuery = selector<{ [key: number]: string }>({
  key: "bankNameQuery",
  get: async () => {
    const response = await bankService.getBank();
    let banks: { [key: number]: string } = {};
    response.forEach(({ id, name }) => {
      banks[id] = name;
    });
    return banks;
  },
});

const reservationListState = atom<Reservation[]>({
  key: "reservationList",
  default: [],
});

export const reservationListQuery = selector<Reservation[]>({
  key: "reservationListQuery",
  get: async ({ get }) => {
    get(apiRefresher);
    const response = await bankService.getReservations();
    return response;
  },
  set: ({ set }, newValue) => {
    set(reservationListState, newValue);
  },
});

export const reservationDetailQuery = selector({
  key: "reservationDetailQuery",
  get: async ({ get }) => {
    get(apiRefresher);
    const id = get(selectedReservationState);
    let response;
    if (id !== 0) response = await bankService.getReservationDetail(id);
    return response;
  },
});
