import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import { Block, Icon, PreviewCard, ReactDataTable } from "../../../components/Component";
import ForecastTableExpandable from "../modal-components/forecast/ForecastTableExpandable";
import ForecastNotificationsModalBody from "../modal-components/forecast/ForecastNotificationsModalBody";
import { Modal, ModalHeader, ModalBody, Button } from "reactstrap";
import axios from "axios";
import moment from "moment";

const ForecastingDataTable = ({ toggleForm }) => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const [mobileView, setMobileView] = useState();
  const [notificationsData, setNotificationsData] = useState([]);
  const [notificationsModal, setNotificationsModal] = useState(false);

  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const toggleNotificationsModal = () => {
    setNotificationsModal(!notificationsModal);
  };
  const dataTableColumns = [
    {
      name: "Product",
      selector: (row) => row.product,
      cell: (row) => product(row),
      sortable: true,
      width: "10rem",
      id: 1,
    },
    {
      name: "Days Until S.O",
      selector: (row) => row.daysUntilSO,
      sortable: true,
      width: "10rem",
      cell: (row) => <span>{`${row.daysUntilSO} ${row.daysUntilSO > 1 ? "Days" : "Day"}`}</span>,
      id: 2,
    },
    {
      name: "Notifications",
      selector: (row) => row.notifications,
      sortable: false,
      cell: (row) => (mobileView ? notificationBadgeMobile(row.notifications) : notificationBadge(row.notifications)),
      id: 3,
    },
  ];

  const product = (data) => {
    return (
      <div className="p-3">
        <img
          src={data.image}
          alt={data.productName}
          style={{ width: "35px", height: "35px", mixBlendMode: "multiply" }}
        />
        <p style={{ maxWidth: "7rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {data.customProductname ? data.customProductname : data.productName}
        </p>
      </div>
    );
  };

  // function to change the design view under 1200 px
  const viewChange = () => {
    if (window.innerWidth < 992) {
      setMobileView(true);
    } else {
      setMobileView(false);
    }
  };

  const notificationBadge = (arr) => {
    return (
      <>
        <div className="d-flex">
          {arr.map((data, index) => {
            return (
              <div
                key={index}
                className={`px-3 py-2 ${data.type !== "ship" ? "bg-primary" : "bg-success"}`}
                style={{ width: "12rem", borderRadius: "7px", color: "white", marginRight: "1rem", fontSize: "13px" }}
              >
                <span>
                  {`${data.type !== "ship" ? "Reorder" : "Ship"}`} By <b>{moment(data.date).format('MMM DD yyyy')}</b>
                </span>
                <p className="pt-1">
                  Quantity <b>{data.units}</b> Units
                </p>
              </div>
            );
          })}
        </div>
      </>
    );
  };

  const notificationBadgeMobile = (arr) => {
    setNotificationsData(arr);
    return (
      <Button onClick={toggleNotificationsModal} size="sm" className="btn-dim" color="primary">
        View
      </Button>
    );
  };

  const ExpandableRowComponent = ({ data }) => {
    return <ForecastTableExpandable toggleForm={toggleForm} isMobile={mobileView} rowData={data} />;
  };

  // API Call
  const getProducts = async () => {
    const authToken = localStorage.getItem("authToken");
    await axios
      .get(`${apiUrl}/forecastGeneralSpecifications`, {
        headers: {
          "authorization ": JSON.parse(authToken),
        },
      })
      .then((response) => {
        const modifiedProducts = response?.data?.result.map((activity) => ({
          ...activity,
          days_until: 110,
          notifications: [
            { type: "reorder", date: activity?.reorder?.date, units: activity?.reorder?.quantity },
            { type: "ship",  date: activity?.ship?.date, units: activity?.ship?.quantity },
          ],
        }));
        setTableData(modifiedProducts);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong!");
        setTableData([]);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getProducts();
  }, []);

  // Viewport handle
  useEffect(() => {
    viewChange();
    window.addEventListener("load", viewChange);
    window.addEventListener("resize", viewChange);
    return () => {
      window.removeEventListener("resize", viewChange);
    };
  }, []);

  return (
    <>
      <Head title="Products" />
      <ToastContainer position="top-center" autoClose={3000} />
      <Content page="component">
        {/* Modal for Notifications in Mobile View */}
        <Modal isOpen={notificationsModal} toggle={toggleNotificationsModal}>
          <ModalHeader
            toggle={toggleNotificationsModal}
            close={
              <button className="close" onClick={toggleNotificationsModal}>
                <Icon name="cross" />
              </button>
            }
          >
            Notifications
          </ModalHeader>
          <ModalBody>
            <ForecastNotificationsModalBody close={toggleNotificationsModal} notifications={notificationsData} />
          </ModalBody>
        </Modal>

        <Block size="lg">
          <PreviewCard>
            <ReactDataTable
              data={tableData}
              columns={dataTableColumns}
              expandableRows
              pagination
              actions
              selectableRows
              ExpandableRowComponent={ExpandableRowComponent}
              loading={isLoading}
            />
          </PreviewCard>
        </Block>
      </Content>
    </>
  );
};
export default ForecastingDataTable;
