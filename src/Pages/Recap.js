import React, { useState, useEffect } from "react";
import Navigation from "./Navigation";
import app from "./config";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button, Col, Row, Container } from "react-bootstrap"; // Import komponen Card dan Button

import { getDatabase, ref, onValue, remove } from "firebase/database";
import ListCategory from "./ListCategory";

function Recap() {
  const [listOrder, setListOrder] = useState([]);
  const [totalSales, setTotalSales] = useState(0); // Menambahkan state untuk total penjualan

  useEffect(() => {
    const db = getDatabase(app);
    const dbRef = ref(db, "menu/recap");

    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Ubah objek data menjadi array dan urutkan berdasarkan waktu terbaru
        const ordersArray = Object.values(data).sort((a, b) => {
          // Ubah timestamp ke dalam format Date
          const timeA = new Date(a.timestamp);
          const timeB = new Date(b.timestamp);
          // Bandingkan waktu untuk mengurutkan
          return timeB - timeA;
        });

        // Menghitung total penjualan
        const total = ordersArray.reduce((acc, customer) => {
          return acc + customer.total;
        }, 0);

        setTotalSales(total); // Menyimpan total penjualan dalam state
        setListOrder(ordersArray);
      }
    });
  }, [app]);

  const handleDelete = (item) => {
    const db = getDatabase(app);
    remove(ref(db, `menu/recap/${item.uuid}`));
    alert("Deleted Succeed");
  };

  return (
    <>
      <Navigation />
      <div className="mt-3">
        <Container fluid>
          <Row>
            <ListCategory />
            <Col lg={10} md={7}>
            {" "}
              {/* Adjust the column layout */}
              <h5 style={{ textAlign: "left" }}>
                <strong>Recap Order</strong>
              </h5>
              <hr />
              <div className="row">
                <div className="table-responsive">
                  <table className="table table-striped table-hover table-bordered">
                    <thead>
                      <tr>
                        <th>Customer Name</th>
                        <th>Time</th>
                        <th>Order</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {listOrder && listOrder.length > 0 ? (
                        listOrder.map((customer) => (
                          <tr key={customer.uuid}>
                            {/* <td>{customer.uuid}</td> */}
                            <td style={{ fontWeight: "bold" }}>
                              {customer.customerName}
                            </td>
                            <td>
                              {new Date(
                                customer.timestamp
                              ).toLocaleTimeString()}
                            </td>
                            <td>
                              <ul>
                                {customer.orders &&
                                customer.orders.length > 0 ? (
                                  customer.orders.map((order) => (
                                    <li key={order.uuid}>
                                      {`Name: ${order.name}`}
                                    </li>
                                  ))
                                ) : (
                                  <li>No orders available.</li>
                                )}
                              </ul>
                            </td>
                            <td>{customer.total}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4">No orders available.</td>
                        </tr>
                      )}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td
                          colSpan="3"
                          style={{ textAlign: "right", fontWeight: "bold" }}
                        >
                          Total Sales:
                        </td>
                        <td>{totalSales}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Recap;
