import * as sdk from "node-appwrite";
import { Client as AppwriteClient, Account, Databases } from "appwrite";

console.log("Environment Variables:", process.env);

export const {
  NEXT_PUBLIC_DATABASE_ID: DATABASE_ID,
  NEXT_PUBLIC_PATIENT_COLLECTION_ID: PATIENT_COLLECTION_ID,
  NEXT_PUBLIC_APPOINTMENT_COLLECTINON_ID: APPOINTMENT_COLLECTION_ID,
  NEXT_PUBLIC_BUCKET_ID: BUCKET_ID,
  NEXT_PUBLIC_ENDPOINT: ENDPOINT,
} = process.env;

export const PROJECT_ID = '6720bdb0000d46711060';
export const API_KEY = 'standard_159534a7f79b111bd31cedb20df799035a1e4ad6bf419b039e07b2e3b0192fddea039233e4745820c58bbf6d382ef11e82375bfbbf47e650933133eeebf1d3f77416ca397b5e8523def47ac2c8728a2ecb501fc6b3b8d4122faa49b89f8928d4c30e26665cd91ecd0bd0c0b89a8da4aa678c0c61f84067a8b1f9cff2d6ad8aa4';

const serverClient = new sdk.Client();
serverClient
  .setEndpoint('https://cloud.appwrite.io/v1'!)
  .setProject(PROJECT_ID!)
  .setKey(API_KEY!);

export const databases = new sdk.Databases(serverClient);
export const storage = new sdk.Storage(serverClient);
export const functions = new sdk.Functions(serverClient);

export const client = new AppwriteClient();
client.setEndpoint('https://cloud.appwrite.io/v1').setProject(PROJECT_ID);

export const account = new Account(client);
export const frontendDatabases = new Databases(client);