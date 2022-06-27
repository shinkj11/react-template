import logo from "./logo.svg";
import "./App.css";
import { Suspense, useEffect } from "react";
import bankService from "./services/rest-api/bank.service";
import { getDateDiff } from "./util/Util";
import { RecoilRoot, useRecoilValue } from "recoil";
import { pageState } from "./recoil/Store";
import RemittanceListPage from "./pages/RemittanceListPage";
// 해당 파일은 과제에 맞게 수정해도 무방함
import "../src/assets/style/base.scss";
import RemittanceRegistrationPage from "./pages/RemittanceRegistrationPage";
import RemittanceDetailPage from "./pages/RemittanceDetailPage";
import { ErrorBoundary } from "react-error-boundary";

function App() {
  const page = useRecoilValue(pageState);

  return (
    <ErrorBoundary fallback={<div role="alert">서버 에러입니다.</div>}>
      <Suspense fallback={<></>}>
        {page === "list" ? (
          <RemittanceListPage />
        ) : page === "registration" ? (
          <RemittanceRegistrationPage />
        ) : page === "detail" ? (
          <RemittanceDetailPage />
        ) : undefined}
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
