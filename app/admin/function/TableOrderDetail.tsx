import { useEffect, useState } from "react";
import { DataTable } from "./DataTable";
import { orderDetailFormConfig } from "./formConfigs";

interface OrderDetail {
  id: string;
  ID_Order: string;
  Game_ID: string;
  Number: string;
  price: string;
  // Additional fields after joining
  userName: string;
  userEmail: string;
  gameName: string;
  orderDate: string;
}

interface Order {
  iddh: string;
  idnd: string;
  ngaydat: string;
}

interface User {
  idnd: string;
  tennguoidung: string;
  email: string;
}

interface Game {
  idtc: string;
  tieude: string;
}

export function TableOrderDetail() {
  const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [orderDetailsRes, ordersRes, usersRes, gamesRes] =
          await Promise.all([
            fetch("http://localhost:8000/chitietdonhang"),
            fetch("http://localhost:8000/donhang"),
            fetch("http://localhost:8000/nguoidung"),
            fetch("http://localhost:8000/trochoi"),
          ]);

        const orderDetailsData = await orderDetailsRes.json();
        const ordersData = await ordersRes.json();
        const usersData = await usersRes.json();
        const gamesData = await gamesRes.json();

        const orderMap = new Map(
          ordersData.data.map((order: Order) => [order.iddh, order])
        );
        const userMap = new Map(
          usersData.data.map((user: User) => [user.idnd, user])
        );
        const gameMap = new Map(
          gamesData.data.map((game: Game) => [game.idtc, game])
        );

        const combinedData = orderDetailsData.data.map((detail: any) => {
          const order = orderMap.get(detail.iddh);
          const user = order ? userMap.get(order.idnd) : null;
          const game = gameMap.get(detail.idtc);

          return {
            id: detail.idctdh,
            ID_Order: detail.iddh,
            Game_ID: detail.idtc,
            Number: detail.soluong,
            price: detail.giatungtc,
            userName: user?.tennguoidung || "Unknown",
            userEmail: user?.email || "Unknown",
            gameName: game?.tieude || "Unknown",
            orderDate: order?.ngaydat || "Unknown",
          };
        });

        setOrderDetails(combinedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const columnsData = [
    { title: "ID", value: "id" },
    { title: "Order ID", value: "ID_Order" },
    { title: "Game Name", value: "gameName" },
    { title: "User Name", value: "userName" },
    { title: "User Email", value: "userEmail" },
    { title: "Number", value: "Number" },
    { title: "Price", value: "price" },
    { title: "Order Date", value: "orderDate" },
  ];

  return (
    <DataTable
      data={orderDetails}
      columnsData={columnsData}
      tableName="chitietdonhang"
      idField="id"
      filterField="userName"
      configForm={orderDetailFormConfig}
    />
  );
}
