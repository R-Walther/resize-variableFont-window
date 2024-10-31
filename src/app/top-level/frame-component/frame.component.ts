
export type ResizeAnchorType =
  | 'top'
  | 'left'
  | 'bottom'
  | 'right'

export type ResizeDirectionType =
  | 'x'
  | 'y'
  | 'xy';

import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {FrameOptions} from "../frame-options";
import {ImageFrameComponent} from "../ui-elements/image-frame/image-frame.component";
import {TextFrameComponent} from "../ui-elements/text-frame/text-frame.component";
import {FrameControllerService} from "../../services/frame-controller.service";
import {ModifyFrameFillComponent} from "../modify-frame-fill/modify-frame-fill.component";


@Component({
  selector: 'app-frame-component',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.sass'],
  standalone: true,
  imports: [
    ImageFrameComponent,
    TextFrameComponent,
    ModifyFrameFillComponent
  ]
})
export class FrameComponent implements OnInit{
  @ViewChild('resizeCorner') resizeCornerRef!: ElementRef;
  protected readonly onmousedown = onmousedown;
  protected frameType : FrameOptions = FrameOptions.TEXT;
  protected readonly FrameOptions = FrameOptions;

  protected position: { x: number, y: number } = {x: 100, y: 100};
  protected size: { w: number, h: number } = {w: 200, h: 200};
  protected lastPosition: { x: number, y: number };
  protected lastSize: { w: number, h: number };
  protected minSize: { w: number, h: number } = {w: 200, h: 200};
  protected maxSize: { w: number, h: number } = {w: 600, h: 600};

  private windowID: number | undefined;

  constructor(
    @Inject(DOCUMENT) private _document: Document,
    protected frameController: FrameControllerService
    ) {
    this.lastPosition = this.position;
    this.lastSize = this.size;
  }

  ngOnInit() {
        this.windowID = this.frameController.getLastID();
    console.log(this.windowID);
  }

  startDrag($event: MouseEvent): void {
    if (!($event.target as HTMLElement).closest('input')) {
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
  protected destroyThisFrame(): void{
    if(this.windowID){
        this.frameController.removeWindow(this.windowID-1);
    }
    else
      console.log('there is no windowID');
  }
}
