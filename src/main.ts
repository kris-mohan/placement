import {
  bootstrapApplication,
  provideProtractorTestingSupport,
} from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideRouter } from "@angular/router";
import appRoutes from "./app/appRoutes";
import { importProvidersFrom } from "@angular/core";
import { provideHttpClient } from "@angular/common/http";
import { LoggerModule, NgxLoggerLevel, TOKEN_LOGGER_CONFIG } from "ngx-logger";

const loggerConfig = {
  level: NgxLoggerLevel.DEBUG,
  serverLogLevel: NgxLoggerLevel.ERROR,
};
bootstrapApplication(AppComponent, {
  providers: [
    provideProtractorTestingSupport(),
    provideRouter(appRoutes),
    provideAnimationsAsync(),
    provideAnimationsAsync(),
    provideHttpClient(),
    { provide: "LOCALSTORAGE", useValue: localStorage },
    importProvidersFrom(LoggerModule.forRoot(loggerConfig)),
  ],
}).catch((err) => console.error(err));
