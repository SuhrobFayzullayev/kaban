import { Account, Client, Databases, ID } from 'appwrite'

const { APPWRITE_CLOUD_URL, APPWRITE_PROJECT_ID } = useRuntimeConfig().public
const client = new Client()
client.setEndpoint(APPWRITE_CLOUD_URL as string).setProject(APPWRITE_PROJECT_ID as string)

export const ACCOUNT = new Account(client)
export const DATABASE = new Databases(client)
export const UNIQUE_ID = ID
