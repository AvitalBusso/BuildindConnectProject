import React from 'react';
import emailjs from '@emailjs/browser';
import { Button } from '@mui/material';

function Email({ tenant }) {
  const emailContent =
    `Dear ${tenant.userName}!

  This message was sent to you from the Building Connection app.

  We noticed that you have not paid your rent for one or more months.
  Please arrange the payment immediately.

  Your manager's email: ${tenant.managerEmail}

  Thank you,
  Building Connect
  Connecting Communities, Managing Buildings! 🏢✨
  `
    ;


  const sendEmail = () => {
    const serviceId = "service_ID"; 
    const templateId = "template_ID"; 
    const publicKey = "YB2n9plR_9_n5ymry"

    if (!tenant.email || !tenant.userName) {
      console.error("Missing tenant details");
      return;
    }

    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!isValidEmail(tenant.email)) {
      console.error("Invalid email address:", tenant.email);
      return;
    }

    const templateParams = {
      from_name: "Building Connect",       // שם השולח
      from_email: "buildingconnect2024@gmail.com",  // כתובת מייל השולח
      to_name: tenant.userName,            // שם המקבל
      to_email: tenant.email,              // כתובת המייל של הדייר
      reply_to: tenant.managerMail, // כתובת תגובה
      message: emailContent,       // תוכן המייל
    };

    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log("Email sent successfully!", response);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  };


  return (
    <Button
      variant="contained"
      onClick={sendEmail}
      sx={{ marginTop: 3, bgcolor: '#a1e5c9', '&:hover': { backgroundColor: '#82c7aa' } }}
    >
      Send Email to {tenant.userName}
    </Button>
  );
}

export default Email;