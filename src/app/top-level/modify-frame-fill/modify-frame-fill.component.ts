import {Component, EventEmitter, Output} from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {SliderComponent} from "../ui-elements/slider/slider.component";

@Component({
  selector: 'app-modify-frame-fill',
  templateUrl: './modify-frame-fill.component.html',
  styleUrls: ['./modify-frame-fill.component.sass'],
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    SliderComponent
  ]
})
export class ModifyFrameFillComponent {
  @Output() close = new EventEmitter<void>();
  @Output() becomeImageFrame = new EventEmitter<void>();
  @Output() becomeTxtFrame = new EventEmitter<void>();

  onClose(){
    this.close.emit();
  }

  sliderValueChange($event: any) {

  }
}
