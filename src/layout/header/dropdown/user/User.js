import React, { useState } from "react";
import UserAvatar from "../../../../components/user/UserAvatar";
import { DropdownToggle, Dropdown, DropdownMenu } from "reactstrap";
import { Icon } from "../../../../components/Component";
import { LinkList } from "../../../../components/links/Links";
import { useNavigate } from "react-router";

const User = () => {
  const userData = localStorage.getItem("userDetails");
  let user = {};
  if (userData !== null) {
    user = userData && JSON.parse(userData);
    user.role = "Administrator";
  } else {
    user = {
      firstName: "Please",
      lastName: "log in first !",
      role: "",
      email: "",
    };
  }

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((prevState) => !prevState);

  const handleSignout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Dropdown isOpen={open} className="user-dropdown" toggle={toggle}>
      <DropdownToggle
        tag="a"
        href="#toggle"
        className="dropdown-toggle"
        onClick={(ev) => {
          ev.preventDefault();
        }}
      >
        <div className="user-toggle">
          <UserAvatar icon="user-alt" className="sm" />
          <div className="user-info d-none d-md-block">
            <div className="user-status">{user?.role}</div>
            {/* <div className="user-status">{user.role}</div> */}
            <div className="user-name dropdown-indicator">{`${user?.firstName} ${user?.lastName}`}</div>
          </div>
        </div>
      </DropdownToggle>
      <DropdownMenu end className="dropdown-menu-md dropdown-menu-s1">
        <div className="dropdown-inner user-card-wrap bg-lighter d-none d-md-block">
          <div className="user-card sm">
            <div className="user-avatar">
              {userData !== null ? (
                <span>{`${user?.firstName.charAt(0)}${user?.lastName.charAt(0)}`}</span>
              ) : (
                <span>!</span>
              )}
            </div>
            <div className="user-info">
              <span className="lead-text">{`${user?.firstName} ${user?.lastName}`}</span>
              <span className="sub-text">{user?.email}</span>
            </div>
          </div>
        </div>
        <div className="dropdown-inner">
          <LinkList>
            <span
              onClick={() => {
                handleSignout();
              }}
              style={{ cursor: "pointer" }}
            >
              <Icon name="signout"></Icon>
              <span>Log Out</span>
            </span>
          </LinkList>
        </div>
      </DropdownMenu>
    </Dropdown>
  );
};

export default User;
