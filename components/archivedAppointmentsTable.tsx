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
import UserInfoModal from "./UserInfoModal";

const ArchivedAppointmentsTable = () => {
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
      <TableCaption>End of archived appoinments</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="font-bold">Patient</TableHead>
          <TableHead className="text-center font-bold">Status</TableHead>
          <TableHead className="w-[175px] font-bold">Date and Time</TableHead>
          <TableHead className="font-bold">Service</TableHead>
          <TableHead className="font-bold">Note from Patient</TableHead>
          <TableHead className="font-bold">Reason</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {appointments
          .filter(appointment => {
            const appointmentDate = new Date(appointment.dateTime);
            const today = new Date();

            // Start of today (midnight)
            const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();

            // Include appointments from the past (kahapon and earlier)
            return appointmentDate.getTime() < startOfDay;
          })
          .sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime))
          .map((appointment, index) => (
            <TableRow key={index}>
              <TableCell className="underline"><UserInfoModal fullName={appointment.fullName} /></TableCell>
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
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default ArchivedAppointmentsTable;
