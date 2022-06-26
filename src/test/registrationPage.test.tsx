import { Suspense } from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import {
  render,
  waitFor,
  getByRole,
  fireEvent,
  getByText,
  screen,
  getByPlaceholderText,
  getAllByRole,
  queryByText,
  queryByPlaceholderText,
} from "@testing-library/react";
import { bankMock } from "./mock";
import "@testing-library/jest-dom";
import { RecoilRoot } from "recoil";
import RemittanceRegistrationPage from "src/pages/RemittanceRegistrationPage";
const server = setupServer(
  rest.get("http://localhost:8080/bank", (req, res, ctx) => {
    return res(ctx.json(bankMock));
  })
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => server.close());

test("송금등록화면 헤더 확인", async () => {
  const { container } = render(
    <RecoilRoot>
      <Suspense fallback={<div>loading...</div>}>
        <RemittanceRegistrationPage />
      </Suspense>
    </RecoilRoot>
  );

  await waitFor(() => getByRole(container, "navigation"));

  expect(getByRole(container, "navigation")).toHaveTextContent("예약송금 등록");
});

test("송금등록화면 버튼 disabled", async () => {
  const { container } = render(
    <RecoilRoot>
      <Suspense fallback={<div>loading...</div>}>
        <RemittanceRegistrationPage />
      </Suspense>
    </RecoilRoot>
  );

  await waitFor(() => getByRole(container, "navigation"));
  expect(screen.getByText("등록하기")).toBeDisabled();
});

test("송금등록화면 버튼 disabled 확인", async () => {
  const { container } = render(
    <RecoilRoot>
      <Suspense fallback={<div>loading...</div>}>
        <RemittanceRegistrationPage />
      </Suspense>
    </RecoilRoot>
  );

  await waitFor(() => getByRole(container, "navigation"));
  expect(getByText(container, "등록하기")).toBeDisabled();
});

test("송금등록화면 은행선택", async () => {
  const { container } = render(
    <RecoilRoot>
      <Suspense fallback={<div>loading...</div>}>
        <RemittanceRegistrationPage />
      </Suspense>
    </RecoilRoot>
  );

  await waitFor(() => getByRole(container, "navigation"));
  fireEvent.click(getByPlaceholderText(container, "받는분"));
  const bankBottomSheet = getByRole(container, "article")
    .getElementsByClassName("BottomSheet")
    .item(0);
  expect(bankBottomSheet).toHaveClass("BottomSheet--show");

  expect(queryByPlaceholderText(container, "계좌번호")).toBeNull();
  fireEvent.click(getAllByRole(container, "button")[1]);

  expect(queryByText(container, "카카오뱅크")).not.toBeNull();
  expect(queryByPlaceholderText(container, "계좌번호")).not.toBeNull();
});

test("송금등록화면 반복일 선택", async () => {
  const { container } = render(
    <RecoilRoot>
      <Suspense fallback={<div>loading...</div>}>
        <RemittanceRegistrationPage />
      </Suspense>
    </RecoilRoot>
  );

  await waitFor(() => getByRole(container, "navigation"));
  fireEvent.click(getByText(container, "매월 30일"));
  const dateBottomSheet = getByRole(container, "article")
    .getElementsByClassName("BottomSheet")
    .item(1);
  expect(dateBottomSheet).toHaveClass("BottomSheet--show");

  fireEvent.click(getByText(container, "확인"));

  expect(queryByText(container, "매월 01일")).not.toBeNull();
});

test("송금등록화면 송금액 숫자입력", async () => {
  const { container } = render(
    <RecoilRoot>
      <Suspense fallback={<div>loading...</div>}>
        <RemittanceRegistrationPage />
      </Suspense>
    </RecoilRoot>
  );

  await waitFor(() => getByRole(container, "navigation"));
  const amountInput: HTMLInputElement = getByPlaceholderText(
    container,
    "송금액(원)"
  );
  fireEvent.change(amountInput, { target: { value: "테스트" } });
  expect(amountInput.value).toBe("");
  fireEvent.change(amountInput, { target: { value: "10000" } });
  expect(amountInput.value).toBe("10,000");
});

test("송금등록화면 Input 입력 완료시 button active", async () => {
  const { container } = render(
    <RecoilRoot>
      <Suspense fallback={<div>loading...</div>}>
        <RemittanceRegistrationPage />
      </Suspense>
    </RecoilRoot>
  );

  await waitFor(() => getByRole(container, "navigation"));
  fireEvent.change(
    getByPlaceholderText(container, "제목 예) 용돈, 학원비 등"),
    {
      target: { value: "테스트" },
    }
  );
  fireEvent.click(getByPlaceholderText(container, "받는분"));
  fireEvent.click(getByText(container, "카카오뱅크"));
  fireEvent.change(getByPlaceholderText(container, "계좌번호"), {
    target: { value: "1111-1111-111" },
  });
  fireEvent.change(getByPlaceholderText(container, "송금액(원)"), {
    target: { value: "10000" },
  });
  expect(getByText(container, "등록하기")).not.toBeDisabled();
});
