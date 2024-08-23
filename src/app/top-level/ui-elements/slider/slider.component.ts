import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MatSliderModule} from '@angular/material/slider';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.sass'],
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatCheckboxModule,
    MatSliderModule,
  ],
})
export class SliderComponent implements OnInit {
  max = 900;
  min = 400;
  showTicks = true;
  step = 1;
  @Output() numberOut = new EventEmitter<number>();
  sliderValue = 650;

  ngOnInit() {
    this.numberOut.emit(this.sliderValue);
  }

  onSliderChange(value: number) {
    console.log("value emitted: " + value);
    this.numberOut.emit(value);

  }
}
