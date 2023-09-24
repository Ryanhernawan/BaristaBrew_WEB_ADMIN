import React, { Component } from 'react'
import { Col, ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom';

export default class ListCategory extends Component {
  render() {
    return (
      <Col md={2} mt="2">
        <h5 style={{ textAlign: "left",  }}><strong>Daftar Kategori</strong></h5>
        <hr />
        <ListGroup>
          <Link to="/" style={{ textDecoration: 'none', }}>
            <ListGroup.Item
              style={{
                border: "none",
                cursor: 'pointer',
                backgroundColor: window.location.pathname === '/' ? '#a48d60' : 'transparent',
              }}
              active={window.location.pathname === '/'}
            >
              Order
            </ListGroup.Item>
          </Link>
          {/* <Link to="/Minuman" style={{ textDecoration: 'none' }}>
            <ListGroup.Item
              style={{
                border: "none",
                cursor: 'pointer',
                backgroundColor: window.location.pathname === '/Minuman' ? '#a48d60' : 'transparent',
              }}
              active={window.location.pathname === '/Minuman'}
            >
              Minuman
            </ListGroup.Item>
          </Link> */}
          <Link to="/ListOrder" style={{ textDecoration: 'none' }}>
            <ListGroup.Item
              style={{
                border: "none",
                cursor: 'pointer',
                backgroundColor: window.location.pathname === '/ListOrder' ? '#a48d60' : 'transparent',
              }}
              active={window.location.pathname === '/ListOrder'}
            >
              List Order
            </ListGroup.Item>
          </Link>
          <Link to="/recap" style={{ textDecoration: 'none' }}>
            <ListGroup.Item
              style={{
                border: "none",
                cursor: 'pointer',
                backgroundColor: window.location.pathname === '/recap' ? '#a48d60' : 'transparent',
              }}
              active={window.location.pathname === '/recap'}
            >
              Recap
            </ListGroup.Item>
          </Link>
        </ListGroup>
      </Col>
    )
  }
}
