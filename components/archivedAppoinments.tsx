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


export default function Archive() {
  return (
    <div className="flex flex-col gap-4">
      <Dialog>
        <DialogTrigger className='text-green-500'>View Archive</DialogTrigger>
        <DialogContent className='bg-gradient-to-br from-[#D9D9D9] to-[#737373] !rounded-xl max-w-[500px]'>
          <DialogHeader>
            <DialogTitle>Archive</DialogTitle>

            <div className="col-span-6 row-span-3 bg-gradient-to-br from-[#D9D9D9] to-[#737373] rounded-xl m-4 p-4 overflow-y-auto max-h-[500px]">

              <ArchivedAppointmentsTable />

            </div>


          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}