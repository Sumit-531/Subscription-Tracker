import nodemailer from "nodemailer";
import { EMAIL_PASSWORD } from "./env.js";

export const accountEmail = "sumitchakrabortyking@gmail.com";

// Configure a transpoter using gmail as a service
const transpoter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: accountEmail,
        pass: EMAIL_PASSWORD,
    },
});

export default transpoter;