import dayjs, { Dayjs } from "dayjs";
import { ReservationType } from "src/type";

export const getDateDiff = (
  dateAt: string,
  dateType: ReservationType
): number => {
  const today = dayjs().startOf("day");
  let date: Dayjs;
  if (dateType === "MONTHLY") {
    const parsedDate = parseInt(dateAt);
    date =
      parsedDate < today.date()
        ? dayjs().add(1, "month").set("date", parseInt(dateAt))
        : dayjs().set("date", parseInt(dateAt));
  } else {
    date = dayjs(dateAt).startOf("day");
  }

  return date.diff(today, "day");
};

export const getNumberWithCommas = (amount: number | string): string => {
  const amountNum = typeof amount === "string" ? Number(amount) : amount;
  return amountNum.toLocaleString();
};
