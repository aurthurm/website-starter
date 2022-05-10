import { IPostSimple } from "src/app/shared/post-editor/post-editor.model";

export interface ISlide extends IPostSimple {
    featuredImage?: string;
    opened?: boolean;
    dateOpened?: string
}  