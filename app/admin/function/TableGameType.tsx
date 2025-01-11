import { useEffect, useState } from "react";
import { DataTable } from "./DataTable";
import { gameFormConfig, gameTypeFormConfig } from "./formConfigs";

export function TableType() {
  interface gameType {
    id: string;
    name: string;
    des: string;
  }

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:8000/theloaitrochoi", {
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

  const types: gameType[] = products.map((product) => ({
    id: product.idtl,
    name: product.tentheloai,
    des: product.motatl,
  }));

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const columnsData = [
    { title: "ID", value: "id" },
    { title: "Name", value: "name" },
    { title: "Description", value: "des" },
  ];

  return (
    <DataTable
      data={types}
      columnsData={columnsData}
      tableName="theloaitrochoi"
      idField="idtl"
      filterField="name"
      configForm={gameTypeFormConfig}
    />
  );
}
