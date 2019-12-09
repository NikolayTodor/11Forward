export class CreatePostDTO {
    public title: string;
    public content: string;
    public isPrivate: boolean;
    public imageURL?: string;
    public base?: string;
}

// The DTO is changed since we
// use image cropper to produce a base64 string
// for the cropped image and send it to the backend
// At present this technique is suboptimal, since
// it forces us to change this property from base64 string
// to url string in order to create Post. Refactoring needed!!!
