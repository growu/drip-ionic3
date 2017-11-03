export interface MyShareOptions {
    data?: MyShareData;
    extra?:any
}

export interface MyShareData {
    type?: string;
    title?: string;
    description?: string;
    thumb?: string;
    image?: string;
    url?: string;
}

