import { Models } from "node-appwrite";

export interface Patient extends Models.Document {
  fullName: string;
  email: string;
  password: string;
  age: number;
  birthDate: Date;
  contactNo: number;
  sex: Gender;
  medicalConcerns:  string[];
}

export interface Appointment extends Models.Document {
  patient: Patient;
  schedule: Date;
  status: Status;
  primaryPhysician: string;
  reason: string;
  note: string;
  userId: string;
  cancellationReason: string | null;
}