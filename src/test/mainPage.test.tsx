import { Suspense } from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import {
  render,
  waitFor,
  getByRole,
  fireEvent,
  getAllByLabelText,
} from "@testing-library/react";
import { reservationListMock, bankMock } from "./mock";
import "@testing-library/jest-dom";
import RemittanceListPage from "src/pages/RemittanceListPage";
import { RecoilRoot } from "recoil";
const server = setupServer(
  rest.get("http://localhost:8080/bank", (req, res, ctx) => {
    return res(ctx.json(bankMock));
  })
);

beforeAll(() => server.listen());
afterAll(() => {
  server.close();
});

test("메인화면 데이터 확인", async () => {
  server.use(
    rest.get("http://localhost:8080/reservations", (req, res, ctx) => {
      return res.once(ctx.json(reservationListMock));
    })
  );
  const { container } = render(
    <RecoilRoot>
      <Suspense fallback={<div>loading...</div>}>
        <RemittanceListPage />
      </Suspense>
    </RecoilRoot>
  );

  await waitFor(() => getByRole(container, "heading"));

  expect(getByRole(container, "heading")).toHaveTextContent("예약송금");
  expect(
    getByRole(container, "main").getElementsByClassName("RemittanceCard").length
  ).toBe(reservationListMock.length);
  Array(3).forEach((_, index) => {
    expect(
      getByRole(container, "main")
        .getElementsByClassName("RemittanceCard")
        .item(index)
        ?.getElementsByTagName("p")
    ).toHaveTextContent(reservationListMock[0].title);
  });
});

test("토글버튼 클릭시 토글 ", async () => {
  server.use(
    rest.get("http://localhost:8080/reservations", (req, res, ctx) => {
      return res.once(ctx.json(reservationListMock));
    }),
    rest.put("http://localhost:8080/reservations/*", (req, res, ctx) => {
      return res(ctx.json(reservationListMock[0]));
    })
  );
  const { container } = render(
    <RecoilRoot>
      <Suspense fallback={<div>loading...</div>}>
        <RemittanceListPage />
      </Suspense>
    </RecoilRoot>
  );

  await waitFor(() => getByRole(container, "heading"));
  const toggleButton = getAllByLabelText(container, "스위치")[0];
  fireEvent.click(toggleButton);

  expect(toggleButton).not.toHaveClass("ToggleButton--active");
});
