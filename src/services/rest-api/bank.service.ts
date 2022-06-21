import { Bank, Me, Reservation } from "src/type";
import { AxiosApiWrapper } from "../abstract/axios-api-wrapper.abstract";

class bankAxiosService extends AxiosApiWrapper {
  endPoint!: string;
  getBank(): Promise<Bank> {
    this.endPoint = `bank`;
    return this.get<Bank>();
  }

  getReservations(): Promise<Reservation[]> {
    this.endPoint = `reservations`;
    return this.get<Reservation[]>();
  }

  getReservationDetail(id: string): Promise<Reservation> {
    this.endPoint = `reservation/${id}`;
    return this.get<Reservation>();
  }

  getMe(): Promise<Me> {
    this.endPoint = `me`;
    return this.get<Me>();
  }
}

export default new bankAxiosService();
