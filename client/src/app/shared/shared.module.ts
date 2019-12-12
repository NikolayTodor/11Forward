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
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { RouterModule } from '@angular/router';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';



@NgModule({
  declarations: [
    SinglePostInListComponent,
    UpdatePostComponent,
    CreatePostComponent,
    ConfirmationDialogComponent
  ],
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
    MatButtonModule,
    FormsModule,
    MatGridListModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    MatDialogModule,
    ConfirmationDialogComponent,
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
    ImageCropperModule,
    InfiniteScrollModule
  ]
})
export class SharedModule {}
