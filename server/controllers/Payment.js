
import axios from "axios"
import dotenv from "dotenv"
import Payment from "../models/Payments.js"

dotenv.config()

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const PAYSTACK_CALLBACK_URL = process.env.PAYSTACK_CALLBACK_URL;

// Handle a payment request
export const payment = async (req, res) => {
    // try {
    //     const { email, amount, number, username } = req.body;
    
    //     const response = await axios.post(
    //       'https://api.paystack.co/transaction/initialize',
    //       {
    //         email,
    //         amount,
    //       },
    //       {
    //         headers: {
    //           Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
    //         },
    //       }
    //     );
    
    //     // Add number and name to the response data
    //     const responseData = {
    //       ...response.data,
    //       number,
    //       username,
    //     };
    
    //     res.json(responseData);
    //   } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ error: 'Payment failed' });
    //   }

    const { email, amount,username } = req.body;
    try {
    
        const response = await axios.post(
          'https://api.paystack.co/transaction/initialize',
          {
            email,
            amount,
            callback_url: PAYSTACK_CALLBACK_URL,
            channels: ["mobile_money"],
          },
          {
            headers: {
              Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
            },
          }
        );
        
    
        res.json(response.data);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Payment initiation failed' });
      }
    };


export const paymentCallback = async (req,res)=>{

           // Handle Paystack callback (transaction verification)
        const { reference } = req.body;
      
        try {
          const response = await axios.get(
            `https://api.paystack.co/transaction/verify/${reference}`,
            {
              headers: {
                Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
              },
            }
          );
      
          // Handle the response (update your application's database, etc.)
          console.log(response.data);
      
          res.sendStatus(200);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Callback verification failed' });
        }
}
    


