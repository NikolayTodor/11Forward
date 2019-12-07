import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatCardModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatRadioModule,
  MatToolbarModule,
  MatSidenavModule,
  MatMenuModule,
  MatListModule,
  MatGridListModule,
  MatDialogModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SinglePostInListComponent } from './components/single-post-in-list/single-post-in-list.component';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  declarations: [SinglePostInListComponent],
  imports: [CommonModule, MatCardModule],
  exports: [
    SinglePostInListComponent,
    CommonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatRadioModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    FormsModule,
    MatGridListModule,
    ReactiveFormsModule,
    MatDialogModule,
    ImageCropperModule
  ]
})
export class SharedModule {}
