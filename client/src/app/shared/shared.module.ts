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
  MatDialogModule,
  MatButtonModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SinglePostInListComponent } from './components/single-post-in-list/single-post-in-list.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { CreatePostComponent } from './components/create-post/create-post.component';

@NgModule({
  declarations: [SinglePostInListComponent, CreatePostComponent],
  imports: [CommonModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    ImageCropperModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatRadioModule],
  exports: [
    SinglePostInListComponent,
    MatButtonModule,
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
