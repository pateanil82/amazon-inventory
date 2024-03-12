import React, { useEffect, useState } from "react";
import { Form, Spinner, Button } from "reactstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Logo from "../../images/logo_inventory.svg";
import LoginSvg from "../../images/illustrations/login.svg";
import Head from "../../layout/head/Head";
import AuthFooter from "./AuthFooter";
import { Block, BlockContent, BlockHead, BlockTitle, Icon, PreviewCard } from "../../components/Component";
import { validateEmail } from "../../utils/Utils";

const Login = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [passState, setPassState] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [mobileView, setMobileView] = useState(false);

  const onFormSubmit = (formData) => {
    setLoading(true);

    if (emailErr) {
      setTimeout(() => {
        toast.error("Please Enter Valid Email Address!");
        setLoading(false);
      }, 1000);
    } else {
      axios
        .post(`${apiUrl}/auth/login`, formData)
        .then((res) => {
          localStorage.setItem("authToken", JSON.stringify(res?.data?.token));
          localStorage.setItem("userDetails", JSON.stringify(res?.data?.user));
          toast.success("Logged in successfully!!");
          setTimeout(() => {
            setLoading(false);
            navigate("/dashboard");
          }, 1500);
        })
        .catch((err) => {
          setTimeout(() => {
            toast.error(err?.response ? err?.response?.data?.error : err?.message);
            setLoading(false);
          }, 1000);
        });
    }
  };

  const handleInput = (e) => {
    clearErrors();
    const inputName = e.target.name;
    const inputValue = e.target.value;

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
      <Head title="Login" />
      <ToastContainer position="top-center" autoClose={3000} />

      <div className="d-flex justify-content-evenly align-items-center" style={{ height: "91vh" }}>
        <img src={LoginSvg} alt="img" className={`w-35 mt-5 not_draggable ${mobileView ? "d-none" : ""}`} />
        <Block className="nk-block-middle nk-auth-body m-0 wide-xs">
          <div className="brand-logo pb-4 text-center">
            <img className="logo-dark logo-img logo-img-lg not_draggable" src={Logo} alt="inventory-logo" />
          </div>

          <PreviewCard className="card-bordered card_bg" bodyClass="card-inner-lg">
            <BlockHead>
              <BlockContent>
                <BlockTitle tag="h4">Log-In</BlockTitle>
              </BlockContent>
            </BlockHead>
            <Form className="is-alter" onSubmit={handleSubmit(onFormSubmit)}>
              <div className="form-group">
                <div className="form-label-group">
                  <label className="form-label" htmlFor="default-01">
                    Email
                  </label>
                </div>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    id="default-01"
                    {...register("email", { required: "This field is required" })}
                    placeholder="Enter your email address"
                    className="form-control-lg form-control"
                    onChange={(e) => {
                      handleInput(e);
                    }}
                  />
                  {errors.email && <span className="invalid">{errors.email.message}</span>}
                  {emailErr && <span className="invalid">Please enter valid email</span>}
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
                    onClick={(e) => {
                      e.preventDefault();
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
                    placeholder="Enter your passcode"
                    className={`form-control-lg form-control ${passState ? "is-hidden" : "is-shown"}`}
                  />
                  {errors.password && <span className="invalid">{errors.password.message}</span>}
                </div>
              </div>
              <div className="form-group">
                <Button size="lg" className="btn-block" type="submit" color="primary">
                  {loading ? <Spinner size="sm" color="light" /> : "Log in"}
                </Button>
              </div>
              <div className="d-flex justify-content-center">
                <Link className="link link-primary" to={`/reset-password`}>
                  Forgot Password?
                </Link>
              </div>
            </Form>
            <div className="form-note-s2 text-center pt-4">
              New on our platform? <Link to={`${process.env.PUBLIC_URL}/register`}>Create an account</Link>
            </div>
          </PreviewCard>
        </Block>
      </div>
      <AuthFooter />
    </>
  );
};
export default Login;
