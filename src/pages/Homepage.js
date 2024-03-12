import React from "react";
import Head from "../layout/head/Head";
import Content from "../layout/content/Content";
import {
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  BlockBetween,
  Icon,
} from "../components/Component";

const Homepage = () => {
  return (
    <>
      <Head title="Dashboard"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page tag="h3">
              <Icon name='home' /> Dashboard
              </BlockTitle>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>
      </Content>
    </>
  );
};
export default Homepage;
