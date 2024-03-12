import React, { useEffect, useRef, useState } from "react";
import { Modal, ModalHeader, ModalBody, Button } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import { Block, PreviewCard, ReactDataTable, Icon } from "../../../components/Component";
import ModalForm from "../modal-components/ModalForm";
import { checkInput } from "../../../utils/Utils";

const ProductsDataTable = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const authToken = localStorage.getItem("authToken");

  const dataTableColumns = [
    {
      name: "Product",
      selector: (row) => row.productName,
      cell: (row) => (
        <img
          src={row.image}
          alt={`Profile of ${row.productName}`}
          style={{ width: "35px", height: "35px", mixBlendMode: "multiply" }}
        />
      ),
      sortable: true,
      width: "7rem",
      id: 1,
    },
    {
      name: "Name",
      selector: (row) => (row.customProductname ? row.customProductname : row.productName),
      sortable: true,
      width: "24rem",
      id: 2,
    },
    {
      name: "ASIN",
      selector: (row) => row.asin,
      sortable: true,
      width: "9rem",
      id: 3,
    },
    {
      name: "Inventory Level Outside Amazon",
      selector: (row) => row.outQuantity,
      sortable: true,
      width: "16rem",
      cell: (row) => (
        <span style={{ paddingLeft: "4.5rem" }}>{`${
          row.outQuantity !== null && row.outQuantity !== undefined
            ? `${parseInt(row.outQuantity)} ${row.outQuantity > 1 ? "Units" : "Unit"}`
            : "-- No Data --"
        }`}</span>
      ),
      id: 6,
    },
    {
      name: "",
      selector: (row) => row.actions,
      sortable: true,
      width: "6rem",
      cell: (row) => (
        <span
          onClick={() => {
            handleOptions(row);
          }}
        >
          <Button className="btn-dim" color="primary" size="sm">
            Edit
          </Button>
        </span>
      ),
      id: 7,
    },
  ];

  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [infoToEdit, setInfoToEdit] = useState({});

  const [modalForm, setModalForm] = useState(false);
  const toggleForm = () => {
    setModalForm(!modalForm);
  };

  const handleOptions = (row) => {
    setInfoToEdit({ ...row });
    toggleForm();
  };

  const ExpandableRowComponent = ({ data }) => {
    const spanRef = useRef(null);

    const handleCopyText = () => {
      try {
        const range = document.createRange();
        range.selectNode(spanRef.current);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand("copy");
        selection.removeAllRanges();
        toast.info("Text Copied !");
      } catch (err) {
        toast.error("Failed to copy text: ", err);
      }
    };

    return (
      <ul className="dtr-details p-2 border-bottom ms-1">
        <li className="d-block">
          <span className="dtr-title">Product :</span>{" "}
          <span className="dtr-data">
            <img
              src={data.image}
              alt={`Profile of ${data.productName}`}
              style={{ width: "50px", height: "50px", mixBlendMode: "multiply" }}
            />
          </span>
        </li>
        <li className="d-block">
          <span className="dtr-title ">Name :</span>{" "}
          <span className="dtr-data" ref={spanRef}>
            {data.customProductname ? data.customProductname : data.productName}
          </span>
          <Icon
            name="copy"
            style={{ cursor: "pointer" }}
            onClick={() => {
              handleCopyText();
            }}
          />
        </li>
        <li>
          <span className="dtr-title">ASIN :</span> <span className="dtr-data">{data.asin}</span>
        </li>
        <li>
          {/* <span className="dtr-title">SKU :</span>{" "} */}
          <span className="dtr-title">{data.matchedSku.length > 1 ? "SKUs :" : "SKU :"}</span>{" "}
          <span className="dtr-data">
            {/* {`${data.sku ? data.sku : "-- No data --"}`} */}
            <>
              {data?.matchedSku.length > 0 ? (
                <>
                  {data?.matchedSku.map((item, index) => {
                    return (
                      <span key={index}>
                        {item}
                        {index < data.matchedSku.length - 1 && ", "}
                      </span>
                    );
                  })}
                </>
              ) : (
                <>-- No data --</>
              )}
            </>
          </span>
        </li>
        <li>
          <span className="dtr-title">Inventory Level Outside Amazon :</span>{" "}
          <span className="dtr-data">{`${
            data.outQuantity !== null && data.outQuantity !== undefined
              ? `${parseInt(data.outQuantity)} ${data.outQuantity > 1 ? "Units" : "Unit"}`
              : "-- No Data --"
          }`}</span>
        </li>
      </ul>
    );
  };

  // Fetch Products List
  const fetchProducts = async () => {
    setIsLoading(true);
    await axios
      .get(`${apiUrl}/products`, {
        headers: {
          "authorization ": JSON.parse(authToken),
        },
      })
      .then((response) => {
        setTableData(response?.data?.result);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong!");
        setIsLoading(false);
      });
  };

  // Update Product Form Submission
  const formSubmit = (formData) => {
    const inputName = checkInput(formData?.productName);

    let data = {
      asin: infoToEdit?.asin,
      qty: Number(formData?.outQuantity),
      name: formData?.productName,
    };

    if (inputName !== null) {
      updateProduct(data);
    } else {
      toast.error("Please enter a valid name!");
    }
  };

  // Update Product's Name & Quantity
  const updateProduct = async (data) => {
    axios
      .post(`${apiUrl}/updateProduct`, data, {
        headers: {
          "authorization ": JSON.parse(authToken),
        },
      })
      .then((res) => {
        toast.success(res?.data?.result);
        toggleForm();
        fetchProducts();
      })
      .catch((err) => {
        toast.error(err?.response ? err?.response?.data?.message : err?.message);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <Head title="Products" />
      <ToastContainer position="top-center" autoClose={3000} />
      <Content page="component">
        <Modal isOpen={modalForm} toggle={toggleForm}>
          <ModalHeader
            toggle={toggleForm}
            close={
              <button className="close" onClick={toggleForm}>
                <Icon name="cross" />
              </button>
            }
          >
            Edit Product Info
          </ModalHeader>
          <ModalBody>
            <ModalForm infoToEdit={infoToEdit} formSubmit={formSubmit} />
          </ModalBody>
        </Modal>

        <Block size="lg">
          <PreviewCard>
            <ReactDataTable
              data={tableData}
              columns={dataTableColumns}
              loading={isLoading}
              expandableRows
              pagination
              actions
              selectableRows
              ExpandableRowComponent={ExpandableRowComponent}
            />
          </PreviewCard>
        </Block>
      </Content>
    </>
  );
};
export default ProductsDataTable;
