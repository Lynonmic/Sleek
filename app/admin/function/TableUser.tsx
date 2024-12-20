import { useEffect, useState } from "react";
import { DataTable } from "./DataTable";

export function TableUser() {
  interface User {
    idnd: string;
    tennguoidung: string;
    email: string;
    vaitro: string;
    lsgiaodich: string;
  }

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:8000/nguoidung")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setUsers(data.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const columnsData = [
    { title: "ID", value: "idnd" },
    {
      title: "Name",
      value: "tennguoidung",
    },
    { title: "Email", value: "email" },
    { title: "Role", value: "vaitro" },
    {
      title: "Transaction History",
      value: "lsgiaodich",
    },
  ];

  return (
    <DataTable
      data={users}
      columnsData={columnsData}
      tableName={"nguoidung"}
      idField="idnd"
      filterField="email"
    />
  );
}
