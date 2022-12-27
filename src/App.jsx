import { Button, Popconfirm, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import './App.css'

export const App = () => {

  const [data, setData] = useState([])
  const [loader, setLoader] = useState(false)
  const [sortedInfo, setSortedInfo] = useState({});

  useEffect(
    ()=>{
      setLoader(true)
      loadData()
      setLoader(false)

    }
  ,[])



  const setIdSort = () => {
    setSortedInfo({
      order: 'descend',
      columnKey: 'id',
    });
  };


  const setDateSort = () => {
    setSortedInfo({
      order: 'descend',
      columnKey: 'orderDate',
    });
  };



  const handleDelete = (id) => {
    const newData = data.filter((item) => item.id !== id);
    console.log(id)
    setData(newData);
  };


  
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',

      sorter: (a, b) => a.id - b.id,
      sortOrder: sortedInfo.columnKey === 'id' ? sortedInfo.order : null,
      ellipsis: true,


    },
    {
      title: 'Customer ID',
      dataIndex: 'customerId',
      key: 'customerId',
    },

    {
      title: 'Order Date',
      dataIndex: 'orderDate',
      key: 'orderDate',
      sorter: (a,b) => new Date(a.orderDate) - new Date(b.orderDate),
      sortOrder: sortedInfo.columnKey === 'orderDate' ? sortedInfo.order : null,
      ellipsis: true,
    },

    {
      title: 'Ship Via',
      dataIndex: 'shipVia',
      key: 'shipVia',

      render: (_, item) =>
      data.length >= 1 ? (
        
        <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(item.id)}>
          <a>Delete</a>
        </Popconfirm>
      ) : null,

    },
  ];

  const loadData = async () =>{
    const response = await fetch('https://northwind.vercel.app/api/orders')
    const data = await response.json()
    setData(data)
    console.log(data)
  }


  return (
    <div className='App'>
      <Button onClick={setIdSort}>Sort ID</Button>
      <Button onClick={setDateSort}>Sort by Order Date</Button>
      <Table dataSource={data} columns={columns}/>;
       
    </div>
  )
}
