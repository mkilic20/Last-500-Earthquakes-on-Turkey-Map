import React,{MouseEventHandler, useCallback, useEffect, useMemo, useState} from 'react'
import { useSortBy, useTable } from 'react-table'
import { Earthquake } from './interfaces/Earthquake'
import axios, {Axios, AxiosResponse} from 'axios'
import './App.css'



function Table() {

  const[data, setdata] = useState<Earthquake[]>([])
  useEffect( () =>{
    axios
    .get('http://localhost:3010/api')
    .then((response: AxiosResponse) => {
      //console.log(response.data)
      setdata(response.data)
    })
  },[])
  
  type Data = typeof data;
  type SortKeys = keyof Data[0];
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
        ▲
      </button>
    );
  }

  const [sortKey, setSortKey] = useState<SortKeys>("tarih");
  const [sortOrder, setSortOrder] = useState<SortOrder>("ascn");

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
              <td key={row.key} >
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
        {sortedData().map((person,key) => {
          return (
            <tr key={key} onClick={()=>{console.log(key)}} >
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


export default Table