import React, { useState, useEffect } from "react";
import Navigation from "./Navigation";
import app from "./config";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";

import {
  getDatabase,
  ref,
  onValue,
  remove
} from "firebase/database";

function ListOrder() {
  const [listOrder, setListOrder] = useState([]);

  useEffect(() => {
    const db = getDatabase(app);
    const dbRef = ref(db, "menu/detailOrder");

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
      <h1 style={{margin:30}}>List Order</h1>
      <div className="row">
        <div className="table-responsive">
          <table className="table table-striped table-hover table-bordered">
            <thead>
              <tr>
                <th>Customer Id</th>
                <th>Customer Name</th>
                <th>Time</th>
                <th>Order</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {listOrder.map((customer) => (
                <tr key={customer.uuid}>
                  <td>{customer.uuid}</td>
                  <td style={{ fontWeight: "bold" }}>{customer.customerName}</td>
                  <td>{new Date(customer.timestamp).toLocaleTimeString()}</td>
                  <td>
                    <ul>
                      {customer.orders.map((order) => (
                        <li key={order.uuid}>
                          {`Name: ${order.name}`}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    <Button
                      style={{ height: 50, backgroundColor: "#a48d60", width: 100, border: "none" }}
                      onClick={() => handleDelete(customer)}
                    >
                      DONE
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default ListOrder;
