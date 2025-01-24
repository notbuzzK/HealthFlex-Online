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
  const [isPastAppointmentsVisible, setIsPastAppointmentsVisible] = useState(false);

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
    <>
      <Table>
        <TableCaption>A list of your appointments.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='text-center'>Status</TableHead>
            <TableHead>Appointment</TableHead>
            <TableHead className='w-[300px]'>Service</TableHead>
            <TableHead>Note from Staff</TableHead>
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
            .map((appointment: Document, index) => (
              <TableRow
                key={index}
                className={
                  new Date(appointment.dateTime).toDateString() === new Date().toDateString()
                    ? "bg-blue-100" // Highlight for today's appointments
                    : ""
                }
              >
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

      <div className="mt-6">
        <button
          onClick={() => setIsPastAppointmentsVisible(!isPastAppointmentsVisible)}
          className="bg-gray-800 text-white py-2 px-4 rounded-2xl text-sm"
        >
          {isPastAppointmentsVisible ? "Hide Past Appointments" : "Show Past Appointments"}
        </button>
        {isPastAppointmentsVisible && (
          <Table className="mt-4">
            <TableCaption>A list of your past appointments.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Status</TableHead>
                <TableHead>Appointment</TableHead>
                <TableHead className="w-[300px]">Service</TableHead>
                <TableHead>Note from Staff</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments
                .filter(appointment => {
                  const appointmentDate = new Date(appointment.dateTime);
                  const today = new Date();
                  const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
                  return appointmentDate.getTime() < startOfDay;
                })
                .sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime())
                .map((appointment, index) => (
                  <TableRow key={index}>
                    <TableCell className={`${getStatusColor(appointment.status)} py-4 px-2 capitalize font-bold text-center rounded`}>
                      {appointment.status}
                    </TableCell>
                    <TableCell>
                      {new Date(appointment.dateTime).toLocaleString("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </TableCell>
                    <TableCell>
                      {[...appointment.lab, ...appointment.packages, ...appointment.consultation].join(", ")}
                    </TableCell>
                    <TableCell>{appointment.reason}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        )}
      </div>
    </>
  );
};

export default UserAppointmentsTable;