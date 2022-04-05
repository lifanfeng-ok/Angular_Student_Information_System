import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {StudentService} from '../student.service';
import {Stu } from '../stu';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;
  stu: Stu = {
    stuid: null,
    password: null,
  } ;
  OnSubmit(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    this.studentservice.getUser(this.stu).subscribe(res => { if (res.status === 1) {
      const userStr: string = JSON.stringify(this.stu);
      sessionStorage.setItem( 'user', userStr );
      this.router.navigateByUrl('/home');
    } else {
      this.router.navigateByUrl('');
      alert('学号或密码不正确！');
    }
  }
    );
  }
    constructor(private fb: FormBuilder, private studentservice: StudentService, public router: Router) {

  }

  ngOnInit(): void {
    // this.getStudents();
    this.validateForm = this.fb.group({
      stuid: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

}
