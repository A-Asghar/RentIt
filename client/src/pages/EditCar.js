import { Col, Row, Form, Input, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import { addCar, editCar, getAllCars } from "../redux/actions/carsActions";
import { uploadFile } from 'react-s3';

const S3_BUCKET ='rentitwebapp';
const REGION ='ap-south-1';
const ACCESS_KEY ='AKIAYTMB5AL65CJHKM74';
const SECRET_ACCESS_KEY ='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';

const config = {
    bucketName: S3_BUCKET,
    region: REGION,
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
}

function EditCar({ match }) {
  const [selectedFile, setSelectedFile] = useState(null);
    const handleFileInput = (e) => {

        handleUpload(e.target.files[0]);
        
    }

    const handleUpload = async (file) => {
        uploadFile(file, config)
            .then(data => setSelectedFile(data.location))
            .catch(err => console.error(err))

        
    }
  const { cars } = useSelector((state) => state.carsReducer);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertsReducer);
  const [car, setcar] = useState();
  const [totalcars, settotalcars] = useState([]);
  useEffect(() => {
    if (cars.length == 0) {
      dispatch(getAllCars());
      console.log(cars);
    } else {
      settotalcars(cars);
      setcar(cars.find((o) => o._id == match.params.carid));
      console.log(car);
    }
  }, [cars]);

  function onFinish(values) {
    values._id = car._id;
    values.image=selectedFile
         if(values.image!=null){
          dispatch(editCar(values));
         }else{
            message.error("fill all details")
         }
   
    console.log(values);
  }

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <Row justify="center mt-5">
        <Col lg={12} sm={24} xs={24} className='p-2'>
          {totalcars.length > 0 && (
            <Form
              initialValues={car}
              className="bs1 p-2"
              layout="vertical"
              onFinish={onFinish}
            >
              <h3>Edit Car</h3>

              <hr />
              <Form.Item
                name="name"
                label="Car name"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              {/* <Form.Item
                name="image"
                label="Image url"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item> */}
              <Form.Item
                name="rentPerHour"
                label="Rent per hour"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="capacity"
                label="Capacity"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="fuelType"
                label="Fuel Type"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item  label='Add Image'>
                           <input type="file" onChange={handleFileInput}/>
                           {selectedFile}
                           </Form.Item>
              <div className="text-right">
                <button className="btn1">Edit CAR</button>
              </div>
            </Form>
          )}
        </Col>
      </Row>
    </DefaultLayout>
  );
}

export default EditCar;