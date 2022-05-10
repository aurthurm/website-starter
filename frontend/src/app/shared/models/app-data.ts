export interface IAppData<T> {
    item?: T,
    items?: T[];
}

export interface IAppDataState<T> {
    loading: boolean;
    data?: IAppData<T>;
    error?: string;
}

export interface IPaginated<T> {
    total?: number,
    pageTotal?: number,
    results?: T[];
    page?: number;
    pages?: number;
}

export interface IPagedAppDataState<T> {
    loading: boolean;
    data?: IPaginated<T>;
    error?: string;
}