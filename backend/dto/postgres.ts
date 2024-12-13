

import { troChoi } from "@/dto/objects";
import {Pool} from "pg";

const pool = new Pool({
     host: "localhost",
  port: 2381,
  user: "postgres",
  password: "aceproit",
  database: "QuanLyBanGame",
  });
export async function getAllData({ tableName }: { tableName: string }) {
 
  if (!/^[a-zA-Z_]+$/.test(tableName)) {
    throw new Error("Invalid table name");
  }

  const query = `SELECT * FROM ${tableName}`;
  const result = await pool.query(query);
   const data: troChoi[] = result.rows.map((row) => ({
      id: row.idtc,
      title: row.tieude,
      idtl: row.idtl,
      author: row.nhaphathanh,
      cost: row.giabam,
      description: row.mota,
      storedNumber: row.slkho, 
      image: row.hinhanh,
      link: row.duongdan,
    }));
  return data;
}

export async function productTroChoi() {
  const tableName = "trochoi";
  const products = await getAllData({ tableName });
  
  return products;
}

export async function insertData(
  table:string,
  idnd: string,
  tennd: string,
  email: string,
  matkhau: string,
  vaitro: string,
  lsgiaodich: DateConstructor
) {
  const result = await pool.query(
    "INSERT INTO $1(idnd, tennd, email, matkhau, vaitro, lsgiaodich) VALUES ($2, $3, $4, $5, $6, $7) RETURNING *",
    [table,idnd, tennd, email, matkhau, vaitro, lsgiaodich]
  );
  return result.rows[0]; // Trả về dữ liệu của người dùng vừa thêm
}    

// Hàm thêm người dùng mới

