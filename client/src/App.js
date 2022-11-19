import logo from './logo.svg';
import './App.css';
import { Route, BrowserRouter, Redirect } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import BookingCar from './pages/BookingCar'
import 'antd/dist/antd.css';
import UserBookings from './pages/UserBookings';
import UserBookingsAdmin from './pages/UserBookingsAdmin';
import AddCar from './pages/AddCar';
import AdminHome from './pages/AdminHome';
import EditCar from './pages/EditCar';

function App() {
  return (
    <div className="App">



      <BrowserRouter>

        <Route path='/' exact component={Home} />
        <Route path='/login' exact component={Login} />
        <Route path='/register' exact component={Register} />
        <ProtectedRoute path='/booking/:carid' exact component={BookingCar} />
        <ProtectedRoute path='/userbookings' exact component={UserBookings} />
        <ProtectedRoute path='/userbookingsadmin' exact component={Guard2} />
        <ProtectedRoute path='/addcar' exact component={Guard3} />
        <ProtectedRoute path='/editcar/:carid' exact component={Guard4} />
        <ProtectedRoute path='/admin' exact component={Guard1} />

      </BrowserRouter>

    </div>
  );
}



export default App;

const Guard1 = () => {
  const user = JSON.parse(localStorage.getItem('user'))

  console.log(user);
  if (!user.isAdmin) {
    return <Redirect to="/" replace />;
  }
  return <AdminHome />;
};

const Guard2 = () => {
  const user = JSON.parse(localStorage.getItem('user'))

  console.log(user);
  if (!user.isAdmin) {
    return <Redirect to="/" replace />;
  }
  return <UserBookingsAdmin />;
};

const Guard3 = () => {
  const user = JSON.parse(localStorage.getItem('user'))

  console.log(user);
  if (!user.isAdmin) {
    return <Redirect to="/" replace />;
  }
  return <AddCar />;
};

const Guard4 = () => {
  const user = JSON.parse(localStorage.getItem('user'))

  console.log(user);
  if (!user.isAdmin) {
    return <Redirect to="/" replace />;
  }
  return <EditCar />;
};


export function ProtectedRoute(props) {

  if (localStorage.getItem('user')) {
    return <Route {...props} />
  }
  else {
    return <Redirect to='/' />
  }

}