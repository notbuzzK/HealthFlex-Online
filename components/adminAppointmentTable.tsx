import { getUserAppointments } from '@/lib/actions/patient.actions';
import { account } from "@/lib/appwrite.config";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from "react";
import { getAllAppointments } from '@/lib/actions/admin.actions';

const AdminAppointmentsTable = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const appointments = await getAllAppointments();
      setAppointments(appointments);
    };
    fetchAppointments();
  }, []);

  
  return (
    <Table>
      <TableCaption>A list of recent appointments.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Patient</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date and Time</TableHead>
          <TableHead>Service</TableHead>
          <TableHead>Reason</TableHead>
          <TableHead>Notes</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {appointments.map((appointment, index) => (
            <TableRow key={index}>
              <TableCell>{appointment.fullName  }</TableCell>
              <TableCell>{appointment.status}</TableCell>
              <TableCell>{new Date(appointment.dateTime).toLocaleString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
              })}</TableCell>
              <TableCell>{[...appointment.lab, ...appointment.packages, ...appointment.consultation].join(', ')}</TableCell>
              <TableCell>{appointment.reason}</TableCell>
              <TableCell>{appointment.note}</TableCell>
              <TableCell className="text-right">Actions</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default AdminAppointmentsTable;