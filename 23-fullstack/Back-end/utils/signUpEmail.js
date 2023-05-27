import nodemailer from 'nodemailer'

export default async function signUpEmail ({ email, name, token }) {
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
    subject: 'Verify your account',
    text: 'Verify your account',
    html: `
      <p>Hi ${name}, Verify your VCPA account clicking on the next link</p>
      Local:
      <a href="${process.env.FRONTEND_URL}/verification/${token}"> Verify account</a>

      <p>If this wasn't you please ignore this message</p>
    `
  })
}
