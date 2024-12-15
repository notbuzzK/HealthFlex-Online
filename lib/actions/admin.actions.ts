"use client"

import { account, databases } from "@/lib/appwrite.config";
import * as sdk from "node-appwrite";
import { Query } from "appwrite";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const DATABASE_ID = '6720cc9c000049efcd3c';
const PATIENT_COLLECTION_ID = '6720ccbd0028468dee7e';
const APPOINTMENT_COLLECTION_ID = '6720d51d0006e3cf342e';

export async function getAllAppointments() {
  try {
    const appointments = await databases.listDocuments(
      DATABASE_ID,
      APPOINTMENT_COLLECTION_ID,
      [
        Query.orderDesc('$createdAt'),
      ]
    );
    return appointments.documents;
  } catch (error) {
    console.error("Error fetching appointments:", error);
    throw error;
  }
}