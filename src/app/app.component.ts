import {
  Component,
  ComponentRef,
  ViewContainerRef
} from '@angular/core';
import {FrameComponent} from "./top-level/frame-component/frame.component";
import { SelectTypeComponent } from "./top-level/select-type/select-type.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  imports: [
    FrameComponent,
    SelectTypeComponent
  ],
  standalone: true
})
export class AppComponent{
  private openWindows: ComponentRef<FrameComponent>[] = [];
  title = 'VariableFonts';
  // @ViewChild('frameSpawner', {read: ViewContainerRef}) framespawner: ViewContainerRef | undefined;

  constructor(private viewContainerRef: ViewContainerRef) {
  }

  spawnCanvas(){
    const component = this.viewContainerRef.createComponent(FrameComponent);
    this.openWindows.push(component);
  }
}
