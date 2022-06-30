import React,{useMemo} from 'react'
import { useSortBy, useTable } from 'react-table'
import JsonData from './data/earthquake.json'

function Table() {

/*
  type TData = {
    tarih: string,
    saat: string,
    enlem: string,
    boylam: string,
    derinlik: string,
    buyukluk: string,
    yer: string,
  }
  const data: TData[] = JsonData;
*/
  var data = JsonData 
  const columns = React.useMemo(
    () => [
      {
        Header: 'DATE',
        accessor: "tarih", 
      },
      {
        Header: 'TIME',
        accessor: 'saat',
      },
      {
        Header: 'LATITUDE',
        accessor: 'enlem',
      },
      {
        Header: 'LONGITUDE',
        accessor: 'boylam',
      },
      {
        Header: 'DEPTH',
        accessor: 'derinlik',
      },
      {
        Header: 'MAGNITUDE',
        accessor: 'buyukluk',
      },
      {
        Header: 'PLACE',
        accessor: "yer",
      },
      {
        Header: 'CITY',
        accessor: "sehir",
      },
    ],
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    // @ts-ignore
  } = useTable({columns, data })

  return (
    <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th
                {...column.getHeaderProps()}
                style={{
                  borderBottom: 'solid 3px red',
                  background: 'aliceblue',
                  color: 'black',
                  fontWeight: 'bold',
                }}
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      padding: '10px',
                      border: 'solid 1px gray',
                      background: 'papayawhip',
                    }}
                  >
                    {cell.render('Cell')}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
export default Table