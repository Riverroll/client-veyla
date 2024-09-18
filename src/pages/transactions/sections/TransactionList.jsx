import DataTable from "../../../components/common/tables/DataTable";
import useFetchTransactions from "../../../hooks/useFetchTransactions";

const TransactionList = () => {
  const { transactions, loading, error, refetch } = useFetchTransactions();

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "user.name", headerName: "User ID", width: 100 },
    { field: "table.table_name", headerName: "Table", width: 100 },
    { field: "total_price", headerName: "Total Price", width: 150 },
    { field: "status", headerName: "Status", width: 120 },
  ];

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Transaction List</h1>

      <DataTable rows={transactions} columns={columns} loading={loading} />
    </div>
  );
};

export default TransactionList;
