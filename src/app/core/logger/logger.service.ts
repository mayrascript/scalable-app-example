import { Injectable } from '@angular/core';

import { take } from 'rxjs/operators';

import { LoggerApiService } from 'src/app/core/logger/logger-api.service';
import { Log, LogLevel } from 'src/app/core/interfaces/log';
import { environment } from 'src/environments/environment';

@Injectable()
export class LoggerService {
  private readonly env = environment.production;

  constructor(private loggerApiService: LoggerApiService) {}

  debug(message: string, additionalInfo?: string) {
    const log = new Log(message, additionalInfo, LogLevel.Debug);
    this.sendLog(log);
  }

  info(message: string, additionalInfo?: string) {
    const log = new Log(message, additionalInfo, LogLevel.Info);
    this.sendLog(log);
  }

  warn(message: string, additionalInfo?: string) {
    const log = new Log(message, additionalInfo, LogLevel.Warn);
    this.sendLog(log);
  }

  error(message: string, additionalInfo?: string) {
    const log = new Log(message, additionalInfo, LogLevel.Error);
    this.sendLog(log);
  }

  fatal(message: string, additionalInfo?: string) {
    const log = new Log(message, additionalInfo, LogLevel.Fatal);
    this.sendLog(log);
  }

  private sendLog(log: Log) {
    if (this.env) {
      this.loggerApiService
        .sendLog(log)
        .pipe(take(1))
        .subscribe();
    } else {
      this.showLogInConsole(log);
    }
  }

  private showLogInConsole(log: Log) {
    switch (log.level) {
      case LogLevel.Debug:
        console.debug(log.message, log.additionalInfo);
        break;
      case LogLevel.Info:
        console.info(log.message, log.additionalInfo);
        break;
      case LogLevel.Warn:
        console.warn(log.message, log.additionalInfo);
        break;
      case LogLevel.Error:
        console.error(log.message, log.additionalInfo);
        break;
      case LogLevel.Fatal:
        console.error(log.message, log.additionalInfo);
        break;
    }
  }
}
