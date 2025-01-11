import { useEffect, useState } from "react";
import { DataTable } from "./DataTable";
import { userUpdateFormConfig } from "./formConfigs";

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

  const userFormConfig = {
    title: "Add User",
    endpoint: "http://localhost:8000/nguoidung",
    fields: [
      { id: "username", label: "Username", type: "text", required: true },
      { id: "password", label: "Password", type: "password", required: true },
      {
        id: "confirmPassword",
        label: "Confirm Password",
        type: "password",
        required: true,
      },
      { id: "email", label: "Email", type: "email", required: true },
      {
        id: "role",
        label: "Role",
        type: "combobox",
        options: [
          { label: "Customer", value: "khachhang" },
          { label: "Manager", value: "quanly" },
          { label: "Admin", value: "admin" },
        ],
      },
    ],
  };
  return (
    <DataTable
      data={users}
      columnsData={columnsData}
      tableName={"nguoidung"}
      idField="idnd"
      filterField="email"
      configForm={userFormConfig}
    />
  );
}
