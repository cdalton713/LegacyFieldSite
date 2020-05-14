import React, { Component, useState, useMemo, useCallback, useEffect } from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { Input, Checkbox, Grid } from "semantic-ui-react";
import { DeleteButton, DownloadButton } from "./common.js";
import DataTable from "react-data-table-component";
import PropTypes from "prop-types";

export const MyDataTable = (props) => {
  const [data, setData] = useState(props.data);
  const [selectedRows, setSelectedRows] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [filteredData, setFilteredData] = useState(data.slice(0));

  const FilterSearchBar = () => {
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <Input
          placeholder="Search"
          icon="search"
          onChange={handleFilterSearchChange}
        />
      </div>
    );
  };

  const handleRowSelected = useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const subHeaderItems = () => {
      let btns = [];
      if (selectedRows.length > 0) {
          btns.push(<DownloadButton label={'Download ' + selectedRows.length + ' Items'}/>, <DeleteButton label={'Delete ' + selectedRows.length + ' Items'}/>)
      }
        btns.push(<FilterSearchBar />)
    return btns;
  }


  const handleFilterSearchChange = (e) => {
    setFilteredData(
      data.filter((item) => {
        let found = false;
        for (let key in props.columns) {
          if (
            props.columns[key].hasOwnProperty("searchable") &&
            props.columns[key].searchable == true
          ) {
            if (
              item[props.columns[key].selector] &&
              item[props.columns[key].selector]
                .toLowerCase()
                .includes(e.target.value.toLowerCase())
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
    <DataTable
      title={props.title}
      columns={props.columns}
      data={filteredData}
      defaultSortField="props.title"
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
      subHeaderComponent={subHeaderItems()}
      subHeaderAlign={props.subHeaderAlign}
      fixedHeader={props.fixedHeader}
      fixedHeaderScrollHeight="300px"
      direction={props.directionValue}
      selectableRowsComponent={Checkbox}
      onSelectedRowsChange={handleRowSelected}
      noContextMenu={props.noContextMenu}
    />
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
  noContextMenu: true
};
