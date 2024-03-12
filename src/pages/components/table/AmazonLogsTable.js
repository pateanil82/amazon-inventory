import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Spinner } from "reactstrap";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import { DataTableHead } from "../../../components/table/DataTable";
import { getAmazonLogs } from "../../../services/api";

const columns = [
  {
    name: "Description",
    selector: (row) => row.description,
    sortable: false,
  },
  {
    name: "Date Created",
    selector: (row) => row.timestamp,
    sortable: false,
  },
];

const AmazonLogsTable = () => {
  const authToken = localStorage.getItem("authToken");

  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAmazonLogs(authToken)
      .then((response) => {
        console.log(response);
        const formattedActivities = response?.activities.map((activity) => ({
          ...activity,
          timestamp: moment(activity.timestamp).format("MMM DD YYYY hh:mmA"),
        }));
        setTableData(formattedActivities);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        toast.error("Something went wrong!");
      });
  }, []);

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <DataTableHead>
        <p className="fs-5">Amazon Logs</p>
      </DataTableHead>

      {!isLoading ? (
        <DataTable
          data={tableData}
          columns={columns}
          highlightOnHover
          striped
          fixedHeader
          noDataComponent={<div className="p-2">No logs found</div>}
        ></DataTable>
      ) : (
        <div className="d-flex justify-content-center" style={{ height: "3rem", width: "100%" }}>
          <Spinner type="grow" color="primary" size="sm" />
        </div>
      )}
    </>
  );
};

export default AmazonLogsTable;
