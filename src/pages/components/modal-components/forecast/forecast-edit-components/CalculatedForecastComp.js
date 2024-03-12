import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Input, Label, Spinner } from "reactstrap";

const CalculatedForecastComp = ({
  setCalculatedDataToSave,
  calculatedForeCastData,
  isLoading,
  selectedDays,
  setSelectedDays,
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [calculationData, setCalculationData] = useState([]);

  const handleCheckboxChange = (id) => {
    setIsChecked(!isChecked);
    const index = selectedDays.indexOf(id);
    if (index < 0) {
      selectedDays.push(id);
    } else {
      selectedDays.splice(index, 1);
    }

    setSelectedDays([...selectedDays]);
  };

  const totalAvgCalc = () => {
    if (calculationData.length > 0) {
      const sum = calculationData.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
      const avg = Number(sum) / calculationData.length;
      setCalculatedDataToSave(avg.toFixed(2));

      return `${sum.toFixed(2)}/${calculationData.length} = ${avg.toFixed(2)}`;
    }

    return 0;
  };

  useEffect(() => {
    if (Object.keys(calculatedForeCastData).length !== 0) {
      const filteredArr = calculatedForeCastData?.forecast
        .filter((item) => selectedDays.includes(item.day))
        .map((item) => Number(item.sales));

      setCalculationData(filteredArr);
    }
  }, [selectedDays]);

  return (
    <>
      {!isLoading ? (
        <div
          className="
             d-flex
             flex-column
             flex-sm-column
             flex-md-column
             flex-lg-row"
        >
          {calculatedForeCastData?.forecast.map((data, index) => {
            return (
              <div key={index}>
                <Card
                  className={`forecast_checkbox_card ${selectedDays.includes(data.day) ? "" : "disabled_card"}`}
                  onClick={() => {
                    handleCheckboxChange(data.day);
                  }}
                >
                  <CardHeader className={`forecast_checkbox_card_header`}>
                    <Input
                      type="checkbox"
                      id={`checkbox_${index}`}
                      className={`card_checkbox ${isChecked ? "checked" : ""}`}
                      // checked
                      checked={selectedDays.includes(data.day)}
                    />{" "}
                    <Label htmlFor={`checkbox_${index}`}>{`${data.day} Days`}</Label>
                  </CardHeader>
                  <CardBody
                    // className={`forecast_checkbox_card_body `}
                    className={`forecast_checkbox_card_body  ${selectedDays.includes(data.day) ? "" : "disabled_card"}`}
                  >
                    {data?.sales.toFixed(2)}
                  </CardBody>
                </Card>
              </div>
            );
          })}

          <Card className="forecast_checkbox_card" style={{ minWidth: "10rem" }}>
            <CardHeader className="forecast_checkbox_card_header">
              <Label>Total Average</Label>
            </CardHeader>
            <CardBody className="forecast_checkbox_card_body">{totalAvgCalc()}</CardBody>
          </Card>
        </div>
      ) : (
        <div className="d-flex justify-content-center " style={{ height: "3rem", width: "100%" }}>
          <Spinner color="primary" type="grow" />
        </div>
      )}
    </>
  );
};

export default CalculatedForecastComp;
