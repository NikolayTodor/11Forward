export class ShowPostDTO {
    public id: string;
    public title: string;
    public content: string;
    public imageURL: string;
    public isPrivate: boolean;
    public dateCreated: string;
    public dateLastUpdated: string;
    public author: string;
    public authorUrl: string;
    public commentsCount: number;
    public likes: number;
}
