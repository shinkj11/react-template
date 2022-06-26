import { Suspense } from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, waitFor, getByRole, cleanup } from "@testing-library/react";
import { bankMock } from "./mock";
import "@testing-library/jest-dom";
import RemittanceListPage from "src/pages/RemittanceListPage";
import { RecoilRoot } from "recoil";
const server = setupServer(
  rest.get("http://localhost:8080/bank", (req, res, ctx) => {
    return res(ctx.json(bankMock));
  })
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());

test("메인화면 데이터 미존재", async () => {
  server.use(
    rest.get("http://localhost:8080/reservations", (req, res, ctx) => {
      return res(ctx.json([]));
    })
  );

  const { container } = render(
    <RecoilRoot>
      <Suspense fallback={<div>loading...</div>}>
        <RemittanceListPage />
      </Suspense>
    </RecoilRoot>
  );

  await waitFor(() => getByRole(container, "navigation"));
  expect(
    getByRole(container, "navigation").getElementsByTagName("strong").item(0)
  ).toHaveTextContent("예약송금");
  expect(getByRole(container, "article")).toHaveClass("RemittanceEmptyCard");
});
