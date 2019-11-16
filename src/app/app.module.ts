import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import {CoreModule} from './core/core.module';
import {SharedModule} from './shared/shared.module';
import {MAT_TOOLTIP_DEFAULT_OPTIONS} from '@angular/material';
import {PageModule} from './layout/main-content/page/page.module';
// import {EnzymeDesignProcessComponent}from './layout/main-content/new-enzyme-design/enzyme-design-process/enzyme-design-process.component';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    // EnzymeDesignProcessComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    PageModule,
    AppRoutingModule
  ],
  providers: [
    { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: {}},
    { provide: NZ_I18N, useValue: zh_CN },
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
