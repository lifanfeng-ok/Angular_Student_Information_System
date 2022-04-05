import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { LoginComponent } from './login/login.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { HomeComponent } from './home/home.component';
import {LoginAuth} from './auth/loginauth';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { SearchstudentComponent } from './searchstudent/searchstudent.component';
import { StudentdetailComponent } from './studentdetail/studentdetail.component';
import {NzSpaceModule} from 'ng-zorro-antd/space';
import { StudentgradesComponent } from './studentgrades/studentgrades.component';
import { NgxEchartsModule } from 'ngx-echarts';
registerLocaleData(zh);
import * as echarts from 'echarts';
import { GradepointPipe } from './gradepoint.pipe';
import { ScorequeryComponent } from './scorequery/scorequery.component';
import { GradedashboardComponent } from './gradedashboard/gradedashboard.component';
import { GPAedashboardComponent } from './gpaedashboard/gpaedashboard.component';
import { CourseinfoComponent } from './courseinfo/courseinfo.component';
import { ProvinceInfoComponent } from './province-info/province-info.component';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { ClassinfoComponent } from './classinfo/classinfo.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SearchstudentComponent,
    StudentdetailComponent,
    StudentgradesComponent,
    GradepointPipe,
    ScorequeryComponent,
    GradedashboardComponent,
    GPAedashboardComponent,
    CourseinfoComponent,
    ProvinceInfoComponent,
    ClassinfoComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        IconsProviderModule,
        NzLayoutModule,
        NzMenuModule,
        FormsModule,
        HttpClientModule,
        NzCarouselModule,
        BrowserAnimationsModule,
        NgZorroAntdModule,
        ReactiveFormsModule,
        NzSpaceModule,
      NgxEchartsModule.forRoot({
        echarts,
      })
    ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }, [LoginAuth]],
  bootstrap: [AppComponent]
})
export class AppModule { }
