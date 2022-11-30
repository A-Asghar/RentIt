import React from "react";
import { Menu, Dropdown, Button, Space, Row, Col } from "antd";
import { Link } from 'react-router-dom'

function DefaultLayout(props) {
  const user = JSON.parse(localStorage.getItem('user'))
  const menu = (
    user ? <Menu>
      <Menu.Item>
        <a

          href="/"
        >
          Home
        </a>
      </Menu.Item>
      <Menu.Item>
        <a

          href="/userbookings"
        >
          Bookings
        </a>
      </Menu.Item>
      {
        user.isAdmin ?
          <Menu.Item>
            <a

              href="/admin"
            >
              Admin
            </a>
          </Menu.Item>
          : null
      }

      {
        user.isAdmin ?
          <Menu.Item>
            <a

              href="/userbookingsadmin"
            >
              All Bookings
            </a>
          </Menu.Item>
          : null
      }

      <Menu.Item>
        <a

          href="/profile"
        >
          Profile
        </a>
      </Menu.Item>

      <Menu.Item onClick={() => {
        localStorage.removeItem('user');
        window.location.href = '/login'
      }}>
        <li style={{ color: 'orangered' }}>Logout</li>
      </Menu.Item>
    </Menu>
      : null
  );
  return (
    <div>
      <div className="header bs1">
        <Row gutter={16} justify='center'>
          <Col lg={20} sm={24} xs={24}>
            <div className="d-flex justify-content-between">
              <h1 ><b><Link to='/' style={{ color: 'orangered' }}>RentIt</Link></b></h1>

              {user ? <Dropdown overlay={menu} placement="bottomCenter">
                <Button>{user.username}</Button>
              </Dropdown> : null}
            </div>
          </Col>
        </Row>

      </div>
      <div className="content">{props.children}</div>

      <div className="footer text-center">
        <hr />

        <p>Designed and Developed By</p>



        <p>Huzaifa Asif</p>

      </div>
    </div>
  );
}

export default DefaultLayout;
