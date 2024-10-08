
export type ResizeAnchorType =
  | 'top'
  | 'left'
  | 'bottom'
  | 'right'

export type ResizeDirectionType =
  | 'x'
  | 'y'
  | 'xy';

import {Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {FrameOptions} from "../frame-options";
import {ImageFrameComponent} from "../ui-elements/image-frame/image-frame.component";
import {TextFrameComponent} from "../ui-elements/text-frame/text-frame.component";


@Component({
  selector: 'app-frame-component',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.sass'],
  standalone: true,
  imports: [
    ImageFrameComponent,
    TextFrameComponent
  ]
})
export class FrameComponent {
  @ViewChild('resizeCorner') resizeCornerRef!: ElementRef;
  protected readonly onmousedown = onmousedown;
  protected frameType : FrameOptions = FrameOptions.TEXT;

  position: { x: number, y: number } = {x: 100, y: 100};
  size: { w: number, h: number } = {w: 200, h: 200};
  lastPosition: { x: number, y: number };
  lastSize: { w: number, h: number };
  minSize: { w: number, h: number } = {w: 200, h: 200};
  maxSize: { w: number, h: number } = {w: 600, h: 600};


  constructor(
    @Inject(DOCUMENT) private _document: Document,
    private _el: ElementRef) {
    this.lastPosition = this.position;
    this.lastSize = this.size;
  }



  startDrag($event: { preventDefault: () => void; clientX: any; clientY: any; }): void {

    $event.preventDefault(); // override anticipated functionality for our mouse event
    //capture the mouse X and Y positions
    const mouseX = $event.clientX;
    const mouseY = $event.clientY;

    const positionX = this.position.x;
    const positionY = this.position.y;

    //internal functions
    const duringDrag = (e: { clientX: number; clientY: number; }) => {
      const dx = e.clientX - mouseX;
      const dy = e.clientY - mouseY;
      this.position.x = positionX + dx;
      this.position.y = positionY + dy;
      this.lastPosition = {...this.position};
    };

    const finishDrag = () => {
      this._document.removeEventListener('mousemove', duringDrag);
      this._document.removeEventListener('mouseup', finishDrag);
    };

    this._document.addEventListener('mousemove', duringDrag);
    this._document.addEventListener('mouseup', finishDrag);
  }

  startResize($event: {
    preventDefault: () => void;
    clientX: any;
    clientY: any;
  }, anchors: ResizeAnchorType[], direction: ResizeDirectionType): void {
    $event.preventDefault();
    const mouseX = $event.clientX;
    const mouseY = $event.clientY;
    const lastX = this.position.x;
    const lastY = this.position.y;
    const dimensionWidth = this.resizeCornerRef.nativeElement.parentNode.offsetWidth;
    const dimensionHeight = this.resizeCornerRef.nativeElement.parentNode.offsetHeight;

    const duringResize = (e: { clientX: number; clientY: number; }) => {
      let dw = dimensionWidth;
      let dh = dimensionHeight;
      if (direction === 'x' || direction === 'xy') {
        if (anchors.includes('left')) {
          dw += (mouseX - e.clientX);
        } else if (anchors.includes('right')) {
          dw -= (mouseX - e.clientX);
        }
      }
      if (direction === 'y' || direction === 'xy') {
        if (anchors.includes('top')) {
          dh += (mouseY - e.clientY);
        } else if (anchors.includes('bottom')) {
          dh -= (mouseY - e.clientY);
        }
      }

      if (anchors.includes('left')) {
        this.position.x = lastX + e.clientX - mouseX;
        this.size.w = Math.max(dw, this.minSize.w);
        console.log("size w: " + this.size.w);
      }

      if (anchors.includes('top')) {
        this.position.y = lastY + e.clientY - mouseY;
        this.size.h = Math.max(dh, this.minSize.h);
      }

      if (anchors.includes('bottom') || anchors.includes('right')) {
        this.size.w = Math.max(dw, this.minSize.w);
        this.size.h = Math.max(dh, this.minSize.h);
      }
      this.lastSize = {...this.size};
    };

    const finishResize = () => {
      this._document.removeEventListener('mousemove', duringResize);
      this._document.removeEventListener('mouseup', finishResize);
    };

    //handling the mousemove and mouseup events within the component class via addEventListener is necessary to manage the state during the resizing process effectively.
    //document.addEventListener('mousemove', ...) ensures that the mousemove events are captured regardless of where the mouse moves within the document.
    this._document.addEventListener('mousemove', duringResize);
    this._document.addEventListener('mouseup', finishResize);
  }

  protected readonly FrameOptions = FrameOptions;
}
