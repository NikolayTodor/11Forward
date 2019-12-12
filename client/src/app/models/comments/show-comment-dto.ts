export class ShowCommentDTO {
    public id: string;
    public content: string;
    public dateCreated: string;
    public dateLastUpdated: string;
    public author: string;
    public authorAvatar?: string;
    public authorId?: string;
    public likes: number;
}
