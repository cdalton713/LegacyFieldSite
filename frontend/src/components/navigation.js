import React, { useState } from "react";
import { Dropdown, Menu, Button, Segment, Icon } from "semantic-ui-react";
import { ActiveJobsSidebar } from "./sidebars.js";
import { MainSideBar } from "./sidebars";
import { Link, useLocation, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { types } from "../reducers/types";
import { useHistory } from "react-router-dom";
import { fetchTheme } from "../actions/settings_actions";
import { authContext } from "../adalConfig";

const menuItems = [
  { id: "home", name: "Home", linkto: "/" },
  { id: "jobs", name: "Jobs", linkto: "/job" },
];

const AdminButtons = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleThemeClick = () => {
    dispatch(fetchTheme(props.darkMode));
  };

  return (
    <Menu.Menu position={"right"}>
      <Dropdown item icon={"setting"} floating>
        <Dropdown.Menu>
          <Dropdown.Item onClick={props.handleItemClick} linkto={"/settings"}>
            Settings
          </Dropdown.Item>
          <Dropdown.Item onClick={() => authContext.logOut()}>
            Log Out
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Menu.Item onClick={handleThemeClick}>
        <Icon name={"moon"} />
      </Menu.Item>
    </Menu.Menu>
  );
};
const JobNavBarMenus = (props) => {
  return (
    <div style={{ display: "flex" }}>
      {menuItems.map((item) => (
        <Menu.Item
          id={item.id}
          key={item.id}
          name={item.name}
          linkto={item.linkto}
          active={props.activeItem === item.id}
          onClick={props.handleItemClick}
        />
      ))}
    </div>
  );
};

export const NavBar = () => {
  const [activeItem, setActiveItem] = useState(0);
  const [sideBarVisible, setSideBarVisible] = useState(true);
  const darkMode = useSelector((state) => state.localSettings.darkMode);
  const history = useHistory();
  const handleItemClick = (e, data) => {
    setActiveItem(data.id);
    history.push(data.linkto);
  };

  const handleSideBarVisibleChange = (e, { value }) => {
    setSideBarVisible(!sideBarVisible);
  };
  return (
    <div style={{ background: darkMode ? "#262626" : "#ffffff" }}>
      <Menu className="no-margin" inverted={darkMode}>
        <Menu.Item onClick={handleSideBarVisibleChange}>
          <i className="sidebar icon" />
        </Menu.Item>
        <JobNavBarMenus handleItemClick={handleItemClick} />
        <AdminButtons darkMode={darkMode} handleItemClick={handleItemClick} />
      </Menu>

      <MainSideBar sideBarVisible={sideBarVisible} />
    </div>
  );
};
