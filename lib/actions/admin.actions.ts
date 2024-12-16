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

export async function updateAppointment({ id, status, dateTime, reason }) {
  try {
    const updatedAppointment = await databases.updateDocument(
      DATABASE_ID,
      APPOINTMENT_COLLECTION_ID,
      id,
      { status, dateTime, reason }
    );
    return updatedAppointment;
  } catch (error) {
    console.error("Error updating appointment:", error);
    throw error;
  }
}

export async function getDailyAnalytics() {
  try {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString();
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1).toISOString();

    const response = await databases.listDocuments(
      DATABASE_ID,
      APPOINTMENT_COLLECTION_ID,
      [
        sdk.Query.greaterThanEqual("dateTime", startOfDay),
        sdk.Query.lessThan("dateTime", endOfDay),
      ]
    );

    const appointments = response.documents;

    // Get unique users and count services
    const uniqueUsers = new Set(appointments.map((appointment) => appointment.userId));
    const totalServices = appointments.reduce((acc, appointment) => {
      const services = [...appointment.lab, ...appointment.packages, ...appointment.consultation];
      return acc + services.length;
    }, 0);

    return {
      userCount: uniqueUsers.size,
      totalServices,
      details: appointments, // For more information in the dialog
    };
  } catch (error) {
    console.error("Error fetching daily analytics:", error);
    throw error;
  }
}