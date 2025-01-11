import { FormConfig } from "@/components/ui/form";

export type EditFormConfig = FormConfig & {
  defaultValue?: Record<string, any>;
};

export const createUpdateFormConfig = (formConfig: FormConfig, data: any): EditFormConfig => {
  const id = data.idnd || data.idtc || data.iddh || data.idctdh; // Get the appropriate ID based on the data
  return {
    ...formConfig,
    title: `Update ${formConfig.title.split(' ')[1]}`,
    endpoint: `${formConfig.endpoint}/${id}`, // Append ID to the endpoint
    defaultValue: data
  };
};

export const userFormConfig: FormConfig = {
  title: "Add User",
  endpoint: "http://localhost:8000/nguoidung",
  fields: [
    { id: "tennguoidung", label: "Username", type: "text", required: true },
    { id: "mk", label: "Password", type: "password", required: true },
    { id: "email", label: "Email", type: "email", required: true },
    { id: "lsgiaodich", label: "Transaction Record", type: "text" },
    { 
      id: "vaitro", 
      label: "Role", 
      type: "combobox",
      options: [
        { label: "Customer", value: "khachhang" },
        { label: "Manager", value: "quanly" },
        { label: "Admin", value: "admin" }
      ]
    }
  ]
};

export const userUpdateFormConfig: FormConfig = {
  title: "Update User",
  endpoint: "http://localhost:8000/nguoidung",
  fields: [
    { id: "tennguoidung", label: "Username", type: "text", required: true },
    { id: "email", label: "Email", type: "email", required: true },
    { id: "lsgiaodich", label: "Transaction Record", type: "text" },
    { 
      id: "vaitro", 
      label: "Role", 
      type: "combobox",
      options: [
        { label: "Customer", value: "khachhang" },
        { label: "Manager", value: "quanly" },
        { label: "Admin", value: "admin" }
      ]
    }
  ]
};

export const gameFormConfig = {
  title: "Add Game",
  endpoint: "http://localhost:8000/trochoi",
  fields: [
    { id: "tieude", label: "Title", type: "text", required: true },
    { id: "idtl", label: "Type_id", type: "text", required: true },
    { id: "nhaphathanh", label: "Author", type: "text", required: true },
    { id: "giaban", label: "Cost", type: "text", required: true },
    { id: "mota", label: "Description", type: "text"},
    { id: "slkho", label: "Stored number", type: "text", required: true },
    { id: "hinhanh", label: "Image", type: "text"},
    { id: "duongdan", label: "Link", type: "text" },
  ],
};

export const gameUpdateFormConfig = {
  title: "Update Game",
  endpoint: "http://localhost:8000/trochoi",
  fields: [
    { id: "tieude", label: "Title", type: "text", required: true },
    { id: "idtl", label: "Type_id", type: "text", required: true },
    { id: "nhaphathanh", label: "Author", type: "text", required: true },
    { id: "giaban", label: "Cost", type: "text", required: true },
    { id: "mota", label: "Description", type: "text"},
    { id: "slkho", label: "Stored number", type: "text", required: true },
    { id: "hinhanh", label: "Image", type: "text"},
    { id: "duongdan", label: "Link", type: "text" },
  ]
};

export const orderFormConfig: FormConfig = {
  title: "Add Order",
  endpoint: "http://localhost:8000/donhang",
  fields: [
    { id: "idnd", label: "User ID", type: "text", required: true },
    { id: "ngaydat", label: "Order Date", type: "date", required: true },
    { id: "tonggiatri", label: "Total Value", type: "number", required: true },
    { id: "trangthai", label: "Status", type: "text", required: true }
  ]
};

export const orderUpdateFormConfig: FormConfig = {
  title: "Update Order",
  endpoint: "http://localhost:8000/donhang",
  fields: [
    { id: "idnd", label: "User ID", type: "text", required: true },
    { id: "ngaydat", label: "Order Date", type: "date", required: true },
    { id: "trangthai", label: "Status", type: "text", required: true }
  ]
};

export const orderDetailFormConfig: FormConfig = {
  title: "Add Order Detail",
  endpoint: "http://localhost:8000/chitietdonhang",
  fields: [
    { id: "iddh", label: "Order ID", type: "text", required: true },
    { id: "idtc", label: "Game ID", type: "text", required: true },
    { id: "soluong", label: "Quantity", type: "number", required: true },
    { id: "giatungtc", label: "Price", type: "number", required: true }
  ]
};

export const orderDetailUpdateFormConfig: FormConfig = {
  title: "Update Order Detail",
  endpoint: "http://localhost:8000/chitietdonhang",
  fields: [
    { id: "iddh", label: "Order ID", type: "text", required: true },
    { id: "idtc", label: "Game ID", type: "text", required: true },
    { id: "soluong", label: "Quantity", type: "number", required: true },
    { id: "giatungtc", label: "Price", type: "number", required: true }
  ]
};

export const customerSupportFormConfig: FormConfig = {
  title: "Add Customer Support",
  endpoint: "http://localhost:8000/hotrokhachhang",
  fields: [
    { id: "idnd", label: "Customer ID", type: "text", required: true },
    { id: "issue", label: "Issue", type: "text", required: true },
    { 
      id: "status", 
      label: "Status", 
      type: "combobox",
      options: [
        { label: "Pending", value: "pending" },
        { label: "In Progress", value: "in_progress" },
        { label: "Resolved", value: "resolved" },
        { label: "Closed", value: "closed" }
      ]
    }
  ]
};

export const customerSupportUpdateFormConfig: FormConfig = {
  title: "Update Customer Support",
  endpoint: "http://localhost:8000/hotrokhachhang",
  fields: [
    { id: "idnd", label: "Customer ID", type: "text", required: true },
    { id: "issue", label: "Issue", type: "text", required: true },
    { 
      id: "status", 
      label: "Status", 
      type: "combobox",
      options: [
        { label: "Pending", value: "pending" },
        { label: "In Progress", value: "in_progress" },
        { label: "Resolved", value: "resolved" },
        { label: "Closed", value: "closed" }
      ]
    }
  ]
};

export const gameTypeFormConfig: FormConfig = {
  title: "Add Game Type",
  endpoint: "http://localhost:8000/theloaitrochoi",
  fields: [
    { id: "tentheloai", label: "Type Name", type: "text", required: true },
    { id: "motatl", label: "Description", type: "text" }
  ]
};

export const gameTypeUpdateFormConfig: FormConfig = {
  title: "Update Game Type",
  endpoint: "http://localhost:8000/theloaitrochoi",
  fields: [
    { id: "tentheloai", label: "Type Name", type: "text", required: true },
    { id: "motatl", label: "Description", type: "text" }
  ]
};

// Payment form configs
export const paymentFormConfig: FormConfig = {
  title: "Add Payment",
  endpoint: "http://localhost:8000/thanhtoan",
  fields: [
    { id: "iddh", label: "Order ID", type: "text", required: true },
    { id: "ngaytt", label: "Payment Date", type: "date", required: true },
    { 
      id: "phuongthucthanhtoan", 
      label: "Payment Method", 
      type: "combobox",
      options: [
        { label: "Credit Card", value: "credit_card" },
        { label: "Debit Card", value: "debit_card" },
        { label: "E-Wallet", value: "e_wallet" }
      ]
    },
    { 
      id: "trangthaithanhtoan", 
      label: "Payment Status", 
      type: "combobox",
      options: [
        { label: "Pending", value: "pending" },
        { label: "Completed", value: "completed" },
        { label: "Failed", value: "failed" }
      ]
    }
  ]
};

export const paymentUpdateFormConfig: FormConfig = {
  title: "Update Payment",
  endpoint: "http://localhost:8000/thanhtoan",
  fields: [
    { id: "iddh", label: "Order ID", type: "text", required: true },
    { 
      id: "phuongthucthanhtoan", 
      label: "Payment Method", 
      type: "combobox",
      options: [
        { label: "Credit Card", value: "credit_card" },
        { label: "Debit Card", value: "debit_card" },
        { label: "E-Wallet", value: "e_wallet" }
      ]
    },
    { 
      id: "trangthaithanhtoan", 
      label: "Payment Status", 
      type: "combobox",
      options: [
        { label: "Pending", value: "pending" },
        { label: "Completed", value: "completed" },
        { label: "Failed", value: "failed" }
      ]
    },
    { id: "ngaytt", label: "Payment Date", type: "date", required: true }
  ]
};

// Invoice form configs
export const invoiceFormConfig: FormConfig = {
  title: "Add Invoice",
  endpoint: "http://localhost:8000/hoadon",
  fields: [
    { id: "idtt", label: "Payment ID", type: "text", required: true },
    { id: "ngayxuathd", label: "Invoice Date", type: "date", required: true },
    { id: "tenkh", label: "Customer Name", type: "text", required: true },
    { id: "tonggiatrihd", label: "Total Amount", type: "number", required: true },
    { 
      id: "phuongthuchd", 
      label: "Payment Method", 
      type: "combobox",
      options: [
        { label: "Credit Card", value: "credit_card" },
        { label: "Debit Card", value: "debit_card" },
        { label: "E-Wallet", value: "e_wallet" }
      ]
    },
    { 
      id: "trangthaihd", 
      label: "Invoice Status", 
      type: "combobox",
      options: [
        { label: "Pending", value: "pending" },
        { label: "Paid", value: "paid" },
        { label: "Cancelled", value: "cancelled" }
      ]
    }
  ]
};

export const invoiceUpdateFormConfig: FormConfig = {
  title: "Update Invoice",
  endpoint: "http://localhost:8000/hoadon",
  fields: [
    { id: "idtt", label: "Payment ID", type: "text", required: true },
    { id: "ngayxuathd", label: "Invoice Date", type: "date", required: true },
    { id: "tenkh", label: "Customer Name", type: "text", required: true },
    { id: "tonggiatrihd", label: "Total Amount", type: "number", required: true },
    { 
      id: "phuongthuchd", 
      label: "Payment Method", 
      type: "combobox",
      options: [
        { label: "Credit Card", value: "credit_card" },
        { label: "Debit Card", value: "debit_card" },
        { label: "E-Wallet", value: "e_wallet" }
      ]
    },
    { 
      id: "trangthaihd", 
      label: "Invoice Status", 
      type: "combobox",
      options: [
        { label: "Pending", value: "pending" },
        { label: "Paid", value: "paid" },
        { label: "Cancelled", value: "cancelled" }
      ]
    }
  ]
};
