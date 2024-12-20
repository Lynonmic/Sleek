import { useEffect, useState } from "react";
import { DataTable } from "./DataTable";

export function TableOrder() {
  interface Order {
    id: string;
    User_ID: string;
    Date: string;
    Amount: string;
    State: string;
  }

  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:8000/donhang", {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        });
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setOrders(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const ordersData: Order[] = orders.map((order) => ({
    id: order.iddh,
    User_ID: order.idnd,
    Date: order.ngaydat,
    Amount: order.tonggiatri,
    State: order.trangthai,
  }));

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const columnsData = [
    { title: "ID", value: "id" },
    { title: "User ID", value: "User_ID" },
    { title: "Date", value: "Date" },
    { title: "Amount", value: "Amount" },
    { title: "State", value: "State" },
  ];

  return (
    <DataTable
      data={ordersData}
      columnsData={columnsData}
      tableName="donhang"
      idField="iddh"
      filterField="User_ID"
    />
  );
}
