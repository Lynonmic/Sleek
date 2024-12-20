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

export const dataUser: DataType[] = [
  { title: "ID", value: "idnd" },
  { title: "UserName", value: "tennguoidung" },
  { title: "Email", value: "email" },
  { title: "Status", value: "vaitro" },
  { title: "Transaction Record", value: "lsgiaodich" },
];