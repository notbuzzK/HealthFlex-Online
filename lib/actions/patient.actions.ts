import { Client, Query, Users } from "node-appwrite";

// Create an instance of the Appwrite client
const client = new Client();

// Create an instance of the Users class with the Appwrite client
const users = new Users(client);

export const createUser = async (user: CreateUserParams) => {
  try {
    
  } catch (error) {
    if(error && error?.code ===409) {
      const existingUser = await users.list({
        Query.equal('email', [user.email])
      })
  }
}