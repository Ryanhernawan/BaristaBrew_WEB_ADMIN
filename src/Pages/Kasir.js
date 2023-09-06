import React, { useState } from "react";
import Navigation from "./Navigation";
import app from "./config";
import { uid } from "uid";
import {
  getDatabase,
  ref,
  onValue,
  push,
  set,
  remove,
  update,
} from "firebase/database";
import QR from "../assets/qris_page-0001.jpg";

function Kasir() {
  const [showImage, setShowImage] = useState(false);

  const [customerName, setCustomerName] = useState("");
  const [selectedMenuItem, setSelectedMenuItem] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [orders, setOrders] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const menuItems = [
    { name: "Kopi Hitam", price: 5000 },
    { name: "Cappuccino", price: 7000 },
    { name: "Espresso", price: 4000 },
  ];

  const foods = [
    { name: "Nasi Goreng", price: 15000 },
    { name: "Mie Goreng", price: 12000 },
    { name: "Bakso", price: 10000 },
  ];

  const additionalItems = [
    { name: "Kopi", price: 2000 },
    { name: "Susu", price: 3000 },
    { name: "Gula", price: 1000 },
  ];

  const additionalItems2 = [
    { name: "Pandan Syrup", price: 2000 },
    { name: "Vanila Syrup", price: 3000 },
    { name: "Palm Sugar Syrup", price: 1000 },
  ];

  const [selectedAdditionalItem, setSelectedAdditionalItem] = useState("");
  const [additionalItemPrice, setAdditionalItemPrice] = useState(0);

  const [selectedAdditionalItem2, setSelectedAdditionalItem2] = useState("");
  const [additionalItemPrice2, setAdditionalItemPrice2] = useState(0);

  const handleMenuItemChange = (event) => {
    const selectedItemName = event.target.value;
    const selectedItem = menuItems.find(
      (item) => item.name === selectedItemName
    );
    if (selectedItem) {
      setSelectedMenuItem(selectedItem.name);
      setItemPrice(selectedItem.price);
    } else {
      setSelectedMenuItem("");
      setItemPrice("");
    }
  };

  const [selectedFood, setSelectedFood] = useState("");
  const [foodPrice, setFoodPrice] = useState(0);

  const handleFoodChange = (event) => {
    const selectedFoodName = event.target.value;
    const selectedFoodItem = foods.find(
      (food) => food.name === selectedFoodName
    );
    if (selectedFoodItem) {
      setSelectedFood(selectedFoodItem.name);
      setFoodPrice(selectedFoodItem.price);
    } else {
      setSelectedFood("");
      setFoodPrice(0);
    }
  };

  const handleAdditionalItemChange = (event) => {
    const selectedAdditionalItemName = event.target.value;
    const selectedAdditionalItem = additionalItems.find(
      (item) => item.name === selectedAdditionalItemName
    );
    if (selectedAdditionalItem) {
      setSelectedAdditionalItem(selectedAdditionalItem.name);
      setAdditionalItemPrice(selectedAdditionalItem.price);
    } else {
      setSelectedAdditionalItem("");
      setAdditionalItemPrice(0);
    }
  };

  const handleAdditionalItemChange2 = (event) => {
    const selectedAdditionalItemName = event.target.value;
    const selectedAdditionalItem = additionalItems2.find(
      (item) => item.name === selectedAdditionalItemName
    );
    if (selectedAdditionalItem) {
      setSelectedAdditionalItem2(selectedAdditionalItem.name);
      setAdditionalItemPrice2(selectedAdditionalItem.price);
    } else {
      setSelectedAdditionalItem2("");
      setAdditionalItemPrice2(0);
    }
  };

  const handleAddOrder = () => {
    if (selectedMenuItem && itemPrice) {
      // Membuat pesanan baru dengan item tambahan
      const newOrder = {
        name:
          selectedMenuItem +
          (selectedAdditionalItem
            ? ` + ${selectedAdditionalItem} + ${selectedAdditionalItem2}`
            : ""),
        price: itemPrice + additionalItemPrice + additionalItemPrice2,
      };
      // Menambahkan pesanan baru ke daftar pesanan yang sudah ada
      setOrders([...orders, newOrder]);
      // Mereset selectedMenuItem dan itemPrice
      setSelectedMenuItem("");
      setItemPrice("");
      //   setCustomerName("");
      // Mereset item tambahan dan harganya
      setSelectedAdditionalItem("");
      setAdditionalItemPrice(0);
      setSelectedAdditionalItem2("");
      setAdditionalItemPrice2(0);
      // Mereset total harga menjadi 0
      setTotalPrice(0);
    }
    if (selectedFood && foodPrice) {
      // Membuat pesanan baru dengan item tambahan
      const newOrder = {
        name:
          selectedFood +
          (selectedAdditionalItem
            ? ` + ${selectedAdditionalItem} + ${selectedAdditionalItem2}`
            : ""),
        price: foodPrice + additionalItemPrice + additionalItemPrice2,
      };
      // Menambahkan pesanan baru ke daftar pesanan yang sudah ada
      setOrders([...orders, newOrder]);
      // Mereset selectedMenuItem dan itemPrice
      setSelectedFood("");
      setFoodPrice("");
      //   setCustomerName("");
      // Mereset item tambahan dan harganya
      setSelectedAdditionalItem("");
      setAdditionalItemPrice(0);
      setSelectedAdditionalItem2("");
      setAdditionalItemPrice2(0);
      // Mereset total harga menjadi 0
      setTotalPrice(0);
    }
  };

  const handleRemoveOrder = (index) => {
    const updatedOrders = [...orders];
    updatedOrders.splice(index, 1);
    setOrders(updatedOrders);
  };

  const handleProcessOrder = () => {
    let total = 0;
    const db = getDatabase(app);
    const uuid = uid();
    for (const order of orders) {
      total += order.price;
    }

    // Mendapatkan waktu pemesanan saat ini
    const currentTime = new Date().toLocaleString();

    // Data yang akan disimpan di Firebase
    set(ref(db, "menu/detailOrder/" + uuid), {
      customerName,
      orders,
      total,
      timestamp: currentTime,
      uuid,
    });

    // Menyimpan data pesanan ke Firebase
    setTotalPrice(total);
  };

  const handleDone = () => {
    // Mereset seluruh pesanan dan total harga
    setOrders([]);
    setTotalPrice(0);
    setCustomerName("");
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(value);
  };

  return (
    <>
      <Navigation />
      <div className="kasir-container">
        <h1>
          Admin Barista<span>Brew</span>
        </h1>

        <div className="input-container">
          <p style={{ fontWeight: "bold" }}>Customer Name: </p>
          <input
            type="text"
            placeholder="Customer Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: 20 }}>
          <p style={{ fontWeight: "bold" }}>Order : </p>
          <select
            value={selectedMenuItem}
            onChange={handleMenuItemChange}
            style={{
              // backgroundColor: "#a48d60",
              padding: 10,
              borderRadius: 10,
              // color: "white",
              // fontWeight: "bold",
            }}
          >
            <option value="">Choose Menu</option>
            {menuItems.map((menuItem, index) => (
              <option key={index} value={menuItem.name}>
                {menuItem.name}
              </option>
            ))}
          </select>
        </div>
        {selectedMenuItem && (
          <p style={{ fontWeight: "bold" }}>
            Price : {formatCurrency(itemPrice)}
          </p>
        )}

        <div style={{ marginBottom: 10 }}>
          {/* <p style={{ fontWeight: "bold" }}>Choose Food: </p> */}
          <select
            value={selectedFood}
            onChange={handleFoodChange}
            style={{
              // backgroundColor: "#a48d60",
              padding: 10,
              borderRadius: 10,
              // color: "white",
              // fontWeight: "bold",
            }}
          >
            <option value="">Choose Food</option>
            {foods.map((food, index) => (
              <option key={index} value={food.name}>
                {food.name}
              </option>
            ))}
          </select>
        </div>
        {selectedFood && (
          <p style={{ fontWeight: "bold" }}>
            Price: {formatCurrency(foodPrice)}
          </p>
        )}

        <div style={{ marginBottom: 20 }}>
          <p style={{ fontWeight: "bold" }}>Addtional: </p>

          <select
            value={selectedAdditionalItem}
            onChange={handleAdditionalItemChange}
            style={{
              // backgroundColor: "#a48d60",
              padding: 10,
              borderRadius: 10,
              // color: "white",
              // fontWeight: "bold",
            }}
          >
            <option value="">Choose Addtional</option>
            {additionalItems.map((item, index) => (
              <option key={index} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        {selectedAdditionalItem && (
          <p style={{ fontWeight: "bold" }}>
            Additional Price: {formatCurrency(additionalItemPrice)}
          </p>
        )}

        <div style={{ marginBottom: 20 }}>
          <select
            value={selectedAdditionalItem2}
            onChange={handleAdditionalItemChange2}
            style={{
              // backgroundColor: "#a48d60",
              padding: 10,
              borderRadius: 10,
              // color: "white",
              // fontWeight: "bold",
            }}
          >
            <option value="">Choose Addtional 2</option>
            {additionalItems2.map((item, index) => (
              <option key={index} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        {selectedAdditionalItem2 && (
          <p style={{ fontWeight: "bold" }}>
            Additional Price: {formatCurrency(additionalItemPrice2)}
          </p>
        )}

        <button
          onClick={handleAddOrder}
          style={{
            padding: 10,
            borderRadius: 10,
            backgroundColor: "#a48d60",
            border: "none",
            // fontWeight: "bold",
            color: "white",
            marginBottom: 40,
          }}
        >
          Add Order
        </button>
        <div className="order-container">
          <h2>Detail Order :</h2>
          <ul>
            {orders.map((order, index) => (
              <li key={index}>
                {order.name} - {formatCurrency(order.price)}{" "}
                <button
                  onClick={() => handleRemoveOrder(index)}
                  style={{
                    backgroundColor: "#A3543D",
                    color: "white",
                    padding: 10,
                    border: "none",
                    borderRadius: 10,
                    width:100
                  }}
                >
                  Clear
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="total-container">
          <button
            onClick={handleProcessOrder}
            style={{ backgroundColor: "#A5A869", borderRadius: 10, width:100, marginBottom:20}}
          >
            Proses
          </button>
          {customerName && (
            <div>
              <p style={{ fontSize: 20 }}>Customer Name:</p>
              <p style={{ fontWeight: "bold", fontSize: 20 }}>{customerName}</p>
            </div>
          )}
          {totalPrice > 0 && (
            <div>
              <p style={{ fontSize: 20 }}>Total price:</p>
              <p style={{ fontWeight: "bold" }}>{formatCurrency(totalPrice)}</p>
            </div>
          )}
          {orders.length > 0 && (
            <button
              onClick={handleDone}
              style={{ backgroundColor: "#A3543D", borderRadius: 10, width:100 }}
            >
              Clear
            </button>
          )}
        </div>
        <button
          onClick={() => setShowImage(!showImage)} // Toggle the visibility of the image
          style={{
            padding: 10,
            borderRadius: 10,
            backgroundColor: "#a48d60",
            border: "none",
            color: "white",
            marginBottom: 20,
            marginTop:30
          }}
        >
          Show QR
        </button>
        {showImage && (
          <div>
            <img
              src={QR} // Use the imported image source
              alt="Qr"
              style={{ maxWidth: "100%", maxHeight: "600px" }} // Adjust image size as needed
            />
          </div>
        )}
      </div>
    </>
  );
}

export default Kasir;
