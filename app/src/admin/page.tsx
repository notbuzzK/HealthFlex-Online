"use client";

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
      <section className="container min-h-screen remove-scrollbar grid grid-cols-4 grid-rows-4">

        {/* appointment stats */}
        <div className="col-span-4 row-span-1">
          <p className="text-4xl font-bold my-3 text-white row-span-1">Hi there, Admin</p>
          <div className="grid grid-cols-3 gap-4 m-4">
            
            {/* sceduled appointments */}
            <section className="col-span-1">
              <StatCard
                type="appointments"
                count={1}
                label="Scheduled appointments"
              />
            </section>

            {/* pending appointments */}
            <section className="col-span-1">
              <StatCard
                type="pending"
                count={2}
                label="Pending appointments"
              />
            </section>

            {/* cancelled appointments */}
            <section className="col-span-1">
              <StatCard
                type="cancelled"
                count={3}
                label="Cancelled appointments"
              />
            </section>
          </div>
        </div>

        {/* appointments */}
        <div className="col-span-4 row-span-3 bg-gradient-to-br from-[#D9D9D9] to-[#737373] rounded-xl m-4 p-4">
          <Table>
            <TableCaption>A list of appointments.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Appointment</TableHead>
                <TableHead>Service</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">1</TableCell>
                <TableCell>Jon Ramil B. Alberto</TableCell>
                <TableCell>Pending</TableCell>
                <TableCell>Dec 21, 2024: 09:00 AM</TableCell>
                <TableCell>Consultation</TableCell>
                <TableCell className="text-right text-green-400 font-bold">Set Status</TableCell>
              </TableRow>
            </TableBody>
          </Table>

        </div>
      </section>
    </div>
  );
}