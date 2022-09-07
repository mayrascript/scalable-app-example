export enum LogLevel {
  Debug = 1,
  Info = 2,
  Warn = 3,
  Error = 4,
  Fatal = 5,
}

export class Log {
  message: string;
  additionalInfo: string;
  level: LogLevel;
  applicationId?: string;

  constructor(message: string, additionalInfo?: string, level?: LogLevel, applicationId?: string) {
    this.message = message;
    this.additionalInfo = additionalInfo || '';
    this.level = level || LogLevel.Debug;
    this.applicationId = applicationId;
  }
}
