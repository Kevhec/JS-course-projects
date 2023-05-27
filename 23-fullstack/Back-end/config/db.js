import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const db = await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.tcn3qqw.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
    )

    const url = `${db.connection.host}:${db.connection.port}`
    console.log(`[server]: MongoDB connected at ${url}`)
  } catch (error) {
    console.error(`[server]: Error connecting DB. Error Data: ${error.message}`)
    process.exit(1)
  }
}

export default connectDB
