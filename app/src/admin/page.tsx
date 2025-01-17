"use client";

import AdminAppointmentsTable from "@/components/adminAppointmentTable";
import { StatCard } from "@/components/StatCard";
import { useState, useEffect } from 'react';
import { getAllAppointments } from '@/lib/actions/admin.actions';
import DailyAnalytics from "@/components/getDailyAnalytics";
import AdminTools from "@/components/AdminTools";
import Archive from "@/components/archivedAppoinments";


export default function Admin() {

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const appointments = await getAllAppointments();
      setAppointments(appointments); // Keep raw data intact
    };

    fetchAppointments();
  }, []);

  // Filter future appointments
  const today = new Date();
  const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();

  const futureAppointments = appointments.filter(
    (appointment) => new Date(appointment.dateTime).getTime() >= startOfDay
  );

  // Count based on filtered future appointments
  const scheduledCount = futureAppointments.filter(
    (appointment) => appointment.status === "approved"
  ).length;

  const pendingCount = futureAppointments.filter(
    (appointment) => appointment.status === "pending"
  ).length;

  const cancelledCount = futureAppointments.filter(
    (appointment) => appointment.status === "cancelled"
  ).length;


  return (
    <div className="bg-gradient-to-br remove-scrollbar from-[#253369] to-[#061133] text-black">
      <section className="container min-h-screen remove-scrollbar grid grid-cols-6 grid-rows-4">

        {/* appointment stats */}
        <div className="col-span-6">
          <div className="flex justify-between items-center m-4">
            <p className="text-4xl font-bold my-3 text-white">Hi there, Admin</p>
            <div className="flex flex-row">
              <Archive />
              <AdminTools />
            </div>
          </div>
          <div className="grid grid-cols-10 gap-4 m-4 row-span-1">
            {/* scheduled appointments */}
            <section className="col-span-2">
              <StatCard
                type="appointments"
                count={scheduledCount}
                label="Approved appointments"
              />
            </section>

            {/* pending appointments */}
            <section className="col-span-2">
              <StatCard
                type="pending"
                count={pendingCount}
                label="Pending appointments"
              />
            </section>

            {/* cancelled appointments */}
            <section className="col-span-2">
              <StatCard
                type="cancelled"
                count={cancelledCount}
                label="Cancelled appointments"
              />
            </section>

            {/* daily stats */}
            <section className="col-span-4 bg-gradient-to-br from-[#D9D9D9] to-[#737373] rounded-xl">
              <DailyAnalytics />
            </section>

          </div>
        </div>

        {/* appointments */}
        <div className="col-span-6 row-span-3 bg-gradient-to-br from-[#D9D9D9] to-[#737373] rounded-xl m-4 p-4 overflow-y-auto max-h-[500px]">

          <AdminAppointmentsTable />

        </div>
      </section>
    </div>
  );
}