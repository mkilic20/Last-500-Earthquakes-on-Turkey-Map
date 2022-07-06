import React, {
  MouseEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useSortBy, useTable } from "react-table";
import { Earthquake } from "./interfaces/Earthquake";
import axios, { Axios, AxiosResponse } from "axios";
import "./App.css";

interface TableProps {
  data: Earthquake[];
  logMessage: (message: number) => void;
}

function Table(props: TableProps) {
  var data = props.data;

  type Data = Earthquake[];
  type SortKeys = Exclude<keyof Earthquake, "id">;
  type SortOrder = "ascn" | "desc";

  function sortData({
    tableData,
    sortKey,
    reverse,
  }: {
    tableData: Data;
    sortKey: SortKeys;
    reverse: boolean;
  }) {
    if (!sortKey) return tableData;

    const sortedData = data.sort((a, b) => {
      return a[sortKey] > b[sortKey] ? 1 : -1;
    });

    if (reverse) {
      return sortedData.reverse();
    }

    return sortedData;
  }
  function buttonImage(sortKey, columnKey, sortOrder) {
    if (sortKey === columnKey) {
      if (sortOrder === "ascn") {
        return "▲";
      } else return "▼";
    } else return "▶";
  }
  function SortButton({
    sortOrder,
    columnKey,
    sortKey,
    onClick,
  }: {
    sortOrder: SortOrder;
    columnKey: SortKeys;
    sortKey: SortKeys;
    onClick: MouseEventHandler<HTMLButtonElement>;
  }) {
    return (
      <button
        onClick={onClick}
        className={`${
          sortKey === columnKey && sortOrder === "desc"
            ? "sort-button sort-reverse"
            : "sort-button"
        }`}
      >
        {buttonImage(sortKey, columnKey, sortOrder)}
      </button>
    );
  }

  const [sortKey, setSortKey] = useState<SortKeys>("tarih");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const headers: { key: SortKeys; label: string }[] = [
    { key: "tarih", label: "Date" },
    { key: "saat", label: "Time" },
    { key: "enlem", label: "Latitude" },
    { key: "boylam", label: "Longitude" },
    { key: "derinlik", label: "Depth" },
    { key: "buyukluk", label: "Magnitude" },
    { key: "yer", label: "Place" },
    { key: "sehir", label: "City" },
  ];

  const sortedData = useCallback(
    () => sortData({ tableData: data, sortKey, reverse: sortOrder === "desc" }),
    [data, sortKey, sortOrder]
  );

  function changeSort(key: SortKeys) {
    setSortOrder(sortOrder === "ascn" ? "desc" : "ascn");

    setSortKey(key);
  }

  return (
    <table>
      <thead>
        <tr>
          {headers.map((row) => {
            return (
              <td key={row.key}>
                {row.label}{" "}
                <SortButton
                  columnKey={row.key}
                  onClick={() => changeSort(row.key)}
                  {...{
                    sortOrder,
                    sortKey,
                  }}
                />
              </td>
            );
          })}
        </tr>
      </thead>

      <tbody>
        {sortedData().map((person, key) => {
          return (
            <tr
              key={key}
              onClick={() => props.logMessage(person.id ? person.id : 0)}
            >
              <td>{person.tarih}</td>
              <td>{person.saat}</td>
              <td>{person.enlem}</td>
              <td>{person.boylam}</td>
              <td>{person.derinlik}</td>
              <td>{person.buyukluk}</td>
              <td>{person.yer}</td>
              <td>{person.sehir}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
