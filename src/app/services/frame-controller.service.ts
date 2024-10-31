import {ComponentRef, Injectable, ViewContainerRef} from '@angular/core';
import {FrameComponent} from "../top-level/frame-component/frame.component";

@Injectable({
  providedIn: 'root'
})
export class FrameControllerService {
  private windows: Map<number, ComponentRef<FrameComponent>> = new Map();
  private idCounter = 0;

  constructor() {}

  public createWindow(container: ViewContainerRef): number {
    const componentRef = container.createComponent(FrameComponent);
    const windowId = this.idCounter++;
    this.windows.set(windowId, componentRef);

    return windowId;
  }

 public removeWindow(id: number): void {
    const componentRef = this.windows.get(id);
    console.log('the component found for this id ', componentRef);
   console.log('all components: ', this.windows);

    if (componentRef) {
      console.log('deleting ', componentRef);
      componentRef.destroy();
      this.windows.delete(id);
    }
  }

  public removeAllWindows(): void {
    this.windows.forEach((componentRef) => componentRef.destroy());
    this.windows.clear();
  }

  public getLastID(): number{
   return this.idCounter;
  }
}
