import { UpdatePostComponent } from './components/update-post/update-post.component';
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
  declarations: [SinglePostInListComponent, UpdatePostComponent, CreatePostComponent],
  imports: [
    ImageCropperModule,
    CommonModule,
    MatDialogModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatRadioModule,
    MatListModule,
    MatMenuModule,
    FormsModule,
    MatGridListModule,
    ReactiveFormsModule
  ],
  exports: [
    MatDialogModule,
    SinglePostInListComponent,
    MatButtonModule,
    UpdatePostComponent,
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
