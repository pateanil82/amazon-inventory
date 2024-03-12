import React, { useEffect, useState } from "react";
import "../style.scss";
import { Button, Input, Label } from "reactstrap";
import CalculatedForecastComp from "./forecast-edit-components/CalculatedForecastComp";
import ManualForecastComp from "./forecast-edit-components/ManualForecastComp";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { saveCalculatedForecastDays } from "../../../../services/api";

const ForecastEditModalBody = ({
  close,
  tableDataCalculated,
  asin,
  updateVal,
  selectedForecast,
  setSelectedForecast,
}) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const authToken = localStorage.getItem("authToken");

  const [calculatedForeCastData, setCalculatedForeCastData] = useState({});
  const [manualForeCastData, setManualForeCastData] = useState([]);
  const [manualDataToSave, setManualDataToSave] = useState([]);
  const [calculateDataToSave, setCalculatedDataToSave] = useState(null);
  const [isLoadingCalculated, setIsLoadingCalculated] = useState(true);
  const [isLoadingManual, setIsLoadingManual] = useState(true);
  const [selectedDays, setSelectedDays] = useState([]);

  const onRadioSelect = (e) => {
    setSelectedForecast(e.target.value);
  };

  const handleSave = () => {
    if (selectedForecast !== "calculated") {
      updateManualData(manualDataToSave);
    } else {
      updateVal("forecast", calculateDataToSave);
      saveCalculatedForecastDays(
        {
          asin: asin,
          config: selectedDays,
        },
        authToken
      ).then((res) => {});
      calculateDataToSave !== null ? close() : toast.error("Something went wrong!");
    }
  };

  // Calculated Forecast API
  const getCalculatedForecast = async () => {
    setIsLoadingCalculated(true);
    await axios
      .get(`${apiUrl}/forecastBenchmarks?asin=${asin}`, {
        headers: {
          "authorization ": JSON.parse(authToken),
        },
      })
      .then((response) => {
        setCalculatedForeCastData(response?.data);
        setIsLoadingCalculated(false);
        setSelectedDays(response?.data?.selectedForecastConfig);
      })
      .catch((err) => {
        console.log(err);
        setIsLoadingCalculated(false);
        toast.error("Something went wrong!");
      });
  };

  // Manual Forecast API
  const getManualForecast = async () => {
    setIsLoadingManual(true);
    await axios
      .get(`${apiUrl}/getManualForecast?asin=${asin}`, {
        headers: {
          "authorization ": JSON.parse(authToken),
        },
      })
      .then((response) => {
        setManualForeCastData(response?.data);
        setIsLoadingManual(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong!");
        setIsLoadingManual(false);
      });
  };

  // Add Manual Forecast Data
  const addManualData = async () => {
    const data = [
      {
        asin: asin,
        month: 1,
        year: 2024,
        inventoryForecast: 100,
      },
      {
        asin: asin,
        month: 2,
        year: 2024,
        inventoryForecast: 200,
      },
      {
        asin: asin,
        month: 3,
        year: 2024,
        inventoryForecast: 300,
      },
      {
        asin: asin,
        month: 4,
        year: 2024,
        inventoryForecast: 400,
      },
      {
        asin: asin,
        month: 5,
        year: 2024,
        inventoryForecast: 500,
      },
      {
        asin: asin,
        month: 6,
        year: 2024,
        inventoryForecast: 600,
      },
      {
        asin: asin,
        month: 7,
        year: 2024,
        inventoryForecast: 700,
      },
      {
        asin: asin,
        month: 8,
        year: 2024,
        inventoryForecast: 800,
      },
      {
        asin: asin,
        month: 9,
        year: 2024,
        inventoryForecast: 900,
      },
      {
        asin: asin,
        month: 10,
        year: 2024,
        inventoryForecast: 1000,
      },
      {
        asin: asin,
        month: 11,
        year: 2024,
        inventoryForecast: 1100,
      },
      {
        asin: asin,
        month: 12,
        year: 2024,
        inventoryForecast: 1200,
      },
    ];

    axios
      .post(`${apiUrl}/addManualForecast`, data, {
        headers: {
          "authorization ": JSON.parse(authToken),
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Update Manual Forecast Data
  const updateManualData = async (data) => {
    axios
      .post(`${apiUrl}/updateManualForecast?asin=${asin}`, data, {
        headers: {
          "authorization ": JSON.parse(authToken),
        },
      })
      .then((response) => {
        setManualDataToSave([]);
        setCalculatedDataToSave(null);
        toast.success(response?.data?.message);
        getManualForecast();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (selectedForecast !== "calculated") {
      getManualForecast();
    } else {
      getCalculatedForecast();
    }
  }, [selectedForecast]);

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="d-flex flex-column">
        {/* Calculated Forecast */}

        <div className="radios_">
          <Input
            type="radio"
            name="forecast"
            id="calculated"
            value="calculated"
            checked={selectedForecast === "calculated"}
            onChange={(e) => {
              onRadioSelect(e);
            }}
          />
          <Label htmlFor="calculated">Calculated Forecast</Label>
        </div>

        {selectedForecast === "calculated" && (
          <CalculatedForecastComp
            tableDataCalculated={tableDataCalculated}
            setCalculatedDataToSave={setCalculatedDataToSave}
            calculatedForeCastData={calculatedForeCastData}
            isLoading={isLoadingCalculated}
            selectedDays={selectedDays}
            setSelectedDays={setSelectedDays}
          />
        )}

        {/* Manual Forecast */}

        <div className="radios_">
          <Input
            type="radio"
            name="forecast"
            id="manual"
            value="manual"
            checked={selectedForecast === "manual"}
            onChange={(e) => {
              onRadioSelect(e);
            }}
          />
          <Label htmlFor="manual">Manual Forecast</Label>
        </div>

        {selectedForecast === "manual" && (
          <ManualForecastComp
            tableDataManual={manualForeCastData}
            setManualDataToSave={setManualDataToSave}
            isLoading={isLoadingManual}
            asin={asin}
          />
        )}
      </div>

      {/* Buttons */}

      <div className="form-group d-flex justify-content-end">
        <Button
          size="lg"
          className="btn"
          style={{ color: "black", background: "none", border: "none" }}
          onClick={close}
        >
          Cancel
        </Button>
        <Button
          size="lg"
          className="btn"
          type="submit"
          color="primary"
          onClick={() => {
            handleSave();
          }}
        >
          Save
        </Button>
      </div>
    </>
  );
};

export default ForecastEditModalBody;
