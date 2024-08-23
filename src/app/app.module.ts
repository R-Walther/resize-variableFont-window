import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FrameComponentComponent } from './top-level/frame-component/frame-component.component';
import { SliderComponent } from './top-level/ui-elements/slider/slider.component';
import { ImageFrameComponent } from './top-level/ui-elements/image-frame/image-frame.component';
import {FormsModule} from "@angular/forms";
import { TextFrameComponent } from './top-level/ui-elements/text-frame/text-frame.component';
import { SelectTypeComponent } from './top-level/select-type/select-type.component';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import { ModifyFrameFillComponent } from './top-level/modify-frame-fill/modify-frame-fill.component';

@NgModule({
  declarations: [
    AppComponent,
    FrameComponentComponent,
    ImageFrameComponent,
    TextFrameComponent,
    SelectTypeComponent,
    ModifyFrameFillComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SliderComponent,
    FormsModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
