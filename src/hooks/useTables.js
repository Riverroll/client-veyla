import { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";

const useTables = () => {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTables = async () => {
    try {
      const response = await axiosInstance.get("/tables");
      setTables(response.data.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      toast.error("Failed to fetch tables");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTables();
  }, []);

  return { tables, loading, error, refetch: fetchTables };
};

export default useTables;
