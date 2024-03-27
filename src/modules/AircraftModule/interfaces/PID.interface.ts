export interface IPIDConstants {
  kp: number;
  ki: number;
  kd: number;
}

export default interface IPID {
  integralError: number;
  derivativeError: number;
  error: number;
  constants: IPIDConstants;
}
