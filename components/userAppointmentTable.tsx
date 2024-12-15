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

const UserAppointmentsTable = () => {
  const [appointments, setAppointments] = useState<Document[]>([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const user = await account.get();
      const userId = user.$id;
      const appointments = await getUserAppointments(userId);
      setAppointments(appointments);
    };
    fetchAppointments();
  }, []);
  
  
  return (
    <Table>
      <TableCaption>A list of your appointments.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Status</TableHead>
          <TableHead>Appointment</TableHead>
          <TableHead>Service</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {appointments.map((appointment: Document, index) => (
          <TableRow key={index}>
            <TableCell className='text-green-500'>{appointment.status}</TableCell>
            <TableCell>
              {new Date(appointment.dateTime).toLocaleString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
              })}
            </TableCell>
            <TableCell>
              {[...appointment.lab, ...appointment.packages, ...appointment.consultation].join(', ')}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserAppointmentsTable;