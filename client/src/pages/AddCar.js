import { Col , Row , Form , Input, message} from 'antd'
import React , {useState} from 'react'
import { useDispatch , useSelector } from 'react-redux'
import DefaultLayout from '../components/DefaultLayout'
import Spinner from '../components/Spinner'
import { addCar } from '../redux/actions/carsActions'
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


function AddCar() {
    const [selectedFile, setSelectedFile] = useState(null);
    const handleFileInput = (e) => {

        handleUpload(e.target.files[0]);
        
    }

    const handleUpload = async (file) => {
        uploadFile(file, config)
            .then(data => setSelectedFile(data.location))
            .catch(err => console.error(err))

        
    }

    const dispatch = useDispatch()
    const {loading} = useSelector(state=>state.alertsReducer)

    function onFinish(values){

         values.bookedTimeSlots=[]

         values.image=selectedFile
         if(values.image!=null){
            dispatch(addCar(values))
         }else{
            message.error("fill all details")
         }
         
         console.log(values)
    }

    return (
        <DefaultLayout>
               {loading && (<Spinner />)}
               <Row justify='center mt-5'>
                   <Col lg={12} sm={24} xs={24} className='p-2'>
                       <Form className='bs1 p-2' layout='vertical' onFinish={onFinish}>
                           <h3>Add New Car</h3>
                           <hr />
                           <Form.Item name='name' label='Car name' rules={[{required: true}]}>
                               <Input/>
                           </Form.Item>                           
                           <Form.Item name='rentPerHour' label='Rent per hour' rules={[{required: true}]}>
                               <Input/>
                           </Form.Item>
                           <Form.Item name='capacity' label='Capacity' rules={[{required: true}]}>
                               <Input/>
                           </Form.Item>
                           <Form.Item name='fuelType' label='Fuel Type' rules={[{required: true}]}>
                               <Input/>
                           </Form.Item>
                           <Form.Item  label='Add Image'>
                           <input type="file" onChange={handleFileInput}/>
                           {selectedFile}
                           </Form.Item>
                           <div className='text-right'>
                           <button className='btn1'>ADD CAR</button>
                           </div>

                       </Form>
                   </Col>
               </Row>

        </DefaultLayout>
    )
}

export default AddCar
