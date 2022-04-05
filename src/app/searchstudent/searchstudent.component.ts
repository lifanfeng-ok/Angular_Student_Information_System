import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {StudentService} from '../student.service';
import {Student} from '../stu';
import {ColumnItem} from '../stu';
@Component({
  selector: 'app-searchstudent',
  templateUrl: './searchstudent.component.html',
  styleUrls: ['./searchstudent.component.css']
})
export class SearchstudentComponent implements OnInit {

  constructor(public router: Router, private studentservice: StudentService) { }
  isCollapsed = true;
  students: Student[] = [];
  DisplayData: any ;
  DisplayData2: any ;
  searchValue = '';
  visible = false;
  visible2 = false;
  searchValue2 = '';
  searchValue3 = '';
  visible3 = false;
  loading = true;
  column1: ColumnItem = {
    name : '专业',
    filterMultiple : true,
    listOfFilter: [
      { text: '金融学', value: '金融学'},
      { text: '国际经济与贸易', value: '国际经济与贸易'},
      { text: '信息管理与信息系统', value: '信息管理与信息系统'},
      { text: '市场营销学', value: '市场营销学'},
      { text: '会计学', value: '会计学'}
    ],
    filterFn: (list: string[], item: Student) => list.some(name => item.major.indexOf(name) !== -1)
   };
  column2: ColumnItem = {
    name : '入学时间',
    filterMultiple : true,
    listOfFilter: [
      { text: '2015年', value: '2015'},
      { text: '2016年', value: '2016'},
      { text: '2017年', value: '2017'},
      { text: '2018年', value: '2018'},
      { text: '2019年', value: '2019'},
    ],
    filterFn: (list: string[], item: Student) => list.some(Time => item.time_of_enrollment.indexOf(Time) !== -1)
  };
  reset(): void {
     this.DisplayData = this.DisplayData2;
  }
  search() {
    this.reset();
    this.visible = false;
    this.DisplayData = this.DisplayData.filter((item: Student) => item.name.indexOf(this.searchValue) !== -1);
  }
  search2() {
    this.reset();
    this.visible2 = false;
    this.DisplayData = this.DisplayData.filter((item: Student) => item.class.indexOf(this.searchValue2) !== -1);
  }
  search3() {
    this.reset();
    this.visible3 = false;
    this.DisplayData = this.DisplayData.filter((item: Student) => item.native_place.indexOf(this.searchValue3) !== -1);
  }
  getStudents(): void {
    this.studentservice.getStudents().subscribe(
      (res) => {
        res.data.forEach(row => {
          this.students.push( {
              birthday : row.birthday,
              class : row.class,
              major : row.major,
              name : row.name,
              native_place : row.native_place,
              sex : row.sex,
              stuid : row.stuid,
              time_of_enrollment : row.time_of_enrollment
            }
          );
        });
        this.DisplayData = this.students;
        this.DisplayData2 = this.students;
        this.loading = false;
  } ); }
  logout() {
    sessionStorage.removeItem('user');
    this.router.navigateByUrl('');
  }
  ngOnInit(): void {
        this.getStudents();
    }
  }


