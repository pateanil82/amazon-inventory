import React from "react";
import Content from "../layout/content/Content";
import Head from "../layout/head/Head";
import { BlockBetween, BlockHead, BlockHeadContent, BlockTitle, Icon } from "../components/Component";
import ForecastingDataTable from "./components/table/ForecastingDataTable";
import "./styles/forecasting.scss";

const ForecastingPage = () => {
  return (
    <React.Fragment>
      <Head title="Forecasting"></Head>
      <Content>
        {/* Header for page  */}

        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page tag="h3">
                <Icon name="meter" /> Forecasting
              </BlockTitle>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

        {/* Data Table */}

        <ForecastingDataTable />
      </Content>
    </React.Fragment>
  );
};

export default ForecastingPage;
