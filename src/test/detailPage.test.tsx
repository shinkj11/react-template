import { Suspense } from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import {
  render,
  waitFor,
  getByRole,
  queryByText,
  queryByDisplayValue,
} from "@testing-library/react";
import { reservationListMock, bankMock } from "./mock";
import "@testing-library/jest-dom";
import { RecoilRoot } from "recoil";
import RemittanceDetailPage from "src/pages/RemittanceDetailPage";
const server = setupServer(
  rest.get("http://localhost:8080/bank", (req, res, ctx) => {
    return res(ctx.json(bankMock));
  }),
  rest.get("http://localhost:8080/reservations/*", (req, res, ctx) => {
    return res(ctx.json(reservationListMock[0]));
  })
);

beforeAll(() => server.listen());
afterAll(() => {
  server.close();
});

test("송금상세화면 데이터 확인", async () => {
  const { container } = render(
    <RecoilRoot>
      <Suspense fallback={<div>loading...</div>}>
        <RemittanceDetailPage />
      </Suspense>
    </RecoilRoot>
  );

  await waitFor(() => getByRole(container, "navigation"));

  expect(getByRole(container, "navigation")).toHaveTextContent("예약송금 상세");
  expect(queryByDisplayValue(container, "용돈")).not.toBeNull();
  expect(
    queryByDisplayValue(container, "카카오뱅크 31233-009-123331")
  ).not.toBeNull();
  expect(queryByText(container, "매월 30일")).not.toBeNull();
  expect(queryByText(container, "2022.06.30 부터")).not.toBeNull();
  expect(queryByText(container, "무한반복")).not.toBeNull();
  expect(queryByText(container, "종료일 없음")).not.toBeNull();
  expect(queryByDisplayValue(container, "280,000")).not.toBeNull();
});
