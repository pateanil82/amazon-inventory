import React, { useEffect, useState } from "react";
import "./styles/accounts.scss";
import axios from "axios";
import { Card, CardBody, CardHeader, Col, Row, Spinner } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import Content from "../layout/content/Content";
import Head from "../layout/head/Head";
import {
  BlockBetween,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Button,
  Icon,
  PreviewCard,
} from "../components/Component";
import { OverlineTitle } from "../components/text/Text";
import AmazonLogsTable from "./components/table/AmazonLogsTable";
import { getMarketPlaces, saveActivities } from "../services/api";

const AccountsPage = () => {
  const apiUrl = process.env.REACT_APP_API_URL; // Base Url
  const authToken = localStorage.getItem("authToken");

  const [isLoading, setIsLoading] = useState(true); // Page Loading

  const [marketPlacesData, setMarketPlacesData] = useState([]); // Market Places

  // Region Connection
  const [connectionNA, setConnectionNA] = useState(false);
  const [connectionEU, setConnectionEU] = useState(false);

  // Region Redirection Loading
  const [isLoadingNA, setIsLoadingNA] = useState(false);
  const [isLoadingEU, setIsLoadingEU] = useState(false);

  // Region Redirection Link
  const [appLinkNA, setAppLinkNA] = useState("");
  const [appLinkEU, setAppLinkEU] = useState("");

  // Connection Handle Function
  const handleConnect = (region) => {
    if (region === "NA") {
      if (connectionNA === false) {
        setIsLoadingNA(!isLoadingNA);
        window.location.href = appLinkNA;
        // toast.info("Connected to North America!");
      } else {
        setConnectionNA(false);
        // toast.error("Disconnected from North America!");
      }
    } else {
      if (connectionEU === false) {
        setIsLoadingEU(!isLoadingEU);
        window.location.href = appLinkEU;
        // toast.info("Connected to Europe!");
      } else {
        setConnectionEU(false);
        // toast.error("Disconnected from Europe!");
      }
    }
  };

  // Marketplaces Toggle
  const handleMarketPlaces = (index) => {
    const updatedMarketPlaces = [...marketPlacesData];
    updatedMarketPlaces[index].isActive = !updatedMarketPlaces[index].isActive;

    let data = {
      marketplace: updatedMarketPlaces[index].countryCode,
      status: updatedMarketPlaces[index].isActive === true ? "Active" : "Inactive",
    };

    saveActivities(data, authToken)
      .then((res) => {
        toast.success(res.message);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err);
      });

    setMarketPlacesData(updatedMarketPlaces);
  };

  // API Call for Marketplaces
  useEffect(() => {
    getMarketPlaces(authToken)
      .then((response) => {
        console.log(response);
        setMarketPlacesData(response?.result);

        // Set App links
        response?.result?.map((marketPlace) => {
          if (marketPlace.countryName === "US") {
            setAppLinkNA(marketPlace.appLink);
          } else if (marketPlace.countryName === "UK") {
            setAppLinkEU(marketPlace.appLink);
          }
        });

        let isNAConnected = response?.result?.some((obj) => obj.region === "na" && obj.isActive === true);
        setConnectionNA(isNAConnected);
        // isNAConnected && toast.info("Connected to North America!");

        let isEUConnected = response?.result?.some((obj) => obj.region === "eu" && obj.isActive === true);
        setConnectionEU(isEUConnected);
        // isEUConnected && toast.info("Connected to Europe!");

        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        toast.error("Something went wrong!");
      });
  }, []);

  return (
    <React.Fragment>
      <Head title="Forecasting"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page tag="h3">
                <Icon name="toolbar" /> Accounts
              </BlockTitle>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

        <ToastContainer position="top-center" autoClose={3000} />

        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
            <Spinner type="grow" color="primary" />
          </div>
        ) : (
          <>
            {/* Connection Cards */}

            <PreviewCard>
              <Row>
                {/* North America Region Card  */}

                <Col md="6">
                  <Card outline color="light" className="connect_region_card_container">
                    <CardHeader className="connect_region_card_header">
                      <p className="pt-1 my-0">North America Region</p>
                      {!connectionNA ? (
                        <Button
                          color="primary"
                          onClick={() => {
                            handleConnect("NA");
                          }}
                        >
                          <span className="mr-3" style={{ minWidth: "7.7rem", maxHeight: "1rem" }}>
                            <OverlineTitle className="text-white">
                              {!isLoadingNA ? <>Connect Region</> : <Spinner color="white" size="sm" />}
                            </OverlineTitle>
                          </span>
                          <Icon name="arrow-right" />
                        </Button>
                      ) : (
                        <Button
                          color="danger"
                          onClick={() => {
                            handleConnect("NA");
                          }}
                        >
                          <span className="mr-3">
                            <OverlineTitle className="text-white">Disconnect</OverlineTitle>
                          </span>{" "}
                          <Icon name="arrow-right" />
                        </Button>
                      )}
                    </CardHeader>

                    <CardBody>
                      {!connectionNA ? (
                        <span style={{ color: "#f0b80c", letterSpacing: "1px" }}>
                          <Icon name="cross" />
                          <span className="mr-3">Not connected yet</span>
                        </span>
                      ) : (
                        <>
                          <span style={{ color: "#20e4ac", letterSpacing: "1px" }}>
                            <Icon name="check-thick" />
                            <span className="mr-3">Connected</span>
                          </span>

                          <div className="mt-2">
                            <OverlineTitle className="text-capitalize">Marketplaces :</OverlineTitle>
                            <div className="d-flex flex-row">
                              <Row>
                                {marketPlacesData.map((code, index) => {
                                  return (
                                    <>
                                      {code.region === "na" && (
                                        <Col xs="4" md="4" sm="3" key={index}>
                                          <div className="d-flex mt-2" style={{ cursor: "pointer" }}>
                                            <p key={index} className="px-2">
                                              {code.countryCode}
                                            </p>
                                            <div className="custom-control custom-switch">
                                              <input
                                                type="checkbox"
                                                checked={code.isActive}
                                                className="custom-control-input"
                                                id={`${code.countryName}_${index}`}
                                                onChange={(e) => {
                                                  handleMarketPlaces(index);
                                                }}
                                              />
                                              <label
                                                className="custom-control-label"
                                                htmlFor={`${code.countryName}_${index}`}
                                              ></label>
                                            </div>
                                          </div>
                                        </Col>
                                      )}
                                    </>
                                  );
                                })}
                              </Row>
                            </div>
                          </div>
                        </>
                      )}
                    </CardBody>
                  </Card>
                </Col>

                {/* Europe  Region Card  */}

                <Col md="6">
                  <Card outline color="light" className="connect_region_card_container">
                    <CardHeader className="connect_region_card_header">
                      <p className="pt-1 my-0">Europe Region</p>
                      {!connectionEU ? (
                        <Button
                          color="primary"
                          onClick={() => {
                            handleConnect("EU");
                          }}
                        >
                          <span className="mr-3" style={{ minWidth: "7.7rem", maxHeight: "1rem" }}>
                            <OverlineTitle className="text-white">
                              {!isLoadingEU ? <>Connect Region</> : <Spinner color="white" size="sm" />}
                            </OverlineTitle>
                          </span>
                          <Icon name="arrow-right" />
                        </Button>
                      ) : (
                        <Button
                          color="danger"
                          onClick={() => {
                            handleConnect("EU");
                          }}
                        >
                          <span className="mr-3">
                            <OverlineTitle className="text-white">Disconnect</OverlineTitle>
                          </span>{" "}
                          <Icon name="arrow-right" />
                        </Button>
                      )}
                    </CardHeader>

                    <CardBody>
                      {!connectionEU ? (
                        <span style={{ color: "#f0b80c", letterSpacing: "1px" }}>
                          <Icon name="cross" />
                          <span className="mr-3">Not connected yet</span>
                        </span>
                      ) : (
                        <>
                          <span style={{ color: "#20e4ac", letterSpacing: "1px" }}>
                            <Icon name="check-thick" />
                            <span className="mr-3">Connected</span>
                          </span>
                          <div className="mt-2">
                            <OverlineTitle className="text-capitalize">Marketplaces :</OverlineTitle>
                            <div className="d-flex flex-row">
                              <Row>
                                {marketPlacesData.map((code, index) => {
                                  return (
                                    <>
                                      {code.region === "eu" && (
                                        <Col xs="4" md="4" sm="3" key={index}>
                                          <div className="d-flex mt-2" style={{ cursor: "pointer" }}>
                                            <p key={index} className="px-2">
                                              {code.countryName === "UK" ? code.countryName : code.countryCode}
                                            </p>
                                            <div className="custom-control custom-switch">
                                              <input
                                                type="checkbox"
                                                className="custom-control-input"
                                                checked={code.isActive}
                                                id={`${code.countryName}_${index}`}
                                                onChange={(e) => {
                                                  handleMarketPlaces(index);
                                                }}
                                              />
                                              <label
                                                className="custom-control-label"
                                                htmlFor={`${code.countryName}_${index}`}
                                              ></label>
                                            </div>
                                          </div>
                                        </Col>
                                      )}
                                    </>
                                  );
                                })}
                              </Row>
                            </div>
                          </div>
                        </>
                      )}
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </PreviewCard>

            {/* Amazon Logs  */}
            <PreviewCard>
              <AmazonLogsTable />
            </PreviewCard>
          </>
        )}
      </Content>
    </React.Fragment>
  );
};

export default AccountsPage;
