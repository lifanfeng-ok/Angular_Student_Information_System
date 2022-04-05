import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {LoginAuth} from './auth/loginauth';
import {SearchstudentComponent} from './searchstudent/searchstudent.component';
import {StudentdetailComponent} from './studentdetail/studentdetail.component';
import {StudentgradesComponent} from './studentgrades/studentgrades.component';
import {ScorequeryComponent} from './scorequery/scorequery.component';
import {GradedashboardComponent} from './gradedashboard/gradedashboard.component';
import {GPAedashboardComponent} from './gpaedashboard/gpaedashboard.component';
import { CourseinfoComponent } from './courseinfo/courseinfo.component';
import { ProvinceInfoComponent } from './province-info/province-info.component';
import { ClassinfoComponent } from './classinfo/classinfo.component';
const routes: Routes = [
  { path: '', pathMatch: 'full', component: LoginComponent },
  { path: 'home', component : HomeComponent },
  { path: 'search', component : SearchstudentComponent },
  { path: 'search/:id', component : StudentdetailComponent },
  { path: 'search/:id/grades', component: StudentgradesComponent},
  { path: 'score_query', component: ScorequeryComponent},
  { path: 'gradedashboard', component: GradedashboardComponent},
  { path: 'gpaedashboard', component: GPAedashboardComponent},
  { path: 'courseinfo/:courseid', component: CourseinfoComponent },
  { path: 'provinceInfo/:province', component: ProvinceInfoComponent},
  { path: 'classinfo/:class', component: ClassinfoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
