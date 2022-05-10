export interface IITemResponse<T> {
    item?: T;
    items?: T[];
  }

export interface IServerResponse<T> {
    statusCode: number;
    timeStamp: number
    items?: T[];
    item?: T;
    message?: string;
}