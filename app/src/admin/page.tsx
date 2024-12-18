"use client";

import AdminAppointmentsTable from "@/components/adminAppointmentTable";
import { StatCard } from "@/components/StatCard";
import { useState, useEffect } from 'react';
import { getAllAppointments } from '@/lib/actions/admin.actions';
import DailyAnalytics from "@/components/getDailyAnalytics";
import AdminTools from "@/components/AdminTools";

export default function Admin() {

  const [appointments, setAppointments] = useState([]);
  const [scheduledCount, setScheduledCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [cancelledCount, setCancelledCount] = useState(0);

  useEffect(() => {
    const fetchAppointments = async () => {
      const appointments = await getAllAppointments();
      setAppointments(appointments);

      const scheduled = appointments.filter((appointment) => appointment.status === 'approved');
      setScheduledCount(scheduled.length);

      const pending = appointments.filter((appointment) => appointment.status === 'pending');
      setPendingCount(pending.length);

      const cancelled = appointments.filter((appointment) => appointment.status === 'cancelled');
      setCancelledCount(cancelled.length);
    };

    fetchAppointments();
  }, []);

  return (
    <div className="bg-gradient-to-br remove-scrollbar from-[#253369] to-[#061133] text-black">
      <section className="container min-h-screen remove-scrollbar grid grid-cols-6 grid-rows-4">

        {/* appointment stats */}
        <div className="col-span-6">
          <div className="flex justify-between items-center m-4">
            <p className="text-4xl font-bold my-3 text-white">Hi there, Admin</p>
            <AdminTools />
          </div>
          <div className="grid grid-cols-10 gap-4 m-4 row-span-1">
            {/* sceduled appointments */}
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