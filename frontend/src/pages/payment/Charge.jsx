import './styles.css'

import React, { useContext, useState } from 'react'
import axios from "axios"
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import { AuthContext } from '../../context/AuthContext';
import useFetch from '../../hooks/useFetch';
import { useLocation } from 'react-router-dom';
import Methods from './Methods';


const Charge=({setOpenMode,hotelId})=> {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const { data } = useFetch(
    // `https://thankful-bass-waders.cyclic.app/api/hotels/find/${id}`
    `/hotels/find/${id}`
  );

  const price = localStorage.getItem("price")
  const [model, setModel] = useState(false);
const [email, setEmail] = useState(user.email);
const [amount, setAmount] = useState(price);
const [username, setName] = useState('');
const [number, setNumber] = useState('');


const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/payment/charge', {
        email,
        amount,
        username,
      });

      // Handle the Paystack response here (e.g., redirect to payment page)
      console.log(response.data);
       // Redirect the user to the payment page

       window.location.href = response.data.data.authorization_url;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    <Navbar/>
    {user && <div className='myFlex'>
    <form onSubmit={handleSubmit}>
      <div className="cardetails-wrapper">
        <div className="cardetails-payment">
          <h2 className="carddetails-head">Payment Details</h2>

          <div className="cardetails-card cardetails-space cardetails-icon-relative">
              <label className="cardetails-label">Username:</label>
              <input type="text" className="cardetails-input" name="username" style={{textTransform:"uppercase"}} value={user.username} placeholder="Mr Anibrika" />
              <i className="fas fa-user"></i>
            </div>
          <div className="cardetails-form">
            <div className="cardetails-card cardetails-space cardetails-icon-relative">
              <label className="cardetails-label">Email:</label>
              <input
                type="text"
                className="cardetails-input"
                name="email"
                placeholder="bismark@gmail.com"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>
            <div className="cardetails-card cardetails-space cardetails-icon-relative">
              <label className="cardetails-label">Amount:</label>
              <input
                type="number"
                className="cardetails-input"
                name="amount"
                // placeholder="100"
                value={amount}
                disabled
                onChange={(e)=>setAmount(e.target.value)}
              />
            </div>

          
            <button className="cardetails-btn">Pay</button>
          </div>
        </div>
      </div>
    </form>
    <Methods/>
      </div> }
      <Footer/>
    </>
  )
}


export default Charge