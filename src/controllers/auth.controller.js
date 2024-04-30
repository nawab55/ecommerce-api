const userService = require("../services/user.service.js")
const jwtProvider = require("../config/jwtProvider.js")
const bcrypt = require("bcrypt")
const cartService = require("../services/cart.service.js")
const User = require('../models/user.model.js')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')


const register = async (req, res) => {

    try {
        const user = await userService.createUser(req.body);
        const jwt = jwtProvider.generateToken(user._id);

        await cartService.createCart(user);

        return res.status(200).send({ jwt, message: "Registration successful" })

    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}
const login = async (req, res) => {
    const { password, email } = req.body
    try {
        const user = await userService.getUserByEmail(email);

        if (!user) {
            return res.status(404).json({ message: 'User not found With Email ', email });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const jwt = jwtProvider.generateToken(user._id);

        return res.status(200).send({ jwt, message: "login success" });

    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

// forgot password

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        console.log("user is", user);
        if (!user) {
            return res.status(404).json({ status: false, message: 'User not Registered' })
        }
        const token = jwt.sign({ _id: user._id }, process.env.SECERET_KEY, { expiresIn: '1h' });
        console.log(token);
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.Email,
                pass: process.env.Pass
            }
        });

        var mailOptions = {
            from: process.env.Email,
            to: email,
            subject: 'Reset Password',
            text: `https://localhost:3000/resetPassword/${token}`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.error("Error sending email:", error);
                return res.status(500).json({ status: false, message: "Failed to send email" });
            } else {
                return res.status(200).json({ status: true, message: "Email sent successfully" })
            }
        });

    }
    catch (error) {
        console.error("Error in forgot password:", error);
        return res.status(500).json({ status: false, error: "Internal server error" });
    }
}
// Reset Password

const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    try {
        const decode = jwt.verify(token, process.env.SECERET_KEY);
        console.log(decode)
        const id = decode._id;
        const hashPassword = await bcrypt.hash(password, 8);
        await User.findByIdAndUpdate({ _id: id }, { password: hashPassword })
        return res.status(200).json({ status: true, message: 'Password updated successfully' });
    } catch (error) {
        console.error("Error in reset password:", error);
        return res.status(400).json({ status: false, error: "Invalid or expired token" });
    }
}


module.exports = { register, login, forgotPassword, resetPassword }