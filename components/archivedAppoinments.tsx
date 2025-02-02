"use client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import ArchivedAppointmentsTable from "@/components/archivedAppointmentsTable"
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


export default function Archive() {
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
        return "text-[#2d698d]";
      case "approved":
        return "text-[#23346a]";
      case "cancelled":
        return "text-[#292839]";
      default:
        return "text-gray-500";
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(appointments.length / itemsPerPage);


  
  return (
    <section className="px-4 flex justify-between items-center h-full">
      <div className="flex flex-col gap-4">
        <Dialog>
          <DialogContent className="sm:max-w-[1000px] !rounded-xl bg-gray-300 max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Archived Appointments</DialogTitle>
            </DialogHeader>
            <div>
              {/* Pagination Logic */}
              <Table><TableCaption>
                {currentPage === totalPages ? "End of archived appointments" : ""}
              </TableCaption>
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
                  {/* Pagination State and Display */}
                  {appointments
                    .filter((appointment) => {
                      const appointmentDate = new Date(appointment.dateTime);
                      const today = new Date();

                      // Start of today (midnight)
                      const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();

                      // Include appointments from the past (kahapon and earlier)
                      return appointmentDate.getTime() < startOfDay;
                    })
                    .sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime))
                    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) // Show only 5 per page
                    .map((appointment, index) => (
                      <TableRow key={index}>
                        <TableCell className="underline">
                          <UserInfoModal fullName={appointment.fullName} />
                        </TableCell>
                        <TableCell
                          className={`${getStatusColor(appointment.status)} py-4 px-2 capitalize font-bold text-center rounded`}
                        >
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
                        <TableCell>{appointment.note}</TableCell>
                        <TableCell>{appointment.reason}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>

              {/* Pagination Controls */}
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 bg-gray-300 rounded ${currentPage === 1 ? "opacity-50" : "hover:bg-gray-400"}`}
                >
                  Previous
                </button>
                <span className="text-sm font-medium">
                  Page {currentPage} of {Math.ceil(appointments.length / itemsPerPage)}
                </span>
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 bg-gray-300 rounded ${currentPage === totalPages ? "opacity-50" : "hover:bg-gray-400"
                    }`}
                >
                  Next
                </button>
              </div>
            </div>
          </DialogContent>
          <DialogTrigger className="text-[#bae8e8]">View Archive</DialogTrigger>
        </Dialog>
      </div>
    </section>

  )
}