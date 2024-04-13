import { connectToDatabase } from "../database";
import User from "../models/User";

export async function createUser(user){
  try {
    await connectToDatabase()
    const newUser = await User.create(user)
    return JSON.parse(JSON.stringify(newUser))

  } catch (error) {
    throw error
  }
}

export async function getUserByUsername(username) {
  try {
    await connectToDatabase()
    const user = await User.findOne({username})
    return JSON.parse(JSON.stringify(user))

  } catch (error) {
    throw error
  }
}