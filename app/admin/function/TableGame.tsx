import { useEffect, useState } from "react";

import { DataTable } from "./DataTable";
import { gameFormConfig } from "./formConfigs";

export function TableGame() {
  interface Game {
    id: string;
    title: string;
    typeid: string;
    author: string;
    cost: number;
    des: string;
    storedNumber: number;
    image: string;
    link: string;
  }
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:8000/trochoi", {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        });
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setProducts(data.data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load products"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  console.log(products);
  const games: Game[] = products.map((product) => ({
    id: product.idtc,
    title: product.tieude,
    typeid: product.idtl,
    author: product.nhaphathanh,
    cost: product.giaban,
    des: product.mota,
    storedNumber: product.slkho,
    image: product.hinhanh,
    link: product.duongdan,
  }));
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const columnsData = [
    { title: "ID", value: "id" },
    { title: "Title", value: "title" },
    { title: "Type ID", value: "typeid" },
    { title: "Author", value: "author" },
    { title: "Cost", value: "cost" },
    { title: "Description", value: "des" },
    { title: "Stored Number", value: "storedNumber" },
    { title: "Image", value: "image" },
    { title: "Link", value: "link" },
  ];

  return (
    <DataTable
      data={games}
      columnsData={columnsData}
      tableName="trochoi"
      idField="id"
      filterField="title"
      configForm={gameFormConfig}
    />
  );
}
