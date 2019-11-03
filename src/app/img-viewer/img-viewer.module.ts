import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImgViewerComponent } from './img-viewer.component';
import { ImgViewerRoutingModule } from './img-viewer-routing.module';

@NgModule({
  declarations: [ImgViewerComponent],
  imports: [
    CommonModule,
    ImgViewerRoutingModule
  ]
})
export class ImgViewerModule { }
