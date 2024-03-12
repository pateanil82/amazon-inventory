import React, { useEffect, useState } from "react";
import Logo from "../../images/logo_inventory.svg";
import Head from "../../layout/head/Head";
import AuthFooter from "./AuthFooter";
import { Block, BlockContent, BlockDes, BlockHead, BlockTitle, PreviewCard } from "../../components/Component";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { validateEmail } from "../../utils/Utils";
import { Button } from "reactstrap";
import ForgotSvg from "../../images/illustrations/forgot_password.svg";

const ForgotPassword = () => {
  const [emailErr, setEmailErr] = useState(false);
  const [mobileView, setMobileView] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm();
  const navigate = useNavigate();

  const clearErrorsFunc = (name) => {
    if (name === "email") {
      clearErrors("email");
    } else if (name === "password") {
      clearErrors("password");
    } else {
      clearErrors();
    }
  };

  const handleInput = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    clearErrorsFunc(inputName);
    if (validateEmail(inputValue)) {
      setEmailErr(false);
    } else {
      setEmailErr(true);
    }
  };

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

  const handleFormSubmit = () => {
    setTimeout(() => {
      navigate(`/login`);
    }, 1000);
  };
  return (
    <>
      <Head title="Forgot-Password" />
      <div className="d-flex justify-content-evenly align-items-center" style={{ height: "91vh" }}>
        <img src={ForgotSvg} alt="img" className={`w-35 mt-5 not_draggable ${mobileView ? "d-none" : ""}`} />
        <Block className="nk-block-middle nk-auth-body m-0 wide-xs">
          <div className="brand-logo pb-4 text-center">
            <img className="logo-dark logo-img logo-img-lg not_draggable" src={Logo} alt="inventory-logo" />
          </div>
          <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
            <BlockHead>
              <BlockContent>
                <BlockTitle tag="h5">Reset password</BlockTitle>
                <BlockDes>
                  <p>If you forgot your password, well, then we’ll email you instructions to reset your password.</p>
                </BlockDes>
              </BlockContent>
            </BlockHead>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <div className="form-group">
                <div className="form-label-group">
                  <label className="form-label" htmlFor="default-01">
                    Email
                  </label>
                </div>
                <input
                  type="text"
                  bssize="lg"
                  id="default-01"
                  {...register("email", { required: "This field is required" })}
                  className="form-control-lg form-control"
                  placeholder="Enter your email address"
                  onChange={(e) => {
                    handleInput(e);
                  }}
                />
                {errors.email && <p className="invalid">{errors.email.message}</p>}
                {emailErr && <p className="invalid">Please enter valid email</p>}
              </div>
              <div className="form-group">
                <Button size="lg" className="btn-block" type="submit" color="primary">
                  Send Reset Link
                </Button>
              </div>
            </form>
            <div className="form-note-s2 text-center pt-4">
              <Link to={`/login`}>
                <strong>Return to login</strong>
              </Link>
            </div>
          </PreviewCard>
        </Block>
      </div>
      <AuthFooter />
    </>
  );
};
export default ForgotPassword;
