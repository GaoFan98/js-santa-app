import nodemailer from 'nodemailer';
import emailConfig from '../config/emailConfig';
import { EmailData } from '../types';

const transporter = nodemailer.createTransport({
  host: emailConfig.host,
  port: emailConfig.port,
  auth: {
    user: emailConfig.user,
    pass: emailConfig.pass,
  },
});

const sendEmail = async (emailData: EmailData) => {
  try {
    await transporter.sendMail(emailData);
  } catch (error) {
    throw new Error('Email sending failed.');
  }
};

export default { sendEmail };
