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
      try {
        const appointments = await getAllAppointments();
        setAppointments(appointments);
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
      }
    };
    fetchAppointments();
  }, []);

  const refreshAppointments = async () => {
    try {
      const updatedAppointments = await getAllAppointments();
      setAppointments(updatedAppointments);
    } catch (error) {
      console.error("Failed to refresh appointments:", error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "text-[#2d698d]";
      case "approved":
        return "text-[#23346a]";
      case "cancelled":
        return "text-[#292839]";
      default:
        return "text-gray-500";
    }
  };

  return (
    <Table>
      <TableCaption>End of list means no more appointments.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="font-bold">Patient</TableHead>
          <TableHead className="text-center font-bold">Status</TableHead>
          <TableHead className="w-[175px] font-bold">Date and Time</TableHead>
          <TableHead className="font-bold">Service</TableHead>
          <TableHead className="font-bold">Note from Patient</TableHead>
          <TableHead className="font-bold">Reason</TableHead>
          <TableHead className="text-center font-bold">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {appointments.length > 0 ? (
          appointments
            .filter(appointment => {
              const appointmentDate = new Date(appointment.dateTime);
              const today = new Date();

              // Start and end of today
              const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
              const endOfDay = startOfDay + 86400000 - 1;

              // Include appointments from today (regardless of time) and future
              return appointmentDate.getTime() >= startOfDay;
            })
            .sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime())
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
                  <UserInfoModal fullName={appointment.fullName || "Unknown"} />
                </TableCell>
                <TableCell
                  className={`${getStatusColor(appointment.status)} py-4 px-2 capitalize font-bold text-center rounded`}
                >
                  {appointment.status || "Unknown"}
                </TableCell>
                <TableCell>
                  {appointment.dateTime
                    ? new Date(appointment.dateTime).toLocaleString('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                      })
                    : "No date provided"}
                </TableCell>
                <TableCell>
                  {[
                    ...(appointment.lab || []), 
                    ...(appointment.packages || []), 
                    ...(appointment.consultation || []), 
                    ...(appointment.selectedInclusions || [])
                  ].join(', ') || "No services selected"}
                </TableCell>
                <TableCell>{appointment.note || "No notes"}</TableCell>
                <TableCell>{appointment.reason}</TableCell>
                <TableCell className="text-right">
                  <AppointmentModal
                    appointment={appointment}
                    onUpdate={refreshAppointments} // Refresh table on update
                  />
                </TableCell>
              </TableRow>
            ))
        ) : (
          <TableRow>
            <TableCell colSpan={7} className="text-center">
              No appointments found.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default AdminAppointmentsTable;
