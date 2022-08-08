import { Component, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  tipAmount: string = '0.00';
  total: string = '0.00';
  bill!: number;
  tipPercent!: number;
  tipPeople!: number;

  text!: string;

  tipForm = new FormGroup<any>('');

  ngOnInit() {
    this.tipForm = new FormGroup({
      bill: new FormControl(''),
      tip: new FormControl(''),
      people: new FormControl(''),
    });

    this.tipForm.get('bill')?.valueChanges.subscribe((value) => {
      this.bill = value;

      if (
        this.bill !== undefined &&
        this.tipPercent !== undefined &&
        this.tipPeople !== undefined &&
        this.tipPeople !== 0 &&
        this.tipPeople !== null
      ) {
        this.calculateTip();
      }

      if (value < 0) {
        this.tipForm.get('bill')?.setValue(0);
      }
    });

    this.tipForm.get('tip')?.valueChanges.subscribe((value) => {
      this.tipPercent = value / 100;

      if (
        this.bill !== undefined &&
        this.tipPercent !== undefined &&
        this.tipPeople !== undefined &&
        this.tipPeople !== 0 &&
        this.tipPeople !== null
      ) {
        this.calculateTip();
      }
      if (value < 0) {
        this.tipForm.get('tip')?.setValue(0);
      }
      this.choosen5 = false;
      this.choosen10 = false;
      this.choosen15 = false;
      this.choosen25 = false;
      this.choosen50 = false;
    });

    this.tipForm.get('people')?.valueChanges.subscribe((value) => {
      this.tipPeople = value;

      if (
        this.bill !== undefined &&
        this.tipPercent !== undefined &&
        this.tipPeople !== undefined &&
        this.tipPeople !== 0 &&
        this.tipPeople !== null
      ) {
        this.calculateTip();
      } else if (this.tipPeople === 0) {
        this.showError = true;
      } else {
        this.showError = false;
      }

      if (value < 0) {
        this.tipForm.get('people')?.setValue(0);
      }
    });
  }
  showError = false;

  calculateTip() {
    this.tipAmount = ((this.bill * this.tipPercent) / this.tipPeople).toFixed(
      2
    );
    this.total = ((this.bill + +this.tipAmount) / this.tipPeople).toFixed(2);
  }

  onReset() {
    this.tipForm.reset();
  }

  choosen5 = false;
  choosen10 = false;
  choosen15 = false;
  choosen25 = false;
  choosen50 = false;

  tipIs5() {
    this.tipPercent = 0.05;
    this.checkValuesCalculate();
    this.choosen5 = true;
    this.choosen10 = false;
    this.choosen15 = false;
    this.choosen25 = false;
    this.choosen50 = false;
  }

  tipIs10() {
    this.tipPercent = 0.1;
    this.checkValuesCalculate();

    this.choosen5 = false;
    this.choosen10 = true;
    this.choosen15 = false;
    this.choosen25 = false;
    this.choosen50 = false;
  }

  tipIs15() {
    this.tipPercent = 0.15;
    this.checkValuesCalculate();
    this.choosen5 = false;
    this.choosen10 = false;
    this.choosen15 = true;
    this.choosen25 = false;
    this.choosen50 = false;
  }

  tipIs25() {
    this.tipPercent = 0.25;
    this.checkValuesCalculate();
    this.choosen5 = false;
    this.choosen10 = false;
    this.choosen15 = false;
    this.choosen25 = true;
    this.choosen50 = false;
  }

  tipIs50() {
    this.tipPercent = 0.5;
    this.checkValuesCalculate();
    this.choosen5 = false;
    this.choosen10 = false;
    this.choosen15 = false;
    this.choosen25 = false;
    this.choosen50 = true;
  }

  checkValuesCalculate() {
    if (
      this.bill !== undefined &&
      this.tipPercent !== undefined &&
      this.tipPeople !== undefined &&
      this.tipPeople !== 0 &&
      this.tipPeople !== null
    ) {
      this.calculateTip();
    }
  }
}
