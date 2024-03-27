export default interface IAircraftStatus {
  altitude: number;
  verticalSpeed: number;
  mcpAltitude: number;
  ias: number;
  mcpSpeed?: number; // It is not necessary because we can infer it from FMS
  pitch: number;
}
