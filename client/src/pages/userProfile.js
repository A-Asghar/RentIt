import { Col, Row, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import { editUser } from "../redux/actions/userActions";

function EditProfile({ match }) {
//  const { users } = useSelector((state) => state.carsReducer);
   const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertsReducer);
  const user = JSON.parse(localStorage.getItem('user'))
//   const [car, setcar] = useState();
//   const [totalcars, settotalcars] = useState([]);
  // useEffect(() => {
  //   if (cars.length == 0) {
  //     dispatch(getAllCars());
  //     console.log(cars);
  //   } else {
  //     settotalcars(cars);
  //     setcar(cars.find((o) => o._id == match.params.carid));
  //     console.log(car);
  //   }
  // }, [cars]);

  function onFinish(values) {
    values._id = user._id;

    dispatch(editUser(values));
    console.log(values);
  }

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <Row justify="center mt-5">
        <Col lg={12} sm={24} xs={24} className='p-2'>
          {(
            <Form
              className="bs1 p-2"
              layout="vertical"
              onFinish={onFinish}
            >
              <h3>Edit Your Profile</h3>

              <hr />
              <Form.Item
                name="username"
                label="Your name"
                initialValue={user.username}
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="email"
                label="Your email"
                initialValue={user.email}
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="password"
                label="New password"
                initialValue={user.password}
                rules={[{ required: false }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="address"
                label="Address"
                initialValue={user.address}
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>

              <div className="text-right">
                <button className="btn1">Submit</button>
              </div>
            </Form>
          )}
        </Col>
      </Row>
    </DefaultLayout>
  );
}

export default EditProfile;