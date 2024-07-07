import nodemailer from 'nodemailer';
import config from '../config';
export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com.',
    port: 587,
    secure: config.node_env === 'production' ? true : false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: 'tahsin.follen@gmail.com',
      pass: 'wsdm fmfa ixmy fcgl',
    },
  });

  await transporter.sendMail({
    from: 'tahsin.follen@gmail.com',
    to,
    subject: 'Reset your password within 10 minutes',
    text: '',
    html,
  });
};
