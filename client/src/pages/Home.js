import React , {useState,useEffect} from 'react'
import { useSelector , useDispatch } from 'react-redux'
import DefaultLayout from '../components/DefaultLayout'
import { getAllCars } from '../redux/actions/carsActions'
import { Col, Row , Divider , DatePicker, Checkbox, Form , Input} from 'antd'
import {Link} from 'react-router-dom'
import Spinner from '../components/Spinner';
import moment from 'moment'
const {RangePicker} = DatePicker
function Home() {
    const {cars} = useSelector(state=>state.carsReducer)
    const {loading} = useSelector(state=>state.alertsReducer)
    const [totalCars , setTotalcars] = useState([])
    const dispatch = useDispatch()
    

    useEffect(() => {
        dispatch(getAllCars())
    }, [])

    useEffect(() => {

        setTotalcars(cars)
        
    }, [cars])
    function onFinish(values){
        var temp=[]

            for(var car of cars){
                 if(car.name.toLowerCase().indexOf(values.search.toLowerCase()) !== -1){
                    temp.push(car)
                 }
            }
            setTotalcars(temp)

    }

    function setFilter(values){

        var selectedFrom = moment(values[0] , 'MMM DD yyyy HH:mm')
        var selectedTo = moment(values[1] , 'MMM DD yyyy HH:mm')
            console.log(selectedFrom)
        var temp=[]

        for(var car of cars){

              if(car.bookedTimeSlots.length == 0){
                  temp.push(car)
              }
              else{

                   for(var booking of car.bookedTimeSlots) {

                       if(selectedFrom.isBetween(booking.from , booking.to) ||
                       selectedTo.isBetween(booking.from , booking.to) || 
                       moment(booking.from).isBetween(selectedFrom , selectedTo) ||
                       moment(booking.to).isBetween(selectedFrom , selectedTo)
                       )
                       {

                       }
                       else{
                           temp.push(car)
                       }

                   }

              }

        }


        setTotalcars(temp)


    }

    return (
        <DefaultLayout>

             <Row className='mt-3' justify='center'>
                 
                 <Col lg={20} sm={24} className='d-flex justify-content-left'>

                     <RangePicker showTime={{format: 'HH:mm'}} format='MMM DD yyyy HH:mm' onChange={setFilter}/>
                     
                 </Col>
                <Col lg={20} sm={24} className='d-flex justify-content-left'>
                <Form style={{ display: 'flex' }} layout='horizontal' onFinish={onFinish}>
                         <hr />
                         <Form.Item name='search' >
                             <Input/>
                         </Form.Item>
                         <button className='btn2'>Search</button>

                         <hr />                    

                    </Form>
                </Col>
             </Row>

              {loading == true && (<Spinner/>)}


              
              <Row justify='center' gutter={16}>

                   {totalCars.map(car=>{
                       return <Col lg={5} sm={24} xs={24}>
                            <div className="car p-2 bs1">
                               <img src={car.image} className="carimg"/>

                               <div className="car-content d-flex align-items-center justify-content-between">

                                    <div className='text-left pl-2'>
                                        <p>{car.name}</p>
                                        <p> Rent Per Hour {car.rentPerHour} /-</p>
                                    </div>

                                    <div>
                                        <button className="btn1 mr-2">{localStorage.getItem('user') ? <Link to={`/booking/${car._id}`}>Book Now</Link> : <Link to={`/login`}>Book Now</Link>}</button>
                                    </div>

                               </div>
                            </div>
                       </Col>
                   })}

              </Row>

        </DefaultLayout>
    )
}

export default Home
