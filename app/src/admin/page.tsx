"use client";

import AdminAppointmentsTable from "@/components/adminAppointmentTable";
import { StatCard } from "@/components/StatCard";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


export default function Admin() {
  return (
    <div className="bg-gradient-to-br remove-scrollbar from-[#253369] to-[#061133] text-black">
      <section className="container min-h-screen remove-scrollbar grid grid-cols-6 grid-rows-4">

        {/* appointment stats */}
        <div className="col-span-6">
          <p className="text-4xl font-bold my-3 text-white">Hi there, Admin</p>
          <div className="grid grid-cols-10 gap-4 m-4 row-span-1">
            {/* sceduled appointments */}
            <section className="col-span-2">
              <StatCard
                type="appointments"
                count={1}
                label="Scheduled appointments"
              />
            </section>

            {/* pending appointments */}
            <section className="col-span-2">
              <StatCard
                type="pending"
                count={2}
                label="Pending appointments"
              />
            </section>

            {/* cancelled appointments */}
            <section className="col-span-2">
              <StatCard
                type="cancelled"
                count={3}
                label="Cancelled appointments"
              />
            </section>

            {/* daily stats */}
            <section className="col-span-4 bg-gradient-to-br from-[#D9D9D9] to-[#737373] rounded-xl p-4">
              
            </section>
            
          </div>
        </div>

        

        {/* appointments */}
        <div className="col-span-6 row-span-3 bg-gradient-to-br from-[#D9D9D9] to-[#737373] rounded-xl m-4 p-4">
          
          <AdminAppointmentsTable />

        </div>
      </section>
    </div>
  );
}