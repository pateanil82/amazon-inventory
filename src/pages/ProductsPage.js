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
import ProductsDataTable from "./components/table/ProductsDataTable";

const ProductsPage = () => {

  return (
    <React.Fragment>
      <Head title="Products"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page tag="h3">
                <Icon name='box' /> Products
              </BlockTitle>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>
        <ProductsDataTable />
      </Content>
    </React.Fragment>
  );
};

export default ProductsPage;
