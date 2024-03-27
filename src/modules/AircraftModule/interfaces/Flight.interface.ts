import IAircraftStatus from './AircraftStatus.interface';

export default interface IFlight {
  callsign: string;
  registration: string;
  connectionStatus: boolean;
  aircraftStatus: IAircraftStatus;
}
