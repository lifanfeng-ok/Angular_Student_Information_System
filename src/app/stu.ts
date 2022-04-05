import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';

export interface Stu {
  stuid: number;
  password: string;
}
export interface Student {
  birthday: string ;
  class: string;
  major: string;
  name: string;
  native_place: string;
  sex: string;
  stuid: number;
  time_of_enrollment: string;
}

export interface SelectCourse {
  courseid: string;
  score: number;
  stuid: number;
}

export  interface Course {
  courseid: string;
  coursename: string;
  credit: number;
  type: string;
}
export interface Studentcourse {
  Courseid: string;
  coursename: string;
  credit: number;
  type: string;
  score: number;
  gradepoint: number;
}

export interface ColumnItem {
  name: string;
  sortOrder?: NzTableSortOrder;
  sortFn?: NzTableSortFn;
  listOfFilter?: NzTableFilterList;
  filterFn?: NzTableFilterFn;
  filterMultiple?: boolean;
  sortDirections?: NzTableSortOrder[];
}

export interface Data {
  value: number;
  name: string;
}

export interface Year {
  product: string;
  '1996年': number;
  '1997年': number;
  '1998年': number;
  '1999年': number;
  '2000年': number;
}

export interface Courseinfo {
    courseid: string;
    coursename: string;
    credit: number;
    type: string;
    score: number;
    stuid: number;
}

export interface Coursedetail {
  courseid: string;
  coursename: string;
  name: string;
  major: string;
  class: string;
  score: number;
  stuid: number;
}
export interface GPAinfo {
  stuid: number;
  name: string;
  major: string;
  class: string;
  GPA: number;
}
export  interface Coursedetail2 {
    stuid: number;
    major: string;
    courseid: string;
    coursename: string;
    score: number;
}
export interface Failnumber {
  stuid: number;
  name: string;
  class: string;
  failnumber: number;
}
export interface Excellentnumber {
  stuid: number;
  name: string;
  class: string;
  excellentnumber: number;
}

