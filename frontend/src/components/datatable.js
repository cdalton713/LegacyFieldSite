import React, {
  Component,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { Input, Checkbox, Grid } from "semantic-ui-react";
import { DeleteButton, DownloadButton } from "./common.js";
import DataTable from "react-data-table-component";
import PropTypes from "prop-types";

const FilterSearchBar = (props) => {
  // const [filterText, setFilterText] = useState("");

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Input
        placeholder="Search"
        icon="search"
        onChange={props.handleFilterSearchChange}
        style={{marginRight:'0.5rem'}}
      />
    </div>
  );
};

const DeleteSelectedButton = (props) => {
  return (
    <DeleteButton
      key="delete-btn"
      label={"Delete " + props.selectedRows.length + " Items"}
      style={{marginLeft: "0.5rem", marginRight:'0.5rem'}}
    />
  );
};

const DownloadSelectedButton = (props) => {
  return (
    <DownloadButton
      key="download-btn"
      label={"Download " + props.selectedRows.length + " Items"}
      style={{marginLeft: "0.5rem", marginRight:'0.5rem'}}
    />
  );
};
export const MyDataTable = (props) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [filteredData, setFilteredData] = useState(props.data.slice(0));

  const handleRowSelected = useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const handleFilterSearchChange = (e) => {
    setFilteredData(
      props.data.filter((item) => {
        let found = false;
        for (let key in props.columns) {
          if (
            props.columns.hasOwnProperty(key) &&
            props.columns[key].hasOwnProperty("searchable") &&
            props.columns[key].searchable === true
          ) {
            if (
              item[props.columns[key].selector] &&
              item[props.columns[key].selector]
                .toString()
                .toLowerCase()
                .includes(e.target.value.toString().toLowerCase())
            ) {
              found = true;
            }
          }
        }
        return found;
      })
    );
  };

  return (
    <div>
      <Grid relaxed={true}>
        <Grid.Row>
          <FilterSearchBar
            handleFilterSearchChange={handleFilterSearchChange}
          />
          {(props.downloadButton && selectedRows.length > 0) ? (
            <DownloadSelectedButton selectedRows={selectedRows} />
          ) : null}
          {(props.deleteButton && selectedRows.length > 0) ? (
            <DeleteSelectedButton selectedRows={selectedRows} />
          ) : null}
        </Grid.Row>
      </Grid>

      <DataTable
        title={props.title}
        columns={props.columns}
        data={filteredData}
        defaultSortField={props.title}
        selectableRows={props.selectableRows}
        selectableRowsNoSelectAll={props.noSelectAll}
        selectableRowsHighlight={props.selectableRowsHighlight}
        selectableRowsVisibleOnly={props.selectableRowsVisibleOnly}
        expandableRows={props.expandableRows}
        expandOnRowClicked={props.expandOnRowClick}
        pagination={props.pagination}
        highlightOnHover={props.highlight}
        striped={props.striped}
        pointerOnHover={props.pointer}
        dense={props.dense}
        noTableHead={props.tableHead}
        persistTableHead={props.persist}
        progressPending={props.loading}
        noHeader={props.noHeader}
        subHeader={props.subHeader}
        subHeaderAlign={props.subHeaderAlign}
        fixedHeader={props.fixedHeader}
        fixedHeaderScrollHeight="300px"
        direction={props.directionValue}
        selectableRowsComponent={Checkbox}
        onSelectedRowsChange={handleRowSelected}
        noContextMenu={props.noContextMenu}
        keyField={props.keyField}
      />
    </div>
  );
};

MyDataTable.defaultProps = {
  title: "Default Title",
  columns: [],
  selectableRows: false,
  noSelectAll: false,
  selectableRowsVisibleOnly: false,
  selectableRowsHighlight: false,
  expandableRows: false,
  expandOnRowClick: false,
  pagination: true,
  highlight: false,
  striped: false,
  pointer: false,
  dense: false,
  persist: false,
  tableHead: false,
  noContextMenu: false,
  loading: false,
  noHeader: false,
  subHeader: false,
  subHeaderAlign: "right",
  fixedHeader: false,
  direction: false,
  directionValue: "auto",
  actions: false,
  keyField: "id",
  deleteButton: false,
  downloadButton: false,
};
