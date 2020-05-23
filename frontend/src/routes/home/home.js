import React, { useState, useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Header,
  Icon,
  Image,
  Menu,
  Container,
  Sidebar,
  Button,
  Grid,
  Dimmer,
  Loader,
  Card,
  Divider,
  Segment,
} from "semantic-ui-react";
import { MyDataTable } from "../../components/datatable.js";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSelectedJob } from "../../actions/jobs_actions";

export const Home = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const allJobs = useSelector((state) => state.allJobs.data || []);
  const darkMode = useSelector((state) => state.localSettings.darkMode);
  const handleRowClick = (data) => {
    dispatch(fetchSelectedJob(data, allJobs));
    history.push("/job");
  };

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const response = await fetch("/api/v1/jobs/details/active");
  //       const json = await response.json();
  //       setIsLoaded(true);
  //       setAllJobs(json.data);
  //     } catch (err) {
  //       setIsLoaded(true);
  //       setError(err);
  //     }
  //   }
  //   fetchData();
  // }, []);
  return (
    <div className="container-all-padding">
      <Grid
        stackable
        columns={1}
        centered
        textAlign="center"
        inverted={darkMode}
      >
        <Grid.Row>
          <Grid.Column>
            <Divider horizontal inverted={darkMode}>
              All Jobs
            </Divider>
            <Segment padded={isLoaded ? false : "very"}>
              {allJobs.length > 0 ? (
                <MyDataTable
                  data={allJobs}
                  noHeader={true}
                  dense={true}
                  columns={columns}
                  title=""
                  selectableRows={false}
                  selectableRowsHighlight={false}
                  subHeader={false}
                  subHeaderAlign={"right"}
                  keyField={"job_num"}
                  striped={true}
                  pagination={false}
                  highlight={true}
                  onRowClicked={handleRowClick}
                />
              ) : (
                <Grid textAlign={"center"}>
                  <Loader inline active={true}>
                    Loading
                  </Loader>
                </Grid>
              )}
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

const columns = [
  {
    name: "Job Number",
    selector: "job_num",
    sortable: true,
    compact: true,
    searchable: true,
    omit: true,
  },
  {
    name: "Job ID",
    selector: "job_id",
    sortable: true,
    compact: true,
    searchable: true,
    // cell: (row) => <Link to={"/job/" + row.job_id}>{row.job_id}</Link>,
  },
  {
    name: "Well Name",
    selector: "well.well_name",
    sortable: true,
    compact: true,
    searchable: true,
  },
  {
    name: "Operator",
    selector: "operator",
    sortable: true,
    compact: true,
    searchable: true,
  },
  {
    name: "Rig",
    selector: "rig",
    sortable: true,
    compact: true,
    searchable: true,
  },
];
