import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ModifyFrameFillComponent} from "../../modify-frame-fill/modify-frame-fill.component";
import {FrameControllerService} from "../../../services/frame-controller.service";
@Component({
  selector: 'app-text-frame',
  templateUrl: './text-frame.component.html',
  standalone: true,
  imports: [ModifyFrameFillComponent],
  styleUrls: ['./text-frame.component.sass']
})
export class TextFrameComponent {
  // @ts-ignore
  @Input() size: { w: number, h: number } = {w: 0, h: 0};
  @Input() minSize: { w: number, h: number } = {w: 0, h: 0};
  @Output() closeEvent : EventEmitter<void> = new EventEmitter<void>();
  fontWeight = 100;
  fontWidth = 50;
  constructor(protected frameController: FrameControllerService) {

  }

  mapNumRange = (num: number, inMin: number, inMax: number, outMin: number, outMax: number) =>
    ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

  getFontVariationSettings(): string {
    this.updateWeightValue();
    this.updateWidthValue();
    return `"wght" ${this.fontWeight}, "wdth" ${this.fontWidth}`;
  }

  updateWeightValue() {
    this.fontWeight = this.mapNumRange(this.size.w, this.minSize.w, 500, 100, 900)
  }

  updateWidthValue() {
    this.fontWidth = this.mapNumRange(this.size.w, this.minSize.w, this.minSize.w + 150, 50, 150)
  }
}
