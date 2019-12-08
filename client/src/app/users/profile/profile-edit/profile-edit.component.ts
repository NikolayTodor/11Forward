import { NotificationService } from './../../../core/services/notification.service';
import { UpdateProfileDTO } from './../../../models/users/update-profile.dto';
import { MatDialogRef } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ImageCroppedEvent, ImageCropperComponent  } from 'ngx-image-cropper';



@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {

  public updateProfileForm: FormGroup;
  public updateProfile: UpdateProfileDTO;
  public createPostForm: FormGroup;
  public imageChangedEvent: any = '';
  public  croppedImage: any = '';
  public  showCropper = false;
  public  containWithinAspectRatio = false;

  @ViewChild(ImageCropperComponent, {static: true}) imageCropper: ImageCropperComponent;

  public constructor(private readonly formBuilder: FormBuilder,
                     private readonly dialogRef: MatDialogRef<ProfileEditComponent>,
                     private readonly notification: NotificationService) { }

  ngOnInit() {

    this.updateProfileForm = this.formBuilder.group({
      username: ['', [Validators.minLength(4), Validators.maxLength(15)]
      ],
      password: ['', [Validators.minLength(6), Validators.maxLength(15)]
      ],
      email:['', [Validators.email]]
    });

  }

  fileChangeEvent(event: any): void {

    const file = event.srcElement.files[0];
    if (!file || !(/image\/(gif|jpg|jpeg|png)$/i).test(file.type) || file.size > 2000000 ) {
      this.notification.error('File type/size invalid!')
      return;
    }

    this.imageChangedEvent = event;
}

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
}

imageLoaded() {
    this.showCropper = true;
    console.log('Image loaded');
}

cropperReady() {
    console.log('Cropper ready');
}

loadImageFailed() {
    console.log('Load failed');
}

public onClikcUpdateProfile(update): void {
    this.updateProfile = {
      ...update,

    };
    if(this.croppedImage) {
      console.log('there is cropped image');
      console.log(this.croppedImage);
      this.updateProfile.base = this.croppedImage;
    }
    this.closeDialog(this.updateProfile);
  }

  closeDialog(defData: any = null){
    this.dialogRef.close({event: 'close', data: defData});
  }

}
