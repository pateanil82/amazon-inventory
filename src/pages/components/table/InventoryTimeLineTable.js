import React, { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import { Dropdown, DropdownToggle, DropdownMenu, Spinner, Input, Label, Row, Col } from "reactstrap";
import moment from "moment/moment";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import DataTable from "react-data-table-component";
import Calender from "../../../images/icons/calender.svg";
import Select from "react-select";
import { inventoryTimelineTableHeaders } from "../../../utils/Utils";
import { Icon } from "../../../components/Component";

const customStyles = {
  header: {
    style: {
      minHeight: "56px",
    },
  },
  headRow: {
    style: {
      borderTopStyle: "solid",
      borderTopWidth: "0px",
      borderTopColor: "#e8ecf4",
    },
  },
  headCells: {
    style: {
      "&:not(:last-of-type)": {
        borderRightStyle: "solid",
        borderRightWidth: "1px",
        borderRightColor: "#e8ecf4",
      },
      padding: "10px",
    },
  },
  cells: {
    style: {
      "&:not(:last-of-type)": {
        borderRightStyle: "solid",
        borderRightWidth: "1px",
        borderRightColor: "#e8ecf4",
      },
    },
  },
  divWrapper: {
    style: {
      overflowX: "auto",
      "&::-webkit-scrollbar": {
        width: "12px",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#000000",
        borderRadius: "6px",
      },
      "&::-webkit-scrollbar-track": {
        backgroundColor: "#000000",
      },
    },
  },
};

const getEndDateOneYear = (startDate) => {
  const start = new Date(startDate);
  const end = new Date(start);
  end.setUTCFullYear(end.getUTCFullYear() + 1);

  return end;
};

const InventoryTimeLineTable = ({ isMobile, authToken, apiUrl, asin, selectedForecast, callApi }) => {
  const currentDate = new Date();

  const [selectedColumns, setSelectedColumns] = useState([...inventoryTimelineTableHeaders]);
  const [columnsDropdownOpen, setColumnsDropdownOpen] = useState(false);

  const toggleSelectColumns = () => {
    setColumnsDropdownOpen((prevState) => !prevState);
  };
  const tableColumns = selectedColumns.map((item) => ({
    name: item.name,
    selector: (row) => row[item.key],
    id: item.id,
  }));

  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(getEndDateOneYear(true));
  const [selectedDateFormat, setSelectedDateFormat] = useState("daily");
  const [startDate, setStartDate] = useState(currentDate);
  const [endDate, setEndDate] = useState(getEndDateOneYear(currentDate));

  const onRadioSelect = (e) => {
    setSelectedDateFormat(e.target.value);
  };

  const handleStartDate = (startDateUTC) => {
    setStartDate(startDateUTC);
    setEndDate(getEndDateOneYear(startDateUTC));
  };
  const handleEndDate = (EndDateUTC) => {
    setEndDate(EndDateUTC);
  };

  // Add forecast data API
  const addForecastDetails = async () => {
    const authToken = localStorage.getItem("authToken");
    const data = {
      asin: asin,
      forecast: 10,
      bufferStock: 20,
      shippingFrequency: 30,
      productionFrequency: 40,
      shipLeadTime: 50,
      productionLeadTime: 60,
    };

    await axios
      .post(`${apiUrl}/addForecastDetails`, data, {
        headers: {
          "authorization ": JSON.parse(authToken),
        },
      })
      .then((response) => {
        console.log(response);

        // setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Get forecast data API
  const getForecastSummary = async (data) => {
    setIsLoading(true);

    await axios
      .post(`${apiUrl}/forecastSummary`, data, {
        headers: {
          "authorization ": JSON.parse(authToken),
        },
      })
      .then((response) => {
        setTableData(response?.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        toast.error("Something went wrong!");
      });
  };

  useEffect(() => {
    const data = {
      asin: asin,
      startDate: moment(startDate).format("YYYY-MM-DD"),
      endDate: moment(endDate).format("YYYY-MM-DD"),
      mode: selectedForecast,
      timeLine: selectedDateFormat,
    };

    getForecastSummary(data);
  }, [startDate, endDate, selectedDateFormat, selectedForecast, callApi]);

  const ShowHideColumns = ({ cols }) => {
    const handleSelectedColumns = (e) => {
      const columnId = e.target.value;

      setSelectedColumns((prevOptions) => {
        const optionIndex = prevOptions.findIndex((option) => option.id === columnId);
        if (optionIndex !== -1) {
          // If the option is already selected, remove it
          return prevOptions.filter((selectedOption) => selectedOption.id !== columnId).sort((a, b) => a.id - b.id);
        } else {
          // If the option is not selected, add it
          return [...prevOptions, ...cols.filter((option) => option.id === columnId)].sort((a, b) => a.id - b.id);
        }
      });
    };

    const handleSelectAll = (e) => {
      const value = e.target.checked;
      value ? setSelectedColumns(inventoryTimelineTableHeaders) : setSelectedColumns([]);
    };

    return (
      <React.Fragment>
        <div className="dt-export-buttons d-flex align-center">
          <div className="dt-export-title d-none d-md-inline-block" style={{ fontWeight: 500 }}>
            Select Columns to Show :{" "}
          </div>
          <div className="dt-buttons btn-group flex-wrap">
            <Dropdown isOpen={columnsDropdownOpen} toggle={toggleSelectColumns}>
              <DropdownToggle className="btn-action customs_" color="primary">
                <span className="ellipsis">{`${
                  selectedColumns.length === cols.length
                    ? "All"
                    : selectedColumns.length != 0
                    ? selectedColumns.map((selectedOption) => selectedOption.name).join(", ")
                    : "Nothing selected"
                }`}</span>
                <Icon name="chevron-down" />
              </DropdownToggle>
              <DropdownMenu>
                <ul className="link-tidy no-bdr" style={{ maxHeight: "50vh", overflow: "auto" }}>
                  <li>
                    <div className="custom-control custom-control-sm custom-checkbox">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="all_columns"
                        name="All"
                        value="all"
                        checked={selectedColumns.length === cols.length}
                        onChange={(e) => handleSelectAll(e)}
                      />
                      <label className="custom-control-label" htmlFor="all_columns">
                        All
                      </label>
                    </div>
                  </li>
                  {cols.map((item, index) => (
                    <li key={index}>
                      <div className="custom-control custom-control-sm custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id={item.id}
                          name={item.name}
                          value={item.id}
                          checked={selectedColumns.some((kp) => kp.id === item.id)}
                          onChange={(e) => handleSelectedColumns(e)}
                        />
                        <label className="custom-control-label" htmlFor={item.id}>
                          {item.name}
                        </label>
                      </div>
                    </li>
                  ))}
                </ul>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </React.Fragment>
    );
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="p-2" style={{ marginLeft: "1.3rem" }}>
        <h6>Inventory Timeline</h6>

        {!isLoading ? (
          <>
            <div>
              <Row>
                <Col md="5" sm="12" xs="12">
                  <div
                    className={`d-flex justify-content-between ${!isMobile ? "" : "py-2"}`}
                    style={{ width: "15rem" }}
                  >
                    <div className="radios_2">
                      <Input
                        type="radio"
                        name="date_format"
                        id="daily"
                        value="daily"
                        checked={selectedDateFormat === "daily"}
                        onChange={(e) => {
                          onRadioSelect(e);
                        }}
                      />
                      <Label htmlFor="daily">Daily</Label>
                    </div>

                    <div className="radios_2">
                      <Input
                        type="radio"
                        name="date_format"
                        id="weekly"
                        value="weekly"
                        checked={selectedDateFormat === "weekly"}
                        onChange={(e) => {
                          onRadioSelect(e);
                        }}
                      />
                      <Label htmlFor="weekly">Weekly</Label>
                    </div>

                    <div className="radios_2">
                      <Input
                        type="radio"
                        name="date_format"
                        id="monthly"
                        value="monthly"
                        checked={selectedDateFormat === "monthly"}
                        onChange={(e) => {
                          onRadioSelect(e);
                        }}
                      />
                      <Label htmlFor="monthly">Monthly</Label>
                    </div>
                  </div>
                </Col>

                <Col md="7" sm="12" xs="12">
                  <div className={`d-flex align-items-center mt-1 ${!isMobile ? "pr-5" : ""}`}>
                    <img src={Calender} alt="calender-icon" style={{ height: "1.2rem" }} />
                    <p className="px-1 m-0" style={{ fontWeight: 500 }}>
                      Time Period :
                    </p>

                    <div className="form-control-wrap d-flex align-items-center" style={{ zIndex: "1000" }}>
                      <ReactDatePicker
                        selected={startDate}
                        maxDate={new Date()}
                        dateFormat={"yyyy-MM-dd"}
                        onChange={(e) => {
                          handleStartDate(e);
                        }}
                        className="form-control date-picker px-2 border border-1 border-primary"
                      />
                      <p className="px-2 m-0"> to </p>

                      <ReactDatePicker
                        selected={endDate}
                        minDate={new Date()}
                        dateFormat={"yyyy-MM-dd"}
                        onChange={(e) => {
                          handleEndDate(e);
                        }}
                        className="form-control date-picker px-2 border border-1 border-rounded-3 border-primary"
                      />
                    </div>
                  </div>
                </Col>
              </Row>
              <div className={`d-flex align-items-center justify-content-start mt-1`}>
                <ShowHideColumns cols={inventoryTimelineTableHeaders} />
              </div>
            </div>

            <div className="inventory_timeline_table">
              <DataTable
                fixedHeader
                responsive
                columns={tableColumns}
                data={selectedColumns.length > 0 ? tableData : []}
                customStyles={customStyles}
                noDataComponent={<div className="p-2">Please Select at least one column to display data</div>}
              />
            </div>
          </>
        ) : (
          <div className="d-flex justify-content-center mt-3" style={{ height: "3rem", width: "100%" }}>
            <Spinner color="primary" type="grow" />
          </div>
        )}
      </div>
    </>
  );
};

export default InventoryTimeLineTable;
