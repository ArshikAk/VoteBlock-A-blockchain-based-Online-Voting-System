const userSchema = require("../models/userSchema");
const otpSchema = require("../models/otpSchema")
const axios = require("axios")
const twilio = require("twilio");

const otpModel = require("../models/otpSchema");

const client = new twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);


const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000)
};


exports.sendOTP = async (req,res) => {
    try {
        const { voterId } = req.body

        const data = await userSchema.findOne({ epicId: voterId });
        const otp = generateOTP()

        await otpModel.create({
            epicId : voterId,
            otp: otp,
        })

        phoneNo = "+91" + data.phoneNumber

        message = `VoteBlock - OTP for verification : ${otp}`

        const response = await client.messages.create({
            body: message,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: phoneNo,
        });

        res.status(200).json({ success: true, response });
    }
    catch(error) {
        console.log("Error sending OTP:", error);
        res.status(500).json({message: "Internal Server Error"})
    }
} 


exports.verifyOTP = async (req, res) => {
    try {
        const { voterId, otp } = req.body;

        if (!voterId || !otp) {
            return res.status(400).json({ success: false, message: "Voter ID and OTP are required" });
        }

        const data = await otpModel.findOne({ epicId: voterId });

        if (!data) {
            return res.status(404).json({ success: false, message: "Voter ID not found" });
        }

        if (data.otp == otp) {
            return res.json({ success: true, message: "OTP verified successfully" });
        } 
        else {
            return res.status(401).json({ success: false, message: "Invalid OTP" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};



exports.verifyVoterID = async (req,res) => {
    try {
        const { voterId, selectedDate } = req.body
        const data = await userSchema.findOne({ epicId: voterId })
        if (data) {
            if (data.dob == selectedDate)
            {
                res.json({success: true, message: "Voter ID verified successfully" });
            }
            else{
                res.json({success: false, message: "Incorrect Date of Birth" });
            }
        }
        else {
            res.json({success: false, message: "Voter ID not found" });
        }
    }
    catch (error){
        console.log(error)
        res.status(500).json({message: "Internal Server Error"})
    }
}