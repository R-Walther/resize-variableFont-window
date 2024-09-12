import {Component, EventEmitter, Output} from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-modify-frame-fill',
  templateUrl: './modify-frame-fill.component.html',
  styleUrls: ['./modify-frame-fill.component.sass'],
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule
  ]
})
export class ModifyFrameFillComponent {
  @Output() close = new EventEmitter<void>();

  onClose(){
    this.close.emit;
    //todo handle the closing to delete the window in the openWindows array
  }
}
