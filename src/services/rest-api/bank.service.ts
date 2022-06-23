import { Bank, Me, Reservation } from "src/type";
import { AxiosApiWrapper } from "../abstract/axios-api-wrapper.abstract";

class bankAxiosService extends AxiosApiWrapper {
  endPoint!: string;
  getBank(): Promise<Bank> {
    this.endPoint = `bank`;
    return this.get<Bank>();
  }

  getReservations(): Promise<Reservation[]> {
    //TODO: infinite scroll을 위한 페이지네이션 추가
    // this.endPoint = `reservations?_page=1&limit=10`;
    this.endPoint = `reservations`;
    return this.get<Reservation[]>();
  }

  getReservationDetail(id: number): Promise<Reservation> {
    this.endPoint = `reservation/${id}`;
    return this.get<Reservation>();
  }

  modifyReservationDetail({ id, ...rest }: Reservation): Promise<Reservation> {
    this.endPoint = `reservations/${id}`;
    return this.put<Reservation>({ ...rest });
  }

  addReservationDetail(reservation: Reservation): Promise<Reservation> {
    this.endPoint = `reservations`;
    return this.post<Reservation>(reservation);
  }

  modifyMe(me: Me): Promise<Me> {
    this.endPoint = `me`;
    return this.put<Me>({ ...me });
  }

  getMe(): Promise<Me> {
    this.endPoint = `me`;
    return this.get<Me>();
  }
}

export default new bankAxiosService();
