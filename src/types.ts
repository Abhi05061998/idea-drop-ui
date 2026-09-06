export type Idea={
    _id:string;
    title:string;
    summary:string;
    description:string;
    tags:string[];
    createdAt:string;
    lastUpdated?:string,
    user:string;
}