import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  step: number = 1;
  constructor() { }

  ngOnInit(): void {
  }

  nextStep() {
    if(this.step < 4) {
      this.step++;
    }
  }

  previousStep() {
    if(this.step > 1) {
      this.step--;
    }
    
  }

}
