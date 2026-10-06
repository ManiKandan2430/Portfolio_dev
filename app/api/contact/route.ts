import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // To send an email, configure SMTP credentials via .env in production
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: Number(process.env.SMTP_PORT) === 465,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      });

      const adminMailOptions = {
        from: process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER,
        to: process.env.SMTP_USER,
        subject: `New Project Inquiry from ${data.name}`,
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
            <div style="background-color: #f8f9fa; padding: 20px; border-bottom: 2px solid #c8a96e;">
              <h2 style="margin: 0; color: #1a202c;">New Contact Request</h2>
            </div>
            <div style="padding: 20px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee; width: 35%;"><strong>Name:</strong></td><td style="padding: 10px 0; border-bottom: 1px solid #eee;">${data.name}</td></tr>
                <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Company:</strong></td><td style="padding: 10px 0; border-bottom: 1px solid #eee;">${data.company || 'N/A'}</td></tr>
                <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Email:</strong></td><td style="padding: 10px 0; border-bottom: 1px solid #eee;"><a href="mailto:${data.email}" style="color: #0066cc;">${data.email}</a></td></tr>
                <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td><td style="padding: 10px 0; border-bottom: 1px solid #eee;">${data.phone || 'N/A'}</td></tr>
                <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Service Required:</strong></td><td style="padding: 10px 0; border-bottom: 1px solid #eee;">${data.service || 'N/A'}</td></tr>
                <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Budget Range:</strong></td><td style="padding: 10px 0; border-bottom: 1px solid #eee;">${data.budget || 'N/A'}</td></tr>
              </table>
              <h3 style="margin-top: 24px; color: #1a202c;">Project Description:</h3>
              <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #c8a96e; border-radius: 4px; white-space: pre-wrap;">
                ${data.description || 'N/A'}
              </div>
            </div>
          </div>
        `,
      };

      const userMailOptions = {
        from: process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER,
        to: data.email,
        subject: `Thank you for contacting!`,
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); overflow: hidden;">
            <div style="background-color: #0f172a; padding: 30px 20px; text-align: center;">
              <h2 style="margin: 0; color: #c8a96e; font-size: 24px; letter-spacing: 1px;">Manikandan S</h2>
            </div>
            <div style="padding: 30px;">
              <p style="font-size: 16px;">Hi <strong>${data.name}</strong>,</p>
              <p style="font-size: 16px;">Thank you for reaching out! I have successfully received your inquiry.</p>
              <p style="font-size: 16px;">I am reviewing your requirements and will get back to you within 24 hours.</p>
              <div style="margin-top: 30px; padding: 20px; background-color: #f8f9fa; border-radius: 8px;">
                <p style="margin: 0 0 10px 0; color: #1a202c;"><strong>Your Request Summary:</strong></p>
                <p style="margin: 5px 0; font-size: 14px;"><strong>Service:</strong> ${data.service || 'General Inquiry'}</p>
                <p style="margin: 5px 0; font-size: 14px;"><strong>Budget:</strong> ${data.budget || 'N/A'}</p>
              </div>
              <p style="font-size: 16px; margin-top: 30px;">I look forward to discussing how I can help bring your project to life!</p>
              <p style="font-size: 16px; margin-bottom: 0;">Best Regards,<br/><strong style="color: #c8a96e;">Manikandan S</strong></p>
            </div>
          </div>
        `,
      };

      await Promise.all([
        transporter.sendMail(adminMailOptions),
        transporter.sendMail(userMailOptions)
      ]);
    } else {
      console.warn('SMTP Credentials missing. Email not sent.');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact Form Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to process request.' }, { status: 500 });
  }
}
