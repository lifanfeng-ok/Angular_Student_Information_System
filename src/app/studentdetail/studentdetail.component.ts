import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {StudentService} from '../student.service';
import {Student, SelectCourse} from '../stu';
@Component({
  selector: 'app-studentdetail',
  templateUrl: './studentdetail.component.html',
  styleUrls: ['./studentdetail.component.css']
})
export class StudentdetailComponent implements OnInit {

  constructor(public router: Router, private studentservice: StudentService, private route: ActivatedRoute) { }
  isCollapsed = true;
  id: number = Number(this.route.snapshot.paramMap.get('id'));
  courseinfo: SelectCourse[] = [];
  student: Student = {
    birthday : '' ,
    class : '' ,
    major : '' ,
    name  : '' ,
    native_place : '' ,
    sex : '' ,
    stuid : null ,
    time_of_enrollment : '' ,
  };
  getStudentbyID() {
    this.studentservice.getstudentbyID(this.id).subscribe(
      res => this.student = {
        birthday : res.data.birthday,
        class : res.data.class,
        major : res.data.major,
        name : res.data.name,
        native_place : res.data.native_place,
        sex : res.data.sex,
        stuid : res.data.stuid,
        time_of_enrollment : res.data.time_of_enrollment
      }
    );
    console.log('获取信息成功');
  }
  getcouresinfobyID()  {
  this.studentservice.getSelectinfobyID(this.id).subscribe(
    (res) => {
      res.data.forEach(row => {
        this.courseinfo.push( {
            courseid : row.courseid,
            stuid : row.stuid,
            score : row.score
          }
        );
      }); }
  );
  console.log('获取课程信息成功'); }
  logout() {
    sessionStorage.removeItem('user');
    this.router.navigateByUrl('');
  }
  ngOnInit(): void {
    this.getStudentbyID();
    this.getcouresinfobyID();
  }

}
