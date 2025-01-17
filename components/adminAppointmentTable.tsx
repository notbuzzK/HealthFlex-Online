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
import UserInfoModal from "./UserInfoModal";

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
          <TableHead className="font-bold">Note from Patient</TableHead>
          <TableHead className="font-bold">Reason</TableHead>
          <TableHead className="text-center font-bold ">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {appointments
          .filter(appointment => {
            const appointmentDate = new Date(appointment.dateTime);
            const today = new Date();

            // Start and end of today
            const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
            const endOfDay = startOfDay + 86400000 - 1;

            // Include appointments from today (regardless of time) and future
            return appointmentDate.getTime() >= startOfDay;
          })
          .sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime))
          .map((appointment, index) => (
            <TableRow
              key={index}
              className={
                new Date(appointment.dateTime).toDateString() === new Date().toDateString()
                  ? "bg-blue-100" // Highlight for today's appointments
                  : ""
              }
            >
              <TableCell className="underline">
                <UserInfoModal fullName={appointment.fullName} />
              </TableCell>
              <TableCell
                className={`${getStatusColor(appointment.status)} py-4 px-2 capitalize font-bold text-center rounded`}
              >
                {appointment.status}
              </TableCell>
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