import { useEffect, useState } from "react";
import { getAllAppointments } from '@/lib/actions/admin.actions';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AppointmentModal from './AppointmentModal';

const AdminAppointmentsTable = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const appointments = await getAllAppointments();
      setAppointments(appointments);
    };
    fetchAppointments();
  }, []);

  const refreshAppointments = async () => {
    const updatedAppointments = await getAllAppointments();
    setAppointments(updatedAppointments);
  };

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
      <TableCaption>A list of recent appointments.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="font-bold">Patient</TableHead>
          <TableHead className="text-center font-bold">Status</TableHead>
          <TableHead className="w-[175px] font-bold">Date and Time</TableHead>
          <TableHead className="font-bold">Service</TableHead>
          <TableHead className="font-bold">Notes</TableHead>
          <TableHead className="font-bold">Reason</TableHead>
          <TableHead className="text-center font-bold ">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {appointments.map((appointment, index) => (
          <TableRow key={index}>
            <TableCell>{appointment.fullName}</TableCell>
            <TableCell className={`${getStatusColor(appointment.status)} py-4 px-2 capitalize font-bold text-center rounded`}>{appointment.status}</TableCell>
            <TableCell>
              {new Date(appointment.dateTime).toLocaleString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
              })}
            </TableCell>
            <TableCell>
              {[...appointment.lab, ...appointment.packages, ...appointment.consultation].join(', ')}
            </TableCell>
            <TableCell>{appointment.note}</TableCell>
            <TableCell>{appointment.reason}</TableCell>
            <TableCell className="text-right">
              <AppointmentModal
                appointment={appointment}
                onUpdate={refreshAppointments} // Refresh table on update
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AdminAppointmentsTable;
