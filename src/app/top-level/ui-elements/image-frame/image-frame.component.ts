import {Component, ViewChild} from '@angular/core';
import {NgForm, NgModel} from "@angular/forms";

@Component({
  selector: 'app-image-frame',
  templateUrl: './image-frame.component.html',
  styleUrls: ['./image-frame.component.sass']
})
export class ImageFrameComponent {
  protected imgSource: any; //url or image path
  protected showImage: boolean = false;
  protected imgIntention: boolean = false;
  @ViewChild("form") urlForm: NgForm | undefined;

  onSubmit() {
    //the url should be saved locally and the img loaded
    this.showImage = true
    this.imgSource = this.urlForm?.value.urlInputField;
    console.log("url : " + this.imgSource);
  }
}
