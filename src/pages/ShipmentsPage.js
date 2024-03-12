import React from "react";
import Content from "../layout/content/Content";
import Head from "../layout/head/Head";
import {
  BlockBetween,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
} from "../components/Component";

const ShipmentsPage = () => {

  return (
    <React.Fragment>
      <Head title="Shipments"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page tag="h3">
              <Icon name='truck' /> Shipments
              </BlockTitle>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>
      </Content>
    </React.Fragment>
  );
};

export default ShipmentsPage;
