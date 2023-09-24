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
import { BrowserRouter as Router, Route, Link } from "react-router-dom"; // Import untuk navigasi
import { Card, Button, Col, Row, Container } from "react-bootstrap"; // Import komponen Card dan Button
import ListCategory from "./ListCategory";
import Hasil from "./Hasil";

function Kasir() {
  const [showImage, setShowImage] = useState(false);

  const [customerName, setCustomerName] = useState("");
  const [selectedMenuItem, setSelectedMenuItem] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [orders, setOrders] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const menuItems = [
    { name: "Americano", price: 15000 },
    { name: "Coffee Latte", price: 25000 },
    { name: "Coffee with Palm Sugar", price: 25000 },
    { name: "Pandan Latte", price: 28000 },
    { name: "Caramel Latte", price: 28000 },
    { name: "Vanilla Latte", price: 28000 },
    { name: "Pocari Sweat", price: 7000 },
    { name: "Infused Water Mix Fruits", price: 7000 },
    { name: "Infused Lemon Tea", price: 7000 },
  ];

  const foods = [
    { name: "Puding Oreo Regal", price: 10000 },
    { name: "Laksa", price: 28000 },
    { name: "Sambal Cumi Asin", price: 35000 },
    { name: "Bawang Goreng", price: 35000 },
    { name: "Bubur Kacang Hijau", price: 10000 },
    { name: "Lontong", price: 5000 },
  ];

  const additionalItems = [
    { name: "Normal", price: 0 },
    { name: "Extra Shot +1", price: 6000 },
    { name: "Extra Shot +2", price: 12000 },
    { name: "Extra Shot +3", price: 18000 },
  ];

  const additionalItems2 = [
    { name: "Normal", price: 0 },
    { name: "Less", price: 0 },
    { name: "Extra Sweet", price: 6000 },
  ];

  const [type, setType] = useState();

  const typeMenu = [{ name: "Ice " }, { name: "Less Ice " }, { name: "Hot " }];

  const [selectedAdditionalItem, setSelectedAdditionalItem] = useState("");
  const [additionalItemPrice, setAdditionalItemPrice] = useState(0);

  const [selectedAdditionalItem2, setSelectedAdditionalItem2] = useState("");
  const [additionalItemPrice2, setAdditionalItemPrice2] = useState(0);

  const [selectedTypeMenu, setSelectedTypeMenu] = useState("");

  const [selectedNote, setSelectedNote] = useState("");

  const note = [{ name: "Less Ice" }, { name: "Less Sugar" }];

  const handleMenuItemChange = (event) => {
    const selectedItemName = event.target.value;
    const selectedItem = menuItems.find(
      (item) => item.name === selectedItemName
    );
    if (selectedItem) {
      setSelectedMenuItem(selectedItem.name);
      setItemPrice(selectedItem.price);

      // Set the selected additional options for the menu item
      setSelectedAdditionalOptions(additionalItems);
    } else {
      setSelectedMenuItem("");
      setItemPrice("");
      setSelectedAdditionalOptions([]);
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

  const [iceCubeOptions, setIceCubeOptions] = useState({}); // State untuk menyimpan pilihan "Ice Cube" untuk setiap item

  // ...

  const handleIceCubeChange = (event, menuItemName) => {
    const selectedIceCube = event.target.value;
    setIceCubeOptions((prevOptions) => ({
      ...prevOptions,
      [menuItemName]: selectedIceCube,
    }));
  };
  const [sweetnessLevels, setSweetnessLevels] = useState({});

  const [additionalOptions, setAdditionalOptions] = useState({});
  const [selectedAdditionalOptions, setSelectedAdditionalOptions] = useState(
    []
  );

  const handleAdditionalItemChange = (event, menuItemName) => {
    const selectedAdditionalItemName = event.target.value;
    const selectedAdditionalItem = additionalItems.find(
      (item) => item.name === selectedAdditionalItemName
    );

    setSelectedAdditionalItem(selectedAdditionalItemName); // Set nama item tambahan yang dipilih
    setAdditionalItemPrice(
      selectedAdditionalItem ? selectedAdditionalItem.price : 0
    );
  };

  const handleAdditionalItemChange2 = (event, menuItemName) => {
    const selectedAdditionalItemName = event.target.value;
    const selectedAdditionalItem = additionalItems2.find(
      (item) => item.name === selectedAdditionalItemName
    );

    setSelectedAdditionalItem2(selectedAdditionalItemName); // Set nama item tambahan yang dipilih
    setAdditionalItemPrice2(
      selectedAdditionalItem ? selectedAdditionalItem.price : 0
    );
  };

  const handleCancelAdditionalItem = (index) => {
    const updatedOrders = [...orders];
    const canceledItem = updatedOrders[index];
    // Kurangi harga item tambahan yang dibatalkan dari total harga
    setTotalPrice((prevTotalPrice) => prevTotalPrice - canceledItem.price);
    updatedOrders.splice(index, 1);
    setOrders(updatedOrders);
  };
  const handleTypeMenu = (event) => {
    const selectedTypeMenu = event.target.value;
    setSelectedTypeMenu(selectedTypeMenu);
  };

  const handleNote = (event) => {
    const selectedNote = event.target.value;
    setSelectedNote(selectedNote);
  };

  const handleAddOrder = () => {
    if (selectedMenuItem && itemPrice) {
      // Membuat pesanan baru dengan item tambahan
      const newOrder = {
        name:
          selectedTypeMenu +
          selectedMenuItem +
          (selectedNote ? ` (${selectedNote})` : "") +
          (selectedAdditionalItem
            ? ` + (Shot) ${selectedAdditionalItem} + (Sweet) ${selectedAdditionalItem2}`
            : ""), // Tambahkan selectedNote ke dalam pesanan
        price: itemPrice + additionalItemPrice + additionalItemPrice2,
      };
      // Menambahkan pesanan baru ke daftar pesanan yang sudah ada
      setOrders([...orders, newOrder]);
      // Mereset selectedMenuItem dan itemPrice
      setSelectedMenuItem("");
      setItemPrice("");
      //   setCustomerName("");
      // Mereset item tambahan dan harganya
      setSelectedTypeMenu("");
      setSelectedAdditionalItem("");
      setAdditionalItemPrice(0);
      setSelectedAdditionalItem2("");
      setAdditionalItemPrice2(0);
      setSelectedNote("");
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
            : "") +
          (selectedNote ? ` (${selectedNote})` : ""), // Tambahkan selectedNote ke dalam pesanan
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

    set(ref(db, "menu/recap/" + uuid), {
      customerName,
      orders,
      total,
      timestamp: currentTime,
      total,
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

  const [selectedAdditionalItems, setSelectedAdditionalItems] = useState({});

  return (
    <>
      <Navigation />
      <div className="mt-3">
        <Container fluid>
          <Row>
            <ListCategory />
            <Col lg={5} md={7}>
              {" "}
              {/* Adjust the column layout */}
              <h5 style={{ textAlign: "left" }}>
                <strong>Daftar Produk</strong>
              </h5>
              <hr />
              <div style={{ textAlign: "left" }}>
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
                    <option value="">Minuman</option>
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
                    <option value="">Makanan</option>
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
                  <div style={{ marginBottom: 20 }}>
                    <select
                      value={selectedTypeMenu}
                      onChange={handleTypeMenu}
                      style={{
                        padding: 10,
                        borderRadius: 10,
                      }}
                    >
                      <option value="">Ice Cube</option>
                      {typeMenu.map((typeItem, index) => (
                        <option key={index} value={typeItem.name}>
                          {typeItem.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <select
                    value={selectedAdditionalItem}
                    onChange={(e) =>
                      handleAdditionalItemChange(e, selectedMenuItem)
                    }
                    style={{
                      padding: 10,
                      borderRadius: 10,
                    }}
                  >
                    <option value="">Shot</option>
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
                    onChange={(e) =>
                      handleAdditionalItemChange2(e, selectedMenuItem)
                    }
                    style={{
                      padding: 10,
                      borderRadius: 10,
                    }}
                  >
                    <option value="">Sweetness Level</option>
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
                {/* <div style={{ marginBottom: 20 }}>
                  <select
                    value={selectedNote}
                    onChange={handleNote}
                    style={{
                      padding: 10,
                      borderRadius: 10,
                    }}
                  >
                    <option value="">Other</option>
                    {note.map((item, index) => (
                      <option key={index} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div> */}

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
                  Add to cart
                </button>
              </div>
            </Col>
            {/* <Hasil /> */}
            <Col md={4} mt="2">
              <h5 style={{ textAlign: "left" }}>
                <strong>Cart</strong>
              </h5>
              <hr />
              <div className="order-container">
                {/* <h2>Detail Order :</h2> */}
                <ul>
                  {orders.map((order, index) => (
                    <li key={index}>
                      {order.name} = {formatCurrency(order.price)}{" "}
                      <button
                        onClick={() => handleRemoveOrder(index)}
                        style={{
                          backgroundColor: "#A3543D",
                          color: "white",
                          padding: 10,
                          border: "none",
                          borderRadius: 10,
                          width: 100,
                        }}
                      >
                        Clear
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="total-container">
                {orders.length > 0 && (
                  <button
                    onClick={handleProcessOrder}
                    style={{
                      backgroundColor: "#A5A869",
                      borderRadius: 10,
                      width: 100,
                      marginBottom: 20,
                    }}
                  >
                    Proses
                  </button>
                )}
                {customerName && (
                  <div>
                    <p style={{ fontSize: 20 }}>Customer Name:</p>
                    <p style={{ fontWeight: "bold", fontSize: 20 }}>
                      {customerName}
                    </p>
                  </div>
                )}
                {totalPrice > 0 && (
                  <div>
                    <p style={{ fontSize: 20 }}>Total price:</p>
                    <p style={{ fontWeight: "bold" }}>
                      {formatCurrency(totalPrice)}
                    </p>
                  </div>
                )}
                {orders.length > 0 && (
                  <button
                    onClick={handleDone}
                    style={{
                      backgroundColor: "#A3543D",
                      borderRadius: 10,
                      width: 100,
                    }}
                  >
                    Clear
                  </button>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Kasir;
