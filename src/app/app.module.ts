import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { AccountModule } from './account/account.module';
import { HelperService } from './admin/helper/helper.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Interceptor } from './auth/interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        AccountModule,
        BrowserModule,
        AppRoutingModule,
        HttpModule,
        BrowserModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        AccountModule,
    ],
    providers: [
        //ToasterService,
        HelperService,
        { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }  ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(router: Router) {
        //console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
    }
}
