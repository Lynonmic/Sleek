export type DataType = {
  title: string;
  value: string;
};

export type UserType  = {
  idnd: string;
  tennguoidung: string;
  email: string;
  vaitro: string;
  lsgiaodich: string;
};

export type GameType = {
  idtc: string;
  tieude: string;
  idtl: string;
  nhaphathanh: string;
  giaban: string;
  mota: string;
  slkho: string;
  hinhanh: string;
  duongdan: string;
};

export type OrderType = {
  iddh: string;
  idnd: string;
  ngaydat: string;
  trangthai: string;
};

export type OrderDetailType = {
  idctdh: string;
  iddh: string;
  idtc: string;
  soluong: number;
  giatungtc: number;
};

export const dataUser: DataType[] = [
  { title: "ID", value: "idnd" },
  { title: "UserName", value: "tennguoidung" },
  { title: "Email", value: "email" },
  { title: "Status", value: "vaitro" },
  { title: "Transaction Record", value: "lsgiaodich" },
];

export const dataGame: DataType[] = [
  { title: "ID", value: "idtc" },
  { title: "Title", value: "tieude" },
  { title: "Type ID", value: "idtl" },
  { title: "Author", value: "nhaphathanh" },
  { title: "Cost", value: "giaban" },
  { title: "Description", value: "mota" },
  { title: "Stock", value: "slkho" },
  { title: "Image", value: "hinhanh" },
  { title: "Link", value: "duongdan" }
];

export const dataOrder: DataType[] = [
  { title: "Order ID", value: "iddh" },
  { title: "User ID", value: "idnd" },
  { title: "Order Date", value: "ngaydat" },
  { title: "Status", value: "trangthai" }
];

export const dataOrderDetail: DataType[] = [
  { title: "Detail ID", value: "idctdh" },
  { title: "Order ID", value: "iddh" },
  { title: "Game ID", value: "idtc" },
  { title: "Quantity", value: "soluong" },
  { title: "Price", value: "giatungtc" }
];