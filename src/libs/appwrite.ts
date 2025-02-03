import { Account, Client, Databases, ID } from 'appwrite'

const client = new Client()
client.setEndpoint('https://cloud.appwrite.io/v1' as string).setProject('679f75c00026e3414421' as string)

export const ACCOUNT = new Account(client)
export const DATABASE = new Databases(client)
export const UNIQUE_ID = ID.unique()
