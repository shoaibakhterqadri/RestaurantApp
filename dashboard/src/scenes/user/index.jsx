import React, { useEffect, useState } from "react";
import Heading from "../../components/Heading";
import { FlexBetween } from "../../style/CommonClasses";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { AiOutlineSearch } from "react-icons/ai";

import { getApiMethod } from "../../state/Api";
const User = () => {
  const [tableListData, setTableListData] = useState([]);
  const [filters1, setFilters1] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    "country.name": {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    representative: { value: null, matchMode: FilterMatchMode.IN },
    status: {
      operator: FilterOperator.OR,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
  });
  const filtersMap = {
    filters1: { value: filters1, callback: setFilters1 },
  };
  const onGlobalFilterChange = (event, filtersKey) => {
    const value = event.target.value;
    let filters = { ...filtersMap[filtersKey].value };
    filters["global"].value = value;

    filtersMap[filtersKey].callback(filters);
  };
  const renderHeader = (filtersKey) => {
    const filters = filtersMap[`${filtersKey}`].value;
    const value = filters["global"] ? filters["global"].value : "";

    return (
      <span className="p-input-icon-left">
        <AiOutlineSearch fontSize={20} />
        <InputText
          type="search"
          value={value || ""}
          onChange={(e) => onGlobalFilterChange(e, filtersKey)}
          placeholder="Search Users"
        />
      </span>
    );
  };
  const header1 = renderHeader("filters1");

  const GeAllUsers = async () => {
    const { data, status } = await getApiMethod("/user/allUser");
    if (status === 200) {
      setTableListData(data);
    }
  };

  useEffect(() => {
    GeAllUsers();
  }, []);

  return (
    <div>
      <div className={`${FlexBetween}`}>
        <Heading>ALL USER</Heading>
      </div>
      <div className="table-card">
        <DataTable
          value={tableListData}
          styleClass="myTable"
          responsiveLayout="scroll"
          scrollable
          size="small"
          resizableColumns
          columnResizeMode="expand"
          header={header1}
          filters={filters1}
          onFilter={(e) => setFilters1(e.filters)}
          scrollHeight="430px"
          emptyMessage="No Users found."
          filterDisplay="menu"
          showGridlines
          className="my-2"
          paginator
          rows={6}
        >
          <Column
            field="name"
            header="User Name"
            style={{ justifyContent: "center" }}
            sortable
          ></Column>
          <Column
            field="email"
            header="User Email"
            style={{ justifyContent: "center" }}
            sortable
          ></Column>
          <Column
            field="_id"
            header="User ID"
            style={{ justifyContent: "center" }}
            sortable
          ></Column>
          <Column
            field="createdAt"
            header="Created On"
            style={{ justifyContent: "center" }}
            sortable
          ></Column>
        </DataTable>
      </div>
    </div>
  );
};

export default User;
