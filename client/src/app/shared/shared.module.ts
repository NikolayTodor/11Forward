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
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SinglePostInListComponent } from './components/single-post-in-list/single-post-in-list.component';
import { UpdatePostComponent } from './components/update-post/update-post.component';

@NgModule({
  declarations: [SinglePostInListComponent, UpdatePostComponent],
  imports: [
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
    ReactiveFormsModule
  ],
  exports: [
    SinglePostInListComponent,
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
    ReactiveFormsModule
  ]
})
export class SharedModule {}
