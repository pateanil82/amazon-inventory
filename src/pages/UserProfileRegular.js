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

const UserProfileRegularPage = () => {

  return (
    <React.Fragment>
      <Head title="Profile"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page tag="h3">
              <Icon name='user' /> Profile
              </BlockTitle>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>
      </Content>
    </React.Fragment>
  );
};

export default UserProfileRegularPage;
