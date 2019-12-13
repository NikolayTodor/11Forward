export class ShowPostDTO {
    public id: string;
    public title: string;
    public content: string;
    public imageURL: string;
    public isPrivate: boolean;
    public dateCreated: string;
    public dateLastUpdated: string;
    public author: any;
    public commentsCount: number;
    public likesCount: number;
}
