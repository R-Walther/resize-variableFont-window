import {Component, Input} from '@angular/core';
@Component({
  selector: 'app-text-frame',
  templateUrl: './text-frame.component.html',
  styleUrls: ['./text-frame.component.sass']
})
export class TextFrameComponent {
  // @ts-ignore
  @Input() size: { w: number, h: number } = {w: 0, h: 0};
  @Input() minSize: { w: number, h: number } = {w: 0, h: 0};
  fontWeight = 100;
  fontWidth = 50;
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
