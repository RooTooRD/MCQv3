import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";

const MyDataGridComponent = () => {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });
  const [data, setData] = useState([]);
  const rowCount = 2417; // Assuming you know the total row count from your server response

  const fetchData = async (page, pageSize) => {
    const response = await fetch(
      `http://localhost:8000/api/questions/?limit=${pageSize}&page=${page + 1}`
    );
    const result = await response.json();
    setData(result.results);
  };

  useEffect(() => {
    fetchData(paginationModel.page, paginationModel.pageSize);
  }, [paginationModel]);

  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={data}
        columns={[
          { field: "id", headerName: "ID", width: 90 },
          { field: "text", headerName: "Question", width: 300 },
          { field: "year", headerName: "Year", width: 100 },
          { field: "category", headerName: "Category", width: 150 },
          { field: "subCategory", headerName: "SubCategory", width: 150 },
        ]}
        pagination
        paginationMode="server"
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        rowCount={rowCount}
        pageSizeOptions={[5, 10, 25, 50]}
      />
    </div>
  );
};

export default MyDataGridComponent;
