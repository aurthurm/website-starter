export interface IPostSimple {
    _id: string;
    title: string;
    content: string;
}

export interface IPost extends IPostSimple {
    slug?: string;
    tags?: string[];
    category?: string;
    department?: string;
    status?: string;
    excerpt?: string;
    author?: any;
    publisher?: any;
    publishedAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
    featuredImage?: string;
}

interface PostConf {
    excerpt?: boolean;
    publishing?: boolean,
    featurette?: boolean,
    divisions?: string[];
}

export interface IPostInfo {
    post?: IPost;
    config?: PostConf;
}

export interface IPostSimpleInfo {
    post?: IPostSimple;
    config?: PostConf;
}