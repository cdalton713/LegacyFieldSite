import React, { useEffect, useState, createContext } from "react";
import { useHistory } from "react-router-dom";
import {
  Container,
  Input,
  Menu,
  Loader,
  Grid,
  Dimmer,
  Segment,
} from "semantic-ui-react";
import { Link, useLocation, Switch, Route } from "react-router-dom";
import { MainContainer } from "./mainContainer";
import { useDispatch, useSelector } from "react-redux";
import { types } from "../reducers/types";
import { fetchSelectedJob, filterJobsToSelected } from "../actions/jobs_actions";

const SideBarSearch = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  if (props.isLoaded) {
    return (
      <Menu.Item>
        <Input placeholder={"Search Jobs..."} onChange={props.handleSearch} />
      </Menu.Item>
    );
  } else {
    return (
      <Menu.Item>
        <Grid textAlign={"center"} stretched={true}>
          <Loader inline active={true} style={{ marginTop: "3rem" }}>
            Loading
          </Loader>
        </Grid>
      </Menu.Item>
    );
  }
};

const ActiveJobsSidebar = (props) => {
  const darkMode = useSelector((state) => state.localSettings.darkMode);
  return (
    <Menu vertical style={{ marginTop: "1rem" }} inverted={darkMode}>
      <div>
        <SideBarSearch
          handleSearch={(e, data) => props.handleSearch(e, data.value)}
          isLoaded={props.isLoaded}
        />

        {props.filteredJobs.map((item) => (
          <Menu.Item
            key={item.job_id}
            name={item.job_id}
            job_num={item.job_num}
            active={props.activeItem === "home"}
            onClick={props.handleJobsSideBarClick}
          >
            <small>
              <b>{item.job_id}</b>
              <br />
              <span>{item.rig}</span>
              <br />
              <span>{item.well.well_name}</span>
            </small>
          </Menu.Item>
        ))}
      </div>
    </Menu>
  );
};

export const MainSideBar = (props) => {
  const [activeItem, setActiveItem] = "home";
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const [filteredJobs, setFilteredJobs] = useState(
    useSelector((state) => state.allJobs.data)
  );
  const allJobs = useSelector((state) => state.allJobs.data);
  const isLoaded = useSelector((state) => state.allJobs.loaded);
  const selectedJob = useSelector((state) => state.selectedJob.data);
  const history = useHistory();

  const handleSearch = (e, data) => {
    if (data.toString() === "") {
      setFilteredJobs(allJobs);
    } else {
      setFilteredJobs(
        allJobs.filter((obj) => {
          let found = false;
          Object.keys(obj).forEach((key) => {
            if (typeof obj[key] === "object") {
              if (
                Object.keys(obj[key]).forEach((key2) => {
                  key2
                    .toString()
                    .toLowerCase()
                    .includes(data.toString().toLowerCase());
                })
              ) {
                found = true;
              }
            } else {
              if (
                obj[key]
                  .toString()
                  .toLowerCase()
                  .includes(data.toString().toLowerCase())
              ) {
                found = true;
              }
            }
          });
          return found;
        })
      );
    }
  };

  const handleJobsSideBarClick = (e, data) => {
    dispatch(fetchSelectedJob(data, allJobs));
    history.push("/job/");
  };

  if (error) {
    return <div> Error: {error.message}</div>;
  } else {
    return (
      <Switch>
        <Route exact path={['/', '/settings']}>
          <Container className="container-top-padding">
            <MainContainer />
          </Container>
        </Route>
        <Route>
          <div className="with-sidebar">
            <div>
              <ChooseSideBar
                filteredJobs={filteredJobs}
                handleSearch={handleSearch}
                activeItem={activeItem}
                isLoaded={isLoaded}
                sideBarVisible={props.sideBarVisible}
                handleJobsSideBarClick={handleJobsSideBarClick}
              />
              <div style={{ marginTop: "0rem" }}>
                <Container className="container-top-padding">
                  <MainContainer />
                </Container>
              </div>
            </div>
          </div>
        </Route>
      </Switch>
    );
  }
};

const ChooseSideBar = (props) => {
  if (!props.sideBarVisible) {
    return <></>;
  } else if (props.isLoaded) {
    return (
      <ActiveJobsSidebar
        filteredJobs={props.filteredJobs}
        handleSearch={props.handleSearch}
        activeItem={props.activeItem}
        isLoaded={props.isLoaded}
        handleJobsSideBarClick={props.handleJobsSideBarClick}
      />
    );
  } else {
    return null;
  }
};
