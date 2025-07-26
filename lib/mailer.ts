import nodemailer from "nodemailer"

export async function sendMail({ to, subject, html }: { to: string; subject: string; html: string }) {
  const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    auth:{
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,

    }
  })

  await transporter.sendMail({
    from: process.env.SENDER_EMAIL,
    to,
    subject,
    html,
  })
}
