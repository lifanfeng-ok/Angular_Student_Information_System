import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gradepoint'
})
export class GradepointPipe implements PipeTransform {

  transform(gradepoint: number): number {
    if (gradepoint < 1) {
      gradepoint = 0;
      return gradepoint;
    } else {
      return Number(gradepoint.toFixed(1));
    }
  }

}
