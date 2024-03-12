import React, { useState } from "react";
import { Button, Input, Label } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";

const BufferStockModalBody = ({ close, value = null, updateValue,selectedFbaBufferType, setSelectedFbaBufferType }) => {
  const [bufferStock, setBufferStock] = useState(value);

  const onRadioSelect = (e) => {
    setSelectedFbaBufferType(e.target.value);
  };

  const handleBufferStock = (e) => {
    const value = e.target.value;
    if (value.trim() !== "") {
      setBufferStock(Number(value));
    } else {
      setBufferStock(null);
    }
  };

  const handleSave = () => {
    if (bufferStock !== null) {
      updateValue("bufferStock", bufferStock, selectedFbaBufferType);
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
              checked={selectedFbaBufferType === "days"}
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
              checked={selectedFbaBufferType === "units"}
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
            placeholder={`Enter Buffer stock In ${selectedFbaBufferType === "in_days" ? "Days" : "Units"}`}
            onChange={(e) => {
              handleBufferStock(e);
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

export default BufferStockModalBody;
