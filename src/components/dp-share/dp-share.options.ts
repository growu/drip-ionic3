export interface DpShareOptions {
    data?: DpShareData;
    extra?:any
}

export interface DpShareData {
    type?: string;
    title?: string;
    description?: string;
    thumb?: string;
    image?: string;
    url?: string;
}

