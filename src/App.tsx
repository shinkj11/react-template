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

function App() {
  const page = useRecoilValue(pageState);
  const callApi = async () => {
    // const result = await bankService.addReservationDetail({
    //   title: "title",
    //   bankId: 2,
    //   accountNumber: "accountNumber",
    //   type: "MONTHLY",
    //   dateAt: "dateAt",
    //   startAt: "startAt",
    //   finishAt: "finishAt",
    //   amount: 10000,
    //   isActive: true,
    // });
    const result = await bankService.modifyReservationDetail({
      id: 3,
      title: "title",
      bankId: 2,
      accountNumber: "accountNumber",
      type: "MONTHLY",
      dateAt: "dateAt",
      startAt: "startAt",
      finishAt: "finishAt",
      amount: 10000,
      isActive: false,
    });
  };

  return (
    <Suspense fallback={<></>}>
      {page === "list" ? (
        <RemittanceListPage />
      ) : page === "registration" ? (
        <RemittanceRegistrationPage />
      ) : page === "detail" ? (
        <RemittanceDetailPage />
      ) : undefined}
    </Suspense>
  );
}

export default App;
