import { Injectable } from '@nestjs/common';
import IFlight from './interfaces/Flight.interface';
import IPID from './interfaces/PID.interface';
import delay from '@modules/common/functions';

@Injectable()
export class AircraftService {
  flight: IFlight = {
    callsign: 'TYR001',
    registration: 'TC-TYR',
    connectionStatus: true,
    aircraftStatus: {
      altitude: 5500,
      verticalSpeed: 0,
      mcpAltitude: 15000,
      ias: 300,
      pitch: 5,
    },
  };
  constructor() {
    this.flight.aircraftStatus.verticalSpeed = this.calculateVerticalSpeed();
  }

  currentStatus(): IFlight {
    return this.flight;
  }

  calculateVerticalSpeed(): number {
    const { pitch, ias } = this.flight.aircraftStatus;
    const pitchInRadians = (pitch * Math.PI) / 180; // Convert degree into radian
    const verticalSpeed = ias * Math.sin(pitchInRadians) * 101.269; // We have calculated f/m from knots
    return verticalSpeed;
  }

  calculatePID(pid: IPID, actualValue: number, requestedValue: number): number {
    const error = requestedValue - actualValue;
    pid.integralError += error;

    const derivative = error - pid.derivativeError;
    pid.derivativeError = error;

    const output =
      pid.constants.kp * error +
      pid.constants.ki * pid.integralError +
      pid.constants.kd * derivative;
    return output;
  }

  async climbTest() {
    let i = 0;
    while (i < 800) {
      const aircraftIndicators = this.flight.aircraftStatus;
      const altitudePID: IPID = {
        integralError: 0,
        derivativeError: 0,
        error: 0,
        constants: {
          ki: 0.1,
          kp: 0.01,
          kd: 0.01,
        },
      };
      const newPitch =
        this.flight.aircraftStatus.pitch +
        this.calculatePID(
          altitudePID,
          aircraftIndicators.altitude,
          aircraftIndicators.mcpAltitude,
        );
      const limitedPitch = Math.max(-10, Math.min(15, newPitch));

      this.flight.aircraftStatus.pitch = limitedPitch;

      this.flight.aircraftStatus.verticalSpeed = this.calculateVerticalSpeed();
      delay(100);
      this.flight.aircraftStatus.altitude +=
        this.flight.aircraftStatus.verticalSpeed / 600;

      console.log(this.flight.aircraftStatus);
      i++;
    }
  }
}
