"use client"

import { account, databases } from "@/lib/appwrite.config";
import * as sdk from "node-appwrite";
import { Query } from "appwrite";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { userLogout } from "./patient.actions";

const DATABASE_ID = '6720cc9c000049efcd3c';
const PATIENT_COLLECTION_ID = '6720ccbd0028468dee7e';
const APPOINTMENT_COLLECTION_ID = '6720d51d0006e3cf342e';
const ADMIN_COLLECTION_ID = '67628aab0039de9624ee';

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

export async function adminLogin(values, router) {
  try {
    

    const response = await databases.getDocument(
      DATABASE_ID,
      ADMIN_COLLECTION_ID, 
      '67628b2e000f93b61eb6', 
      [
        Query.select(['passkey'])
      ]
    );

    const storedPasskey = (await response.passkey);

    
    const placeholder = "+";
    const enteredPasskey = `${placeholder}${values.passkey}`;
    
    console.log(enteredPasskey);
    // Check if the passkey matches
    if (enteredPasskey === storedPasskey) {
      toast.success("Login successful!");
      // Create a session for admin
      await account.createEmailPasswordSession(
        "admin@gmail.com", // Email
        "adminpassword" // Password
      );
      // Redirect to admin page
      router.push("/src/admin");
      return { success: true };
    } else {
      toast.error("Invalid passkey. Access denied.");
      router.push("/src/login");
      return { success: false };
    }
  } catch (error) {
    console.error("Error logging in:", error);
    toast.error("Failed to login. Please try again.");
    router.push("/src/login"); // Redirect to login page on failure
  }
}

export async function updatePasskey(values){
  const placeholder = "+";
    const passkey = `${placeholder}${values.passkey}`;
  
    
    const result = await databases.updateDocument(
      DATABASE_ID, // databaseId
      ADMIN_COLLECTION_ID, // collectionId
      '67628b2e000f93b61eb6', // documentId
      {
        passkey
      }, // data (optional)
  );
}

export async function getUserInfo(fullName: string) {
  console.log("Querying fullName:", fullName); // Log the input value

  const userDocument = await databases.listDocuments(
    DATABASE_ID,
    PATIENT_COLLECTION_ID,
    [
      Query.equal("fullName", fullName),
    ]
  );
  
  if (!userDocument.documents.length) {
    throw new Error("No user found with this fullName");
  }

  return userDocument.documents[0];
}
