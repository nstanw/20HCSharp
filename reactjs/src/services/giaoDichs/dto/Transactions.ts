export interface User {
    _id: string;
    fullName: string;
    facebook: string;
    zalo?: string;
    googleAccount: any[];
    __v: number;
}

export interface GoogleAccount {
    _id: string;
    gmail: string;
    password: string;
    user: string;
    __v: number;
}

export interface Transaction {
    _id: string;
    ngayGiaoDich: string;
    soGold: number;
    soTien: number;
    soTienNo?: number;
    loaiChuyenKhoan: string;
    user: User;
    googleAccount: GoogleAccount[];
    note: string;
    images: any[];
    __v: number;
}