import nodemailer from "nodemailer";

// Create reusable transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_APP_PASSWORD,
    },
  });
};

// Send appointment notification to admin
export const sendAppointmentNotification = async (appointment) => {
  try {
    console.log("📧 Attempting to send appointment notification...");
    console.log("Email Config - USER:", process.env.MAIL_USER ? "✓ SET" : "✗ NOT SET");
    console.log("Email Config - PASSWORD:", process.env.MAIL_APP_PASSWORD ? "✓ SET" : "✗ NOT SET");
    console.log("Email Config - ADMIN_EMAIL:", process.env.ADMIN_EMAIL);

    if (!process.env.MAIL_USER || !process.env.MAIL_APP_PASSWORD) {
      console.error("❌ Email credentials not configured. Skipping email notification.");
      return { success: false, reason: "Email not configured" };
    }

    const transporter = createTransporter();

    // Test connection
    console.log("🔗 Testing email connection...");
    await transporter.verify();
    console.log("✓ Email connection verified");

    const appointmentDate = new Date(appointment.date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center;">
          <h1 style="margin: 0; font-size: 28px;">🏥 New Appointment Booking</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">MedCare Clinic Management System</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; border: 1px solid #e9ecef;">
          <p style="color: #495057; margin-top: 0; font-size: 14px;">A new appointment has been received and requires your attention.</p>
          
          <div style="background: white; padding: 20px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #667eea;">
            <h2 style="color: #333; margin-top: 0; font-size: 18px;">Patient Information</h2>
            
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr style="border-bottom: 1px solid #e9ecef;">
                <td style="padding: 12px 0; font-weight: bold; color: #495057; width: 40%;">Patient Name:</td>
                <td style="padding: 12px 0; color: #333;">${appointment.name}</td>
              </tr>
              <tr style="border-bottom: 1px solid #e9ecef;">
                <td style="padding: 12px 0; font-weight: bold; color: #495057;">Email:</td>
                <td style="padding: 12px 0; color: #333;">${appointment.email}</td>
              </tr>
              <tr style="border-bottom: 1px solid #e9ecef;">
                <td style="padding: 12px 0; font-weight: bold; color: #495057;">Phone:</td>
                <td style="padding: 12px 0; color: #333;">${appointment.phone}</td>
              </tr>
              <tr style="border-bottom: 1px solid #e9ecef;">
                <td style="padding: 12px 0; font-weight: bold; color: #495057;">Department:</td>
                <td style="padding: 12px 0; color: #333;">${appointment.department}</td>
              </tr>
              <tr style="border-bottom: 1px solid #e9ecef;">
                <td style="padding: 12px 0; font-weight: bold; color: #495057;">Preferred Date:</td>
                <td style="padding: 12px 0; color: #333;">${appointmentDate}</td>
              </tr>
              <tr style="border-bottom: 1px solid #e9ecef;">
                <td style="padding: 12px 0; font-weight: bold; color: #495057;">Preferred Time:</td>
                <td style="padding: 12px 0; color: #333;">${appointment.time}</td>
              </tr>
              <tr style="border-bottom: 1px solid #e9ecef;">
                <td style="padding: 12px 0; font-weight: bold; color: #495057;">Status:</td>
                <td style="padding: 12px 0;"><span style="background: #fff3cd; color: #856404; padding: 4px 8px; border-radius: 4px; font-weight: bold;">${appointment.status.toUpperCase()}</span></td>
              </tr>
              <tr>
                <td style="padding: 12px 0; font-weight: bold; color: #495057;">Booking Time:</td>
                <td style="padding: 12px 0; color: #333;">${new Date(appointment.createdAt).toLocaleString()}</td>
              </tr>
            </table>
          </div>

          ${
            appointment.message
              ? `
            <div style="background: white; padding: 20px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #764ba2;">
              <h2 style="color: #333; margin-top: 0; font-size: 16px;">Patient Message</h2>
              <p style="color: #555; line-height: 1.6; margin: 0;">${appointment.message}</p>
            </div>
          `
              : ""
          }

          <div style="background: #e7f3ff; padding: 15px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #2196F3;">
            <p style="margin: 0; color: #1565c0; font-size: 14px;">
              <strong>📌 Action Required:</strong> Please review and confirm this appointment in your admin dashboard to send a confirmation email to the patient.
            </p>
          </div>

          <hr style="border: none; border-top: 1px solid #e9ecef; margin: 20px 0;">
          
          <p style="color: #6c757d; font-size: 12px; margin: 10px 0; text-align: center;">
            This is an automated email from MedCare Appointment System. Please do not reply to this email.
          </p>
        </div>
      </div>
    `;

    const mailOptions = {
      from: `"${process.env.MAIL_FROM_NAME || "MedCare"}" <${process.env.MAIL_USER}>`,
      to: process.env.ADMIN_EMAIL || process.env.MAIL_USER,
      subject: `New Appointment Booking – MedCare | ${appointment.department}`,
      html: htmlContent,
    };

    console.log("📬 Sending email to:", mailOptions.to);
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Appointment notification email sent successfully! Message ID:", info.messageId);
    return { success: true };
  } catch (error) {
    console.error("❌ Error sending appointment email:", error.message);
    console.error("Full error:", error);
    return { success: false, reason: error.message };
  }
};

// Send appointment confirmation email to patient
export const sendAppointmentConfirmation = async (appointment, status = "confirmed") => {
  try {
    if (!process.env.MAIL_USER || !process.env.MAIL_APP_PASSWORD) {
      console.warn("Email credentials not configured. Skipping confirmation email.");
      return { success: false, reason: "Email not configured" };
    }

    const transporter = createTransporter();

    const appointmentDate = new Date(appointment.date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const statusMessage =
      status === "confirmed"
        ? "Your appointment has been confirmed!"
        : status === "cancelled"
          ? "Your appointment has been cancelled."
          : "Your appointment status has been updated.";

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center;">
          <h1 style="margin: 0; font-size: 28px;">🏥 Appointment ${status.charAt(0).toUpperCase() + status.slice(1)}</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">MedCare Clinic</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; border: 1px solid #e9ecef;">
          <p style="color: #495057; margin-top: 0; font-size: 14px;">Dear ${appointment.name},</p>
          
          <p style="color: #333; font-size: 14px; line-height: 1.6;">
            ${statusMessage}
          </p>

          <div style="background: white; padding: 20px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #667eea;">
            <h2 style="color: #333; margin-top: 0; font-size: 16px;">Appointment Details</h2>
            
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr style="border-bottom: 1px solid #e9ecef;">
                <td style="padding: 10px 0; font-weight: bold; color: #495057; width: 40%;">Department:</td>
                <td style="padding: 10px 0; color: #333;">${appointment.department}</td>
              </tr>
              <tr style="border-bottom: 1px solid #e9ecef;">
                <td style="padding: 10px 0; font-weight: bold; color: #495057;">Date:</td>
                <td style="padding: 10px 0; color: #333;">${appointmentDate}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #495057;">Time:</td>
                <td style="padding: 10px 0; color: #333;">${appointment.time}</td>
              </tr>
            </table>
          </div>

          <div style="background: #e8f5e9; padding: 15px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #4caf50; text-align: center;">
            <p style="margin: 0; color: #2e7d32; font-size: 14px; font-weight: bold;">
              ✓ Status: <span style="text-transform: uppercase;">${status}</span>
            </p>
          </div>

          <p style="color: #666; font-size: 14px; line-height: 1.6;">
            If you need to reschedule or cancel your appointment, please contact us as soon as possible.
          </p>

          <hr style="border: none; border-top: 1px solid #e9ecef; margin: 20px 0;">
          
          <p style="color: #6c757d; font-size: 12px; margin: 10px 0; text-align: center;">
            Thank you for choosing MedCare. We look forward to serving you!
          </p>
        </div>
      </div>
    `;

    const mailOptions = {
      from: `"${process.env.MAIL_FROM_NAME || "MedCare"}" <${process.env.MAIL_USER}>`,
      to: appointment.email,
      subject: `Appointment ${status.charAt(0).toUpperCase() + status.slice(1)} – MedCare`,
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Appointment confirmation email sent:", info.messageId);
    return { success: true };
  } catch (error) {
    console.error("Error sending confirmation email:", error.message);
    return { success: false, reason: error.message };
  }
};
