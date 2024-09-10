import { NgxLoggerLevel } from "ngx-logger";

export const environment = {
  production: true,
  logLevel: NgxLoggerLevel.OFF,
  serverLogLevel: NgxLoggerLevel.ERROR,
  //API_URL: "http://20.219.120.124:92/odata",
  API_URL: "https://localhost:44304/odata",
};
