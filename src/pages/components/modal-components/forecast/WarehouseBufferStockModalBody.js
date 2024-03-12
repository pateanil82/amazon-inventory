import React, { useState } from "react";
import { Button, Input, Label } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";

const WarehouseBufferStockModalBody = ({
  close,
  value = null,
  updateValue,
  selectedWarehouseBufferType,
  setSelectedWarehouseBufferType,
}) => {
  const [warehouseBufferStock, setWarehouseBufferStock] = useState(value);

  const onRadioSelect = (e) => {
    setSelectedWarehouseBufferType(e.target.value);
  };

  const handleWarehouseBufferStock = (e) => {
    const value = e.target.value;
    if (value.trim() !== "") {
      setWarehouseBufferStock(Number(value));
    } else {
      setWarehouseBufferStock(null);
    }
  };

  const handleSave = () => {
    if (warehouseBufferStock !== null) {
      updateValue("warehouseBufferStock", warehouseBufferStock);
      close();
    } else {
      toast.error("Cannot update blank data!");
    }
  };
  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <div>
        <div className="d-flex justify-content-between" style={{ width: "10rem" }}>
          <div className="radios_2">
            <Input
              type="radio"
              name="buffer"
              id="days"
              value="days"
              checked={selectedWarehouseBufferType === "days"}
              onChange={(e) => {
                onRadioSelect(e);
              }}
            />
            <Label htmlFor="days">In Days</Label>
          </div>

          <div className="radios_2">
            <Input
              type="radio"
              name="buffer"
              id="units"
              value="units"
              checked={selectedWarehouseBufferType === "units"}
              onChange={(e) => {
                onRadioSelect(e);
              }}
            />
            <Label htmlFor="units">In Units</Label>
          </div>
        </div>

        <div className="py-3">
          <Label>FBA Buffer stock</Label>
          <Input
            type="number"
            defaultValue={value}
            placeholder={`Enter Buffer stock In ${selectedWarehouseBufferType === "days" ? "Days" : "Units"}`}
            onChange={(e) => {
              handleWarehouseBufferStock(e);
            }}
          />
        </div>

        <div className="form-group d-flex justify-content-end">
          <Button
            size="md"
            className="btn"
            style={{ color: "black", background: "none", border: "none" }}
            onClick={close}
          >
            Cancel
          </Button>
          <Button
            size="md"
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
      </div>
    </>
  );
};

export default WarehouseBufferStockModalBody;
