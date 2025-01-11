// Base Types
export type BaseEntity = {
  id: string | number;
  createdAt?: Date;
  updatedAt?: Date;
};

// Table Specific Types
export type TroChoi = BaseEntity & {
  idtc: string;
  tieude: string;
  idtl: string;
  nhaphathanh: string;
  giaban: number;
  mota: string;
  slkho: number;
  hinhanh: string;
  duongdan: string;
};

export type TheLoaiTroChoi = BaseEntity & {
  idtl: string;
  tentheloai: string;
  motatl: string;
};

export type DonHang = BaseEntity & {
  iddh: string;
  idnd: string;
  ngaydat: Date;
  tonggiatri: number;
  trangthai: string;
};

export type ChiTietDonHang = BaseEntity & {
  idctdh: string;
  iddh: string;
  idtc: string;
  soluong: number;
  giatungtc: number;
};

export type NguoiDung = BaseEntity & {
  idnd: string;
  email: string;
  mk: string;
  lsgiaodich: string;
  tennguoidung: string;
  vaitro: 'admin' | 'khachhang';
};

export type HoTroKhachHang = BaseEntity & {
  idht: string;
  idnd: string;
  ndyeucau: string;
  trangthai: string;
  ngayguiyeucau: Date;
};

export type ThanhToan = BaseEntity & {
  idtt: string;
  iddh: string;
  phuongthucthanhtoan: string;
  trangthaithanhtoan: string;
  ngaytt: Date;
};

export type HoaDon = BaseEntity & {
  idhd: string;
  idtt: string;
  ngayxuathd: Date;
  tenkh: string;
  tonggiatrihd: number;
  phuongthuchd: string;
  trangthaihd: string;
};

// Generic CRUD Types
export type CreateDTO<T> = Omit<T, keyof BaseEntity>;
export type UpdateDTO<T> = Partial<CreateDTO<T>>;
export type ResponseDTO<T> = T & BaseEntity;

// Example usage:
// type CreateGameDTO = CreateDTO<TroChoi>;
// type UpdateGameDTO = UpdateDTO<TroChoi>;
// type GameResponseDTO = ResponseDTO<TroChoi>;
