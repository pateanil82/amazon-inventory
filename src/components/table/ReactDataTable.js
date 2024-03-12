import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import exportFromJSON from "export-from-json";
import CopyToClipboard from "react-copy-to-clipboard";
import {
  Col,
  Modal,
  ModalBody,
  Row,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Spinner,
} from "reactstrap";
import { DataTablePagination } from "../Component";
import Select from "react-select";

const Export = ({ data }) => {
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (modal === true) {
      setTimeout(() => setModal(false), 2000);
    }
  }, [modal]);

  const fileName = "user-data";

  const exportCSV = () => {
    const exportType = exportFromJSON.types.csv;
    exportFromJSON({ data, fileName, exportType });
  };

  const exportExcel = () => {
    const exportType = exportFromJSON.types.xls;
    exportFromJSON({ data, fileName, exportType });
  };

  const copyToClipboard = () => {
    setModal(true);
  };

  return (
    <React.Fragment>
      <div className="dt-export-buttons d-flex align-center">
        <div className="dt-export-title d-none d-md-inline-block">Export :</div>
        <div className="dt-buttons btn-group flex-wrap">
          <CopyToClipboard text={JSON.stringify(data)}>
            <Button className="buttons-copy buttons-html5" onClick={() => copyToClipboard()}>
              <span>Copy</span>
            </Button>
          </CopyToClipboard>{" "}
          <button className="btn btn-secondary buttons-csv buttons-html5" type="button" onClick={() => exportCSV()}>
            <span>CSV</span>
          </button>{" "}
          <button className="btn btn-secondary buttons-excel buttons-html5" type="button" onClick={() => exportExcel()}>
            <span>Excel</span>
          </button>{" "}
        </div>
      </div>
      <Modal isOpen={modal} className="modal-dialog-centered text-center" size="sm">
        <ModalBody className="text-center m-2">
          <h5>Copied to clipboard</h5>
        </ModalBody>
        <div className="p-3 bg-light">
          <div className="text-center">Copied {data.length} rows to clipboard</div>
        </div>
      </Modal>
    </React.Fragment>
  );
};

// const ShowHideColumns = ({ data }) => {
//   const [selectedColumns, setSelectedColumns] = useState([]);

//   const options = data.map(item => ({ value: item.id, label: item.name }));

//   const handleSelectedColumns = (selectedOptions) => {
//     setSelectedColumns(selectedOptions.map(option => option.value));
//   };

//   return (
//     <div className="dt-export-buttons d-flex align-center">
//       <div className="dt-export-title d-none d-md-inline-block">Select Columns : </div>
//       <div className="dt-buttons btn-group flex-wrap">
//         <Select
//           isMulti
//           value={options.filter(option => selectedColumns.includes(option.value))}
//           options={options}
//           onChange={handleSelectedColumns}
//           placeholder="Not Selected"
//         />
//       </div>
//     </div>
//   );
// };

const ShowHideColumns = ({ cols }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState([]);

  const data = cols
    .map((item) => {
      if (item.name !== "Actions") {
        return item;
      }
      return null;
    })
    .filter(Boolean);

  useEffect(() => {
    const allCheckbox = document.getElementById("all_columns");
    if (allCheckbox) {
      allCheckbox.checked = selectedColumns.length === data.length;
    }

    data.forEach((item) => {
      const checkbox = document.getElementById(item.id.toString());
      if (checkbox) {
        checkbox.checked = selectedColumns.includes(item.id);
      }
    });
  }, [selectedColumns, data]);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const handleSelectedColumns = (e) => {
    const columnName = e.target.name;
    const columnId = e.target.value;

    if (columnName === "All") {
      if (e.target.checked) {
        // If "All" is checked, set all columns in the selectedColumns array
        setSelectedColumns(data.map((item) => item.id));
      } else {
        // If "All" is unchecked, clear the selectedColumns array
        setSelectedColumns([]);
      }
    } else {
      // If individual column is selected, toggle its presence in the array
      setSelectedColumns((prevSelectedColumns) => {
        if (prevSelectedColumns.includes(columnId)) {
          return prevSelectedColumns.filter((id) => id !== columnId);
        } else {
          return [...prevSelectedColumns, columnId];
        }
      });
    }
  };

  return (
    <React.Fragment>
      <div className="dt-export-buttons d-flex align-center">
        <div className="dt-export-title d-none d-md-inline-block">Select Columns : </div>
        <div className="dt-buttons btn-group flex-wrap">
          <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle className="btn-action" color="primary">
              <span>Select Rows</span>
            </DropdownToggle>
            <DropdownMenu>
              <ul className="link-tidy no-bdr">
                <li>
                  <div className="custom-control custom-control-sm custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="all_columns"
                      name="All"
                      value="all"
                      checked={selectedColumns.includes("on")}
                      onChange={(e) => handleSelectedColumns(e)}
                    />
                    <label className="custom-control-label" htmlFor="all_columns">
                      All
                    </label>
                  </div>
                </li>
                {data.map((item, index) => (
                  <li key={index}>
                    <div className="custom-control custom-control-sm custom-checkbox">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id={item.id}
                        // disabled={item.name === 'Actions'}
                        name={item.name}
                        value={item.id}
                        checked={selectedColumns.includes(item.id.toString())}
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

const CustomCheckbox = React.forwardRef(({ onClick, ...rest }, ref) => (
  <div className="custom-control custom-control-sm custom-checkbox notext">
    <input id={rest.name} type="checkbox" className="custom-control-input" ref={ref} onClick={onClick} {...rest} />
    <label className="custom-control-label" htmlFor={rest.name} />
  </div>
));

const ReactDataTable = ({
  data,
  columns,
  pagination,
  actions,
  className,
  selectableRows,
  expandableRows,
  ExpandableRowComponent,
  loading,
  isExportShow = false,
}) => {
  const [tableData, setTableData] = useState(data);
  const [searchText, setSearchText] = useState("");
  const [rowsPerPageS, setRowsPerPage] = useState(10);
  const [mobileView, setMobileView] = useState();

  useEffect(() => {
    let defaultData = tableData;
    if (searchText !== "") {
      defaultData = data.filter((item) => {
        return item && item.name.toLowerCase().includes(searchText.toLowerCase());
      });
      setTableData(defaultData);
    } else {
      setTableData(data);
    }
  }, [searchText]);

  // function to change the design view under 1200 px
  const viewChange = () => {
    if (window.innerWidth < 960 && expandableRows) {
      setMobileView(true);
    } else {
      setMobileView(false);
    }
  };

  useEffect(() => {
    window.addEventListener("load", viewChange);
    window.addEventListener("resize", viewChange);
    return () => {
      window.removeEventListener("resize", viewChange);
    };
  }, []);

  return (
    <div className={`dataTables_wrapper dt-bootstrap4 no-footer ${className ? className : ""}`}>
      {isExportShow && (
        <Row className={`justify-between g-2 ${actions ? "with-export" : ""}`}>
          {/* <Col className="col-7 text-start" sm="4">
          <div id="DataTables_Table_0_filter" className="dataTables_filter">
            <label>
              <input
                type="search"
                className="form-control form-control-sm"
                placeholder="Search by name"
                onChange={(ev) => setSearchText(ev.target.value)}
              />
            </label>
          </div>
        </Col> */}
          <Col></Col>
          <Col className="col-5 text-end" sm="8">
            <div className="datatable-filter">
              <div className="d-flex justify-content-end g-2">
                {/* <ShowHideColumns cols={columns} /> */}
                {actions && <Export data={data} />}
                {/* <div className="dataTables_length" id="DataTables_Table_0_length">
                  <label>
                    <span className="d-none d-sm-inline-block">Show</span>
                    <div className="form-control-select">
                      {" "}
                      <select
                        name="DataTables_Table_0_length"
                        className="custom-select custom-select-sm form-control form-control-sm"
                        onChange={(e) => setRowsPerPage(e.target.value)}
                        value={rowsPerPageS}
                      >
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="40">40</option>
                        <option value="50">50</option>
                      </select>{" "}
                    </div>
                  </label>
                </div> */}
              </div>
            </div>
          </Col>
        </Row>
      )}
      <DataTable
        data={data}
        progressPending={loading ? loading : false}
        progressComponent={<Spinner type="grow" color="primary" />}
        columns={columns}
        className={className}
        // selectableRows={selectableRows}
        // selectableRowsComponent={CustomCheckbox}
        expandableRowsComponent={ExpandableRowComponent}
        expandableRows={expandableRows}
        noDataComponent={<div className="p-2">There are no records found</div>}
        highlightOnHover
        expandOnRowClicked
        responsive
        sortIcon={
          <div>
            <span>&darr;</span>
            <span>&uarr;</span>
          </div>
        }
        pagination={pagination}
        paginationComponent={({ currentPage, rowsPerPage, rowCount, onChangePage, onChangeRowsPerPage }) => (
          <DataTablePagination
            customItemPerPage={rowsPerPageS}
            itemPerPage={rowsPerPage}
            totalItems={rowCount}
            paginate={onChangePage}
            currentPage={currentPage}
            onChangeRowsPerPage={onChangeRowsPerPage}
            setRowsPerPage={setRowsPerPage}
          />
        )}
      ></DataTable>
    </div>
  );
};

export default ReactDataTable;
