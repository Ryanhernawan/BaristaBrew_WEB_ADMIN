import React, { useState, useEffect } from "react";
import Navigation from "./Navigation";
import app from "./config";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button, Col, Row, Container } from "react-bootstrap"; // Import komponen Card dan Button
import Hasil from "./Hasil";

import { getDatabase, ref, onValue, remove } from "firebase/database";
import Kasir from "./Kasir";
import ListCategory from "./ListCategory";

function ListOrder() {
  const [listOrder, setListOrder] = useState([]);

  useEffect(() => {
    const db = getDatabase(app);
    const dbRef = ref(db, "menu/detailOrder");

    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Convert the data object into an array and sort it by timestamp
        const ordersArray = Object.values(data).sort((a, b) => {
          const timeA = new Date(a.timestamp);
          const timeB = new Date(b.timestamp);
          return timeB - timeA;
        });
        setListOrder(ordersArray);
      }
    });
  }, [app]);

  const handleDelete = (item) => {
    const db = getDatabase(app);

    remove(ref(db, `menu/detailOrder/${item.uuid}`));
    alert("Deleted Succeed");
  };

  return (
    <>
      <Navigation />
      <div className="mt-3">
      <Container fluid>
          <Row>
          <ListCategory />
          <Col lg={10} md={12}>
              {" "}
              {/* Adjust the column layout */}
              <h5 style={{ textAlign: "left" }}>
                <strong>List Order</strong>
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
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {listOrder && listOrder.length > 0 ? (
                  listOrder.map((customer) => (
                    <tr key={customer.uuid}>
                      <td style={{ fontWeight: "bold" }}>
                        {customer.customerName}
                      </td>
                      <td>
                        {new Date(customer.timestamp).toLocaleTimeString()}
                      </td>
                      <td>
                        <ul>
                          {customer.orders && customer.orders.length > 0 ? (
                            customer.orders.map((order) => (
                              <li key={order.uuid}>{`${order.name}`}</li>
                            ))
                          ) : (
                            <li>No orders available.</li>
                          )}
                        </ul>
                      </td>
                      <td>
                        <Button
                          style={{
                            height: 50,
                            backgroundColor: "#a48d60",
                            width: 100,
                            border: "none",
                          }}
                          onClick={() => handleDelete(customer)}
                        >
                          DONE
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No orders available.</td>
                  </tr>
                )}
              </tbody>
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

export default ListOrder;
