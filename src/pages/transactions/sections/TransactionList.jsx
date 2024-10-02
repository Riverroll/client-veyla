import React, { useState } from "react";
import DataTable from "../../../components/common/tables/DataTable";
import useFetchTransactions from "../../../hooks/useFetchTransactions";
import { formatCurrency, formatDateTime } from "../../../utils/format";
import TransactionDetailModal from "../../../components/common/cards/TransactionDetailModal";
import axiosInstance from "../../../utils/axiosInstance";

const TransactionList = () => {
  const { transactions, loading, error } = useFetchTransactions();
  const [open, setOpen] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState(null);

  const handleOpen = async (id) => {
    try {
      const response = await axiosInstance.get(`/orders/${id}`);
      setTransactionDetails(response.data.data);
      setOpen(true);
    } catch (error) {
      console.error("Error fetching transaction details:", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setTransactionDetails(null);
  };

  const columns = [
    {
      field: "",
      headerName: "ID",
      width: 100,
      renderCell: (params) => {
        const index = transactions.findIndex(
          (transaction) => transaction.id === params.row.id
        );
        return index + 1;
      },
    },
    {
      field: "user",
      headerName: "User ID",
      width: 150,
      valueGetter: (params) => {
        return params.name || "N/A";
      },
    },
    {
      field: "table",
      headerName: "Table",
      width: 150,
      valueGetter: (params) => {
        return params.table_name || "N/A";
      },
    },
    {
      field: "total_price",
      headerName: "Total Price",
      width: 150,
      valueGetter: (params) => {
        const totalPrice = params || "0";
        return formatCurrency(totalPrice);
      },
    },
    {
      field: "createdAt",
      headerName: "Datetime",
      width: 200,
      valueGetter: (params) => {
        return formatDateTime(params || "");
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params) => (
        <div
          className={`p-2 rounded ${
            params.row.status === "completed"
              ? "bg-green-500 text-white"
              : "bg-gray-200"
          }`}
        >
          {params.row.status}
        </div>
      ),
    },
    {
      field: "id",
      headerName: "Details",
      width: 150,
      renderCell: (params) => (
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          onClick={() => handleOpen(params.id)}
        >
          View
        </button>
      ),
    },
  ];

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Transaction List</h1>

      <DataTable rows={transactions} columns={columns} loading={loading} />

      <TransactionDetailModal
        open={open}
        onClose={handleClose}
        transaction={transactionDetails}
      />
    </div>
  );
};

export default TransactionList;
