import React from "react";
import { ReactDataTable } from "../../../../../components/Component";
import { Input, Spinner } from "reactstrap";

const ManualForecastComp = ({ tableDataManual, setManualDataToSave, isLoading, asin }) => {
  const dataTableColumns = [
    {
      name: "Month",
      selector: (row) => row.monthName,
      sortable: false,
      width: "8rem",
      id: 1,
    },
    {
      name: "Last Year Sales",
      selector: (row) => row.salesLastYear,
      sortable: false,
      width: "12rem",
      id: 2,
    },
    {
      name: "Monthly Forecast",
      selector: (row) => row.monthlyForecast,
      sortable: false,
      cell: (row) => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1; // January is 0

        const isDisabled = row.year === currentYear && row.monthValue < currentMonth;

        return (
          <Input
            type="number"
            name="monthlyForecast"
            defaultValue={row.monthlyForecast}
            disabled={isDisabled}
            onChange={(e) => {
              handleForecastInput(e, row);
            }}
          />
        );
      },
      id: 3,
    },
  ];

  let tableDataCopy = structuredClone(tableDataManual);
  const handleForecastInput = (e, row) => {
    const value = Number(e.target.value);

    let matchingObject = tableDataCopy.find((data) => data.monthValue === row.monthValue);

    let modiFiedObj = {
      asin: asin,
      month: matchingObject.monthValue,
      year: matchingObject.year,
      monthlyForecast: value,
    };

    // setManualDataToSave((prevData) => [...prevData, modiFiedObj]);

    setManualDataToSave((prevData) => {
      const indexToUpdate = prevData.findIndex((item) => item.month === modiFiedObj.month);

      if (indexToUpdate !== -1) {
        // If the matching month already exists, update it
        const updatedData = [...prevData];
        updatedData[indexToUpdate] = modiFiedObj;
        return updatedData;
      } else {
        // If the matching month doesn't exist, add it to the array
        return [...prevData, modiFiedObj];
      }
    });
  };

  return (
    <>
      {!isLoading ? (
        <div>
          <ReactDataTable data={tableDataManual} columns={dataTableColumns} expandableRows={false} actions />
        </div>
      ) : (
        <div className="d-flex justify-content-center " style={{ height: "3rem", width: "100%" }}>
          <Spinner color="primary" type="grow" />
        </div>
      )}
    </>
  );
};

export default ManualForecastComp;
