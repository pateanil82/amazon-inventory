import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../images/logo_inventory.svg";
import Head from "../../layout/head/Head";
import AuthFooter from "./AuthFooter";
import { Block, BlockContent, BlockDes, BlockHead, BlockTitle, Icon, PreviewCard } from "../../components/Component";
import RegisterSvg from "../../images/illustrations/register.svg";
import { Spinner, Button } from "reactstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { validateEmail } from "../../utils/Utils";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Register = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    getValues,
  } = useForm();

  const [passState, setPassState] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [mobileView, setMobileView] = useState(false);

  const handleFormSubmit = () => {
    setLoading(true);

    var postData = getValues();
    setLoading(true);
    axios
      .post(`${apiUrl}/auth/register`, postData)
      .then((res) => {
        toast.success("Successfully Registered!");
        localStorage.setItem("successfully_registered", true);
        setTimeout(() => {
          setLoading(false);
          navigate("/success");
        }, 2000);
      })
      .catch((err) => {
        setTimeout(() => {
          toast.error(err?.response ? err?.response?.data?.message : err?.message);
          setLoading(false);
        }, 1000);
      });
  };

  const clearErrorsFunc = (name) => {
    if (name === "firstName") {
      clearErrors("firstName");
    } else if (name === "lastName") {
      clearErrors("lastName");
    } else if (name === "email") {
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
    if (inputName === "email") {
      if (validateEmail(inputValue)) {
        setEmailErr(false);
      } else {
        setEmailErr(true);
      }
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

  return (
    <>
      <Head title="Register" />
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="d-flex justify-content-evenly align-items-center" style={{ height: "91vh" }}>
        <img src={RegisterSvg} alt="img" className={`w-35 mt-5 not_draggable ${mobileView ? "d-none" : ""}`} />
        <Block className="nk-block-middle nk-auth-body m-0 wide-xs">
          <div className="brand-logo pb-4 text-center">
            <img className="logo-dark logo-img logo-img-lg not_draggable" src={Logo} alt="inventory-logo" />
          </div>
          <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
            <BlockHead>
              <BlockContent>
                <BlockTitle tag="h4">Register</BlockTitle>
                <BlockDes>
                  <p>Create New inventory Account</p>
                </BlockDes>
              </BlockContent>
            </BlockHead>
            <form className="is-alter" onSubmit={handleSubmit(handleFormSubmit)}>
              <div className="d-flex justify-content-between" style={{ gap: "1.5rem" }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="name">
                    First Name
                  </label>
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      id="firstName"
                      {...register("firstName", { required: true })}
                      placeholder="Enter your first name"
                      className="form-control-lg form-control"
                      onChange={(e) => {
                        handleInput(e);
                      }}
                    />
                    {errors.firstName && <p className="invalid">This field is required</p>}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="name">
                    Last Name
                  </label>
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      id="lastName"
                      {...register("lastName", { required: true })}
                      placeholder="Enter your last name"
                      className="form-control-lg form-control"
                      onChange={(e) => {
                        handleInput(e);
                      }}
                    />
                    {errors.lastName && <p className="invalid">This field is required</p>}
                  </div>
                </div>
              </div>

              <div className="form-group">
                <div className="form-label-group">
                  <label className="form-label" htmlFor="default-01">
                    Email
                  </label>
                </div>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    bssize="lg"
                    id="default-01"
                    {...register("email", { required: true })}
                    className="form-control-lg form-control"
                    placeholder="Enter your email address"
                    onChange={(e) => {
                      handleInput(e);
                    }}
                  />
                  {errors.email && <p className="invalid">This field is required</p>}
                  {emailErr && <p className="invalid">Please enter valid email</p>}
                </div>
              </div>

              <div className="form-group">
                <div className="form-label-group">
                  <label className="form-label" htmlFor="password">
                    Password
                  </label>
                </div>
                <div className="form-control-wrap">
                  <a
                    href="#password"
                    onClick={(ev) => {
                      ev.preventDefault();
                      setPassState(!passState);
                    }}
                    className={`form-icon lg form-icon-right passcode-switch ${passState ? "is-hidden" : "is-shown"}`}
                  >
                    <Icon name="eye" className="passcode-icon icon-show"></Icon>

                    <Icon name="eye-off" className="passcode-icon icon-hide"></Icon>
                  </a>
                  <input
                    type={passState ? "text" : "password"}
                    id="password"
                    {...register("password", { required: "This field is required" })}
                    placeholder="Enter your password"
                    className={`form-control-lg form-control ${passState ? "is-hidden" : "is-shown"}`}
                    onChange={(e) => {
                      handleInput(e);
                    }}
                  />
                  {errors.password && <span className="invalid">{errors.password.message}</span>}
                </div>
              </div>

              <div className="form-group">
                <Button type="submit" color="primary" size="lg" className="btn-block">
                  {loading ? <Spinner size="sm" color="light" /> : "Register"}
                </Button>
              </div>
            </form>
            <div className="form-note-s2 text-center pt-4">
              {" "}
              Already have an account?{" "}
              <Link to={`${process.env.PUBLIC_URL}/login`}>
                <strong>Log-in instead</strong>
              </Link>
            </div>
          </PreviewCard>
        </Block>
      </div>
      <AuthFooter />
    </>
  );
};
export default Register;
