import React, { useEffect, useState } from "react";
import Logo from "../../images/logo_inventory.svg";
import Head from "../../layout/head/Head";
import AuthFooter from "./AuthFooter";
import { Block, BlockContent, BlockDes, BlockHead, BlockTitle } from "../../components/Component";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import SuccessSvg from "../../images/illustrations/success.svg";

const Success = () => {
  const [mobileView, setMobileView] = useState(false);
  const viewChange = () => {
    if (window.innerWidth < 992) {
      setMobileView(true);
    } else {
      setMobileView(false);
    }
  };

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
      <Head title="Success" />
      <div className="d-flex justify-content-center align-items-center " style={{ height: "91vh" }}>
        <img src={SuccessSvg} alt="img" className={`w-35 mt-5 not_draggable ${mobileView ? "d-none" : ""}`} />
        <Block className="nk-block-middle nk-auth-body m-0">
          <div className="brand-logo pb-5">
            <img className="logo-dark logo-img logo-img-lg not_draggable" src={Logo} alt="logo-dark" />
          </div>
          <BlockHead>
            <BlockContent>
              <BlockTitle tag="h4">Great! You have successfully registered your account.</BlockTitle>
              <BlockDes className="text-success">
                <p>You can now sign in with your password</p>
                <Link to={`/login`}>
                  <Button
                    color="primary"
                    size="lg"
                    onClick={() => {
                      localStorage.removeItem("successfully_registered");
                    }}
                  >
                    Back to Login
                  </Button>
                </Link>
              </BlockDes>
            </BlockContent>
          </BlockHead>
        </Block>
      </div>
      <AuthFooter />
    </>
  );
};
export default Success;
