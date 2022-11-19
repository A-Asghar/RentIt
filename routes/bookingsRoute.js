const express = require("express");
const router = express.Router();
const Booking = require("../models/bookingModel");
const Car = require("../models/carModel");
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(
  "sk_test_51L83sVBtEI7KvPdobSdqfdrr4wyanm7W3x2Ve4wZ3bDIcmLCAP7mHkHYEhDvZzwhrTMNYKJXZjGZI0wXsrVPrOQS00C8eLqXrP"
);
router.post("/bookcar", async (req, res) => {
  const { token } = req.body;
  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const payment = await stripe.charges.create(
      {
        amount: req.body.totalAmount * 100,
        currency: "pkr",
        customer: customer.id,
        receipt_email: token.email
      },
      {
        idempotencyKey: uuidv4(),
        
      }
    );

    if (payment) {
      req.body.transactionId = payment.source.id;
      const newbooking = new Booking(req.body);
      await newbooking.save();
      const car = await Car.findOne({ _id: req.body.car });
      console.log(req.body.car);
      car.bookedTimeSlots.push(req.body.bookedTimeSlots);

      await car.save();
      res.send("Your booking is successfull");
    } else {
      return res.status(400).json(error);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});


router.get("/getallbookings", async(req, res) => {

    try {

        const bookings = await Booking.find().populate('car')
        res.send(bookings)
        
    } catch (error) {
        return res.status(400).json(error);
    }
  
});

router.post("/acceptbooking", async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.body._id });
    
    booking.isApproved = 'Accepted';
    await booking.save();

    res.send("Booking details updated successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/rejectbooking", async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.body._id });
    
    booking.isApproved = 'Rejected';
    await booking.save();

    res.send("Booking details updated successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/cancelbooking", async (req, res) => {
  try {
    await Booking.findOneAndDelete({ _id: req.body._id });

    res.send("Booking cancelled successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});


module.exports = router;
