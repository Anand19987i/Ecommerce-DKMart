import { User } from "../models/user.model.js"
import getDataUri from "../config/datauri.js"
import cloudinary from "../config/cloudinary.js"
import dotenv from "dotenv"
import { Admin } from "../models/admin.model.js"
import nodemailer from "nodemailer"
import jwt from "jsonwebtoken"

dotenv.config({})

export const register = async (req, res) => {
    try {
        const { name, email, mobile, password, confirmPassword } = req.body;
        if (password !== confirmPassword) {
            return res.status(400).json({
                message: "Password does not match",
                success: false,
            })
        }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
                success: false,
            })
        }
        const newUser = await User.create({
            name,
            email,
            mobile,
            password,
            confirmPassword
        })

        const token = newUser.setAuthToken();
        res.cookie('token', token, {
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000    // 7 days
        })
        return res.status(201).json({
            success: true,
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                mobile: newUser.mobile,

            }
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server error",
            success: false,
        });
    }
}


export const loginWithEmail = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({
                message: "Invalid credentials",
                success: false
            })
        }
        if (password !== user.password) {
            return res.status(401).json({
                message: "Invalid Password",
                success: false
            })
        }

        const token = user.setAuthToken();
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json({
            success: true,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar
            }
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server error",
            success: false,
        });
    }
}


export const userDetails = async (req, res) => {
    try {
        const { name, email, mobile, address } = req.body;
        const { id } = req.params;
        let avatarUrl = null;


        if (req.file) {
            const fileUri = getDataUri(req.file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri, {
                folder: "avatars",
                resource_type: "image"
            });
            avatarUrl = cloudResponse.secure_url;
        }

        let userDetail = await User.findById(id);
        if (!userDetail) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        userDetail.name = name || userDetail.name;
        userDetail.email = email || userDetail.email;
        userDetail.mobile = mobile || userDetail.mobile;
        userDetail.address = address || userDetail.address;

        if (avatarUrl) {
            userDetail.avatar = avatarUrl;
        }

        await userDetail.save();

        return res.status(200).json({
            message: "User details updated successfully",
            success: true,
            userDetail,
        });

    } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

export const fetchUserDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const userDetail = await User.findOne({ _id: id });
        if (!userDetail) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ success: true, userDetail });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
}


export const fetchAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            success: true,
            users,
        })
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({
            success: false,
            message: "Server Error. Unable to fetch users.",
        });
    }
}
export const logout = async (req, res) => {
    try {
        res.clearCookie('token');
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            token,
            message: "Logged out successfully.",
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error.",
            success: false
        });
    }
};


export const adminLogin = async (req, res) => {
    try {
        const { name, password } = req.body;

        const admin = await Admin.findOne({ name });

        if (!admin) {
            return res.status(404).json({
                success: false,
                message: "Admin not found.",
            });
        }

        if (password != admin.password) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials.",
            });
        }

        const token = admin.setAuthToken();
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000
        })

        res.status(200).json({
            success: true,
            message: "Login successful",
            admin: { name: admin.name },
            token
        });


    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error.",
        });
    }
};


const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendOtp = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ success: false, message: 'Email is not registered' })
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const token = jwt.sign({ otp }, process.env.JWT_SECRET, { expiresIn: '10m' });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: `DKMart: Your Sign-In Verification Code for Secure Access`,
        text: `
            Dear User,
    
            Thank you for choosing DKMart! We are excited to have you on board. 
    
            As part of our commitment to providing a secure platform, we have generated a one-time password (OTP) to verify your identity and ensure only you can access your account.
    
            Your OTP is: **${otp}**
    
            Please note:
            - This OTP is valid for the next 10 minutes only.
            - Do not share this OTP with anyone, as it is unique to your account.
            - If you did not request this verification, please disregard this email.
    
            To proceed with logging into your account, simply enter this OTP on the DKMart platform.
    
            If you have any issues or need assistance, please feel free to reach out to our support team at anandofficialxsrc@gmail.com.
    
            Best regards,
            The DKMart Team
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: 'OTP sent successfully', token });


    } catch (error) {
        console.log("Error in sending otp  :  ", error)
        res.status(500).json({ message: 'Error sending OTP', error });
    }
}

export const verifyOtp = async (req, res) => {
    const { otp, token, email } = req.body;
    try {
        const user = await User.findOne({ email });
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.otp === otp) {
            res.status(201).json({ success: true, message: 'OTP verified successfully', user });
        } else {
            res.status(400).json({ message: 'Invalid OTP' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Invalid or expired token', error });
    }
}
