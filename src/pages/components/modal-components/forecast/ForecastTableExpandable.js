import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody, Spinner } from "reactstrap";
import { Icon } from "../../../../components/Component";
import BufferStockModalBody from "./BufferStockModalBody";
import WarehouseBufferStockModalBody from "./WarehouseBufferStockModalBody";
import SLeadModalBody from "./SLeadModalBody";
import PLeadModalBody from "./PLeadModalBody";
import ProductionFrequencyModalBody from "./ProductionFrequencyModalBody";
import InventoryTimeLineTable from "../../table/InventoryTimeLineTable";
import ShippingFrequencyModalBody from "./ShippingFrequencyModalBody";
import ForecastingDetailsComp from "../../table/ForecastingDetailsComp";
import axios from "axios";
import ForecastEditModalBody from "./ForecastEditModalBody";
import { ToastContainer, toast } from "react-toastify";

const ForecastTableExpandable = ({ isMobile, rowData }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const authToken = localStorage.getItem("authToken");

  const [tableDataManual, setTableDataManual] = useState([]);
  const [forecastDetails, setForecastDetails] = useState([]);
  const [tableDataCalculated, setTableDataCalculated] = useState([2, 4, 5]);
  const [showToast, setShowToast] = useState(false);
  const [selectedForecast, setSelectedForecast] = useState("calculated");

  const [isLoading, setIsLoading] = useState(true);
  const [callApi, setCallApi] = useState(true);

  // Forecast
  const [foreCastModal, setForeCastModal] = useState(false);
  const toggleForecastModal = () => {
    setForeCastModal(!foreCastModal);
  };

  // FBA Buffer
  const [fbaBufferModal, setFbaBufferModal] = useState(false);
  const [fbaBufferStockValue, setFbaBufferStockValue] = useState(null);
  const [selectedFbaBufferType, setSelectedFbaBufferType] = useState("");
  const toggleFbaBufferModal = (value) => {
    setFbaBufferStockValue(value);
    setFbaBufferModal(!fbaBufferModal);
  };
  // Warehouse Buffer
  const [warehouseBufferModal, setWarehouseBufferModal] = useState(false);
  const [warehouseBufferStockValue, setWarehouseBufferStockValue] = useState(null);
  const [selectedWarehouseBufferType, setSelectedWarehouseBufferType] = useState("days");
  const toggleWarehouseBufferModal = (value) => {
    setWarehouseBufferStockValue(value);
    setWarehouseBufferModal(!warehouseBufferModal);
  };

  // s_lead
  const [sLeadModal, setSLeadModal] = useState(false);
  const [sLeadTime, setSLeadTime] = useState(null);
  const toggleSLeadModal = (value) => {
    setSLeadTime(value);
    setSLeadModal(!sLeadModal);
  };

  // p_lead
  const [pLeadModal, setPLeadModal] = useState(false);
  const [pLeadTime, setPLeadTime] = useState(null);
  const togglePLeadModal = (value) => {
    setPLeadTime(value);
    setPLeadModal(!pLeadModal);
  };

  // production frequency
  const [prodFreqModal, setProdFreqModal] = useState(false);
  const [prodFrequency, setProdFrequency] = useState(null);
  const toggleProdFreqModal = (value) => {
    setProdFrequency(value);
    setProdFreqModal(!prodFreqModal);
  };

  // shipping frequency
  const [shipFreqModal, setShipFreqModal] = useState(false);
  const [shipFrequency, setShipFrequency] = useState(null);
  const toggleShipFreqModal = (value) => {
    setShipFrequency(value);
    setShipFreqModal(!shipFreqModal);
  };

  const handleDataModals = (name, value) => {
    if (name === "FBA Buffer stock") {
      toggleFbaBufferModal(value);
    } else if (name === "S. Lead time") {
      toggleSLeadModal(value);
    } else if (name === "P. Lead time") {
      togglePLeadModal(value);
    } else if (name === "Forecast") {
      toggleForecastModal();
    } else if (name === "Production frequency") {
      toggleProdFreqModal(value);
    } else if (name === "Shipping frequency") {
      toggleShipFreqModal(value);
    } else if (name === "Warehouse Buffer stock") {
      toggleWarehouseBufferModal(value);
    }
  };

  // Add forecast data API
  //   useEffect(() => {
  //     const authToken = localStorage.getItem("authToken");
  //     const data = {
  //       asin: rowData.asin,
  //       forecast: 10,
  //       bufferStock: 20,
  //       shippingFrequency: 30,
  //       productionFrequency: 40,
  //       shipLeadTime: 50,
  //       productionLeadTime: 60,
  //     };

  //     axios
  //       .post(`${apiUrl}/addForecastDetails`,data, {
  //         headers: {
  //           "authorization ": JSON.parse(authToken),
  //         },
  //       })
  //       .then((response) => {
  //         console.log(response);

  //         setIsLoading(false);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }, []);

  // Get forecast data API
  const getForecastDetails = async () => {
    setIsLoading(true);
    await axios
      .get(`${apiUrl}/getForecastDetails?asin=${rowData?.asin}`, {
        headers: {
          "authorization ": JSON.parse(authToken),
        },
      })
      .then((response) => {
        setForecastDetails(response?.data);
        setSelectedFbaBufferType(response?.data.bufferStockUnitMeasure);
        setSelectedWarehouseBufferType(response?.data.bufferStockUnitMeasure);
        setIsLoading(false);
        setCallApi(!callApi);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong!");
        setIsLoading(false);
      });
  };

  const updateForecastDetails = async (name, value, type) => {
    let data = {
      [name]: value,
      asin: rowData?.asin,
    };

    if (type) {
      data.bufferStockUnitMeasure = type;
    }

    await axios
      .post(`${apiUrl}/updateForecastDetails`, data, {
        headers: {
          "authorization ": JSON.parse(authToken),
        },
      })
      .then((res) => {
        getForecastDetails();
        toast.success(res?.data?.message);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong !");
      });
  };

  useEffect(() => {
    getForecastDetails();
  }, []);

  useEffect(() => {
    showToast && toast.success("Data Saved Successfully!");
  }, [tableDataManual, tableDataCalculated]);

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />

      {/* Modal for forecast Edit */}

      <Modal isOpen={foreCastModal} toggle={toggleForecastModal} fullscreen="sm">
        <ModalHeader
          toggle={toggleForecastModal}
          close={
            <button className="close" onClick={toggleForecastModal}>
              <Icon name="cross" />
            </button>
          }
        >
          Forecast (Edit)
        </ModalHeader>
        <ModalBody>
          <ForecastEditModalBody
            close={toggleForecastModal}
            tableDataManual={tableDataManual}
            setTableDataManual={setTableDataManual}
            tableDataCalculated={tableDataCalculated}
            setTableDataCalculated={setTableDataCalculated}
            setShowToast={setShowToast}
            asin={rowData?.asin}
            updateVal={updateForecastDetails}
            selectedForecast={selectedForecast}
            setSelectedForecast={setSelectedForecast}
          />
        </ModalBody>
      </Modal>

      {/* Modal for FBA Buffer Stock Edit */}

      <Modal isOpen={fbaBufferModal} toggle={toggleFbaBufferModal} style={{ overflow: "hidden" }}>
        <ModalHeader
          toggle={toggleFbaBufferModal}
          close={
            <button className="close" onClick={toggleFbaBufferModal}>
              <Icon name="cross" />
            </button>
          }
        >
          FBA Buffer Stock (Edit)
        </ModalHeader>
        <ModalBody>
          <BufferStockModalBody
            close={toggleFbaBufferModal}
            value={fbaBufferStockValue}
            updateValue={updateForecastDetails}
            selectedFbaBufferType={selectedFbaBufferType}
            setSelectedFbaBufferType={setSelectedFbaBufferType}
          />
        </ModalBody>
      </Modal>

      {/* Modal for Warehouse Buffer Stock Edit */}

      <Modal isOpen={warehouseBufferModal} toggle={toggleWarehouseBufferModal} style={{ overflow: "hidden" }}>
        <ModalHeader
          toggle={toggleWarehouseBufferModal}
          close={
            <button className="close" onClick={toggleWarehouseBufferModal}>
              <Icon name="cross" />
            </button>
          }
        >
          Warehouse Buffer Stock (Edit)
        </ModalHeader>
        <ModalBody>
          <WarehouseBufferStockModalBody
            close={toggleWarehouseBufferModal}
            value={warehouseBufferStockValue}
            updateValue={updateForecastDetails}
            selectedWarehouseBufferType={selectedWarehouseBufferType}
            setSelectedWarehouseBufferType={setSelectedWarehouseBufferType}
          />
        </ModalBody>
      </Modal>

      {/* Modal for Shipping Lead Edit */}

      <Modal isOpen={sLeadModal} toggle={toggleSLeadModal} style={{ overflow: "hidden" }}>
        <ModalHeader
          toggle={toggleSLeadModal}
          close={
            <button className="close" onClick={toggleSLeadModal}>
              <Icon name="cross" />
            </button>
          }
        >
          Shipping Lead Time (Edit)
        </ModalHeader>
        <ModalBody>
          <SLeadModalBody close={toggleSLeadModal} value={sLeadTime} updateValue={updateForecastDetails} />
        </ModalBody>
      </Modal>

      {/* Modal for Production Lead Edit */}

      <Modal isOpen={pLeadModal} toggle={togglePLeadModal} style={{ overflow: "hidden" }}>
        <ModalHeader
          toggle={togglePLeadModal}
          close={
            <button className="close" onClick={togglePLeadModal}>
              <Icon name="cross" />
            </button>
          }
        >
          Production Lead Time (Edit)
        </ModalHeader>
        <ModalBody>
          <PLeadModalBody close={togglePLeadModal} value={pLeadTime} updateValue={updateForecastDetails} />
        </ModalBody>
      </Modal>

      {/* Modal for Shipping Frequency Edit */}

      <Modal isOpen={shipFreqModal} toggle={toggleShipFreqModal} style={{ overflow: "hidden" }}>
        <ModalHeader
          toggle={toggleShipFreqModal}
          close={
            <button className="close" onClick={toggleShipFreqModal}>
              <Icon name="cross" />
            </button>
          }
        >
          Shipping Frequency (Edit)
        </ModalHeader>
        <ModalBody>
          <ShippingFrequencyModalBody
            close={toggleShipFreqModal}
            value={shipFrequency}
            updateValue={updateForecastDetails}
          />
        </ModalBody>
      </Modal>

      {/* Modal for Production Frequency Edit */}

      <Modal isOpen={prodFreqModal} toggle={toggleProdFreqModal} style={{ overflow: "hidden" }}>
        <ModalHeader
          toggle={toggleProdFreqModal}
          close={
            <button className="close" onClick={toggleProdFreqModal}>
              <Icon name="cross" />
            </button>
          }
        >
          Production Frequency (Edit)
        </ModalHeader>
        <ModalBody>
          <ProductionFrequencyModalBody
            close={toggleProdFreqModal}
            value={prodFrequency}
            updateValue={updateForecastDetails}
          />
        </ModalBody>
      </Modal>

      {!isLoading ? (
        <div style={{ maxWidth: "140vh", overflowX: "hidden" }}>
          {/* Forecast Details Table */}

          <ForecastingDetailsComp
            onEdit={handleDataModals}
            forecastDetails={forecastDetails}
            selectedFbaBufferType={selectedFbaBufferType}
            selectedWarehouseBufferType={selectedWarehouseBufferType}
          />

          {/* Inventory Timeline Table */}
        </div>
      ) : (
        <div
          className="d-flex justify-content-center align-items-center mt-3"
          style={{ height: "10rem", width: "70vw" }}
        >
          <Spinner type="grow" color="primary" />
        </div>
      )}
      <InventoryTimeLineTable
        selectedForecast={selectedForecast}
        isMobile={isMobile}
        apiUrl={apiUrl}
        authToken={authToken}
        asin={rowData?.asin}
        callApi={callApi}
      />
    </>
  );
};

export default ForecastTableExpandable;
