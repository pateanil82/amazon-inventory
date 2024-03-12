import React, { useState } from "react";
import { Icon } from "../../../components/Component";
import { Tooltip } from "reactstrap";
import { DataTableBody, DataTableHead, DataTableItem, DataTableRow } from "../../../components/table/DataTable";

const ForecastingDetailsComp = ({ onEdit, forecastDetails, selectedFbaBufferType, selectedWarehouseBufferType }) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);
  return (
    <>
      <div style={{ padding: "2rem", maxWidth: "80vh" }}>
        <div className="d-flex align-items-center py-2">
          <h5 className="m-0">Forecast details </h5>
          <Icon name="info" id="fore_var" className="px-1" />
          <Tooltip isOpen={tooltipOpen} placement="top" target="fore_var" toggle={toggle}>
            Here are the details for forecast variables. You can also modify them!
          </Tooltip>
        </div>

        <div>
          <DataTableBody className="border" bodyclass="nk-tb-orders">
            <DataTableHead>
              <DataTableRow>
                <span>Variables</span>
              </DataTableRow>
              <DataTableRow size="sm">
                <span>Value</span>
              </DataTableRow>
              <DataTableRow size="md">
                <span></span>
              </DataTableRow>
            </DataTableHead>

            {/* Forecast  */}
            <DataTableItem>
              <DataTableRow>
                <span className="tb-lead">Forecast</span>
              </DataTableRow>
              <DataTableRow>
                <span className="tb-lead">{`${forecastDetails?.forecast}/day`}</span>
              </DataTableRow>
              <DataTableRow>
                <Icon
                  name="pen-fill"
                  onClick={() => onEdit("Forecast", forecastDetails?.forecast)}
                  style={{ cursor: "pointer" }}
                />
              </DataTableRow>
            </DataTableItem>

            {/* FBA Buffer stock  */}
            <DataTableItem>
              <DataTableRow>
                <span className="tb-lead">FBA Buffer stock</span>
              </DataTableRow>
              <DataTableRow>
                <span className="tb-lead">{`${forecastDetails?.bufferStock} ${selectedFbaBufferType}`}</span>
              </DataTableRow>
              <DataTableRow>
                <Icon
                  name="pen-fill"
                  onClick={() => onEdit("FBA Buffer stock", forecastDetails?.bufferStock, forecastDetails?.bufferStock)}
                  style={{ cursor: "pointer" }}
                />
              </DataTableRow>
            </DataTableItem>

            {/* Warehouse Buffer stock  */}
            <DataTableItem>
              <DataTableRow>
                <span className="tb-lead">Warehouse Buffer stock</span>
              </DataTableRow>
              <DataTableRow>
                <span className="tb-lead">{`${forecastDetails?.bufferStock} ${selectedWarehouseBufferType}`}</span>
              </DataTableRow>
              <DataTableRow>
                <Icon
                  name="pen-fill"
                  onClick={() => onEdit("Warehouse Buffer stock", forecastDetails?.bufferStock, forecastDetails?.bufferStock)}
                  style={{ cursor: "pointer" }}
                />
              </DataTableRow>
            </DataTableItem>

            {/* Shipping frequency  */}
            <DataTableItem>
              <DataTableRow>
                <span className="tb-lead">Shipping frequency</span>
              </DataTableRow>
              <DataTableRow>
                <span className="tb-lead">{`${forecastDetails?.shippingFrequency} days`}</span>
              </DataTableRow>
              <DataTableRow>
                <Icon
                  name="pen-fill"
                  onClick={() => onEdit("Shipping frequency", forecastDetails?.shippingFrequency)}
                  style={{ cursor: "pointer" }}
                />
              </DataTableRow>
            </DataTableItem>

            {/* Production frequency  */}
            <DataTableItem>
              <DataTableRow>
                <span className="tb-lead">Production frequency</span>
              </DataTableRow>
              <DataTableRow>
                <span className="tb-lead">{`${forecastDetails?.productionFrequency} days`}</span>
              </DataTableRow>
              <DataTableRow>
                <Icon
                  name="pen-fill"
                  onClick={() => onEdit("Production frequency", forecastDetails?.productionFrequency)}
                  style={{ cursor: "pointer" }}
                />
              </DataTableRow>
            </DataTableItem>

            {/* S. Lead time  */}
            <DataTableItem>
              <DataTableRow>
                <span className="tb-lead">S. Lead time</span>
              </DataTableRow>
              <DataTableRow>
                <span className="tb-lead">{`${forecastDetails?.shipLeadTime} days`}</span>
              </DataTableRow>
              <DataTableRow>
                <Icon
                  name="pen-fill"
                  onClick={() => onEdit("S. Lead time", forecastDetails?.shipLeadTime)}
                  style={{ cursor: "pointer" }}
                />
              </DataTableRow>
            </DataTableItem>

            {/* P. Lead time  */}
            <DataTableItem>
              <DataTableRow>
                <span className="tb-lead">P. Lead time</span>
              </DataTableRow>
              <DataTableRow>
                <span className="tb-lead">{`${forecastDetails?.productionLeadTime} days`}</span>
              </DataTableRow>
              <DataTableRow>
                <Icon
                  name="pen-fill"
                  onClick={() => onEdit("P. Lead time", forecastDetails?.productionLeadTime)}
                  style={{ cursor: "pointer" }}
                />
              </DataTableRow>
            </DataTableItem>
          </DataTableBody>
        </div>
      </div>
    </>
  );
};

export default ForecastingDetailsComp;
