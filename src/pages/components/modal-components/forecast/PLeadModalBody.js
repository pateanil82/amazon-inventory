import React, { useState } from "react";
import { RSelect } from "../../../../components/Component";
import { Button } from "reactstrap";
import { dropdownDaysOptions } from "../../../../utils/Utils";

const PLeadModalBody = ({ close, value, updateValue }) => {
  const [selectedDay, setSelectedDay] = useState({ value: value, label: `${value} Days` });

  const handleDayChange = (data) => {
    setSelectedDay(data);
  };

  const handleSave = () => {
    updateValue("productionLeadTime", selectedDay.value);
    close();
  };
  return (
    <>
      <div>
        <p className="m-0">How much time it takes to ship the produce an order?</p>

        <div className=" py-2">
          <RSelect
            options={dropdownDaysOptions}
            value={selectedDay}
            placeholder="Select number of days"
            onChange={(e) => handleDayChange(e)}
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

export default PLeadModalBody;
