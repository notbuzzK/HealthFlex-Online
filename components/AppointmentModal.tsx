import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { updateAppointment } from "@/lib/actions/admin.actions"; // Function to update appointment
import { toast } from "sonner";
import { SmartDatetimeInput } from "@/components/extension/smart-date-time-input";

export default function AppointmentModal({ appointment, onUpdate }) {
  const [status, setStatus] = useState(appointment.status || "pending");
  const [dateTime, setDateTime] = useState(appointment.dateTime || "");
  const [reason, setReason] = useState(appointment.reason || "");

  const handleUpdate = async () => {
    try {
      await updateAppointment({
        id: appointment.$id,
        status,
        dateTime,
        reason,
      });
      toast.success("Appointment updated successfully!");
      onUpdate(); // Refresh table data
    } catch (error) {
      console.error("Error updating appointment:", error);
      toast.error("Failed to update appointment.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-2xl bg-[#E2C044]">Schedule</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-gradient-to-br from-[#D9D9D9] to-[#737373] !rounded-2xl">
        <DialogHeader>
          <DialogTitle>Edit Appointment</DialogTitle>
          <DialogDescription>Update the details of the appointment.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {/* Status Field */}
          <div>
            <label className="block text-md font-medium ">Status</label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="bg-gradient-to-r from-[#253369] to-[#061133] text-white rounded">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="bg-slate-300 rounded-xl">
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* DateTime Field */}
          <div>
            <label className="block text-md font-medium">Date and Time</label>
            <Input
              type="datetime-local"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              className="bg-gradient-to-r from-[#253369] to-[#061133] !text-white rounded"
            />
          </div>
          {/* Reason Field */}
          <div>
            <label className="block text-md font-medium">Reason</label>
            <Textarea
              placeholder="leave empty if no reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="bg-gradient-to-r from-[#253369] to-[#061133] !text-white rounded"
            />
          </div>
          <div className="flex justify-end">
            <Button onClick={handleUpdate}className="rounded-xl bg-[#E2C044]">Save Changes</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
