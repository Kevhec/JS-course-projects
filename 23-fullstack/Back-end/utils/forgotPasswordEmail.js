import nodemailer from 'nodemailer'

export default async function forgotPasswordEmail ({ email, name, token }) {
  const transport = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_PORT,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS
    }
  })

  // Email template

  await transport.sendMail({
    from: 'Veterinary Clinic Pacient Administrator',
    to: email,
    subject: 'Recover your VCPA password',
    text: 'Recover your VCPA password',
    html: `
      <p>Hi ${name}, in order to recover your account please click on the next link </p>
      Local:
      <a href="${process.env.FRONTEND_URL}/forgotpassword/${token}"> Recover account</a>

      <p>If this wasn't you please ignore this message</p>
    `
  })
}
