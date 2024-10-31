import {
  Component,
  ComponentRef, ViewChild,
  ViewContainerRef
} from '@angular/core';
import {FrameComponent} from "./top-level/frame-component/frame.component";
import { SelectTypeComponent } from "./top-level/select-type/select-type.component";
import {FrameControllerService} from "./services/frame-controller.service";

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

  title = 'VariableFonts';
  @ViewChild('frameSpawner', {read: ViewContainerRef}) framespawner: ViewContainerRef | undefined;

  constructor(private viewContainerRef: ViewContainerRef, protected frameController : FrameControllerService) {
  }

  spawnCanvas(){
    this.frameController.createWindow(this.viewContainerRef);
  }
}
