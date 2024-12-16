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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "text-[#6b26ff]";
      case "approved":
        return "text-[#56ff61]";
      case "cancelled":
        return "text-[#FF4F4E]";
      default:
        return "text-gray-500";
    }
  };
  
  
  return (
    <Table>
      <TableCaption>A list of your appointments.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className='text-center'>Status</TableHead>
          <TableHead>Appointment</TableHead>
          <TableHead>Service</TableHead>
          <TableHead>Reason</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {appointments.map((appointment: Document, index) => (
          <TableRow key={index}>
            <TableCell className={`${getStatusColor(appointment.status)} py-4 px-2 capitalize font-bold text-center rounded`}>{appointment.status}</TableCell>
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
            <TableCell>
              {appointment.reason}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserAppointmentsTable;