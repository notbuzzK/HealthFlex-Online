import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { userLogout } from "@/lib/actions/patient.actions";
import { Button } from "@/components/ui/button";
import UpdateUserButton from "../forms/updateUser";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import UpdateUser from "../forms/updateUser";
import { useRouter } from "next/navigation";
import { Upload } from "lucide-react";
import UploadDocReco from "../UploadDocReco";


export default function UserTools() {

  const router = useRouter();

  const handleLogout = async () => {
    await userLogout(router); // Pass the router instance
  };

  return (
    <div className="">
      
      <div className="flex justify-between items-center">
        <p className="py-4">Upload Doctor's Recommendation</p>
        
        <UploadDocReco />

      </div>
      <div className="flex justify-between items-center">
        <p className="">Update Information</p>
        
        <Dialog>
          <DialogTrigger className="rounded-xl bg-[#E2C044]  hover:bg-transparent duration-100 shadow-lg w-20 h-9">Open</DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-gradient-to-br from-[#D9D9D9] to-[#737373] !rounded-2xl max-h-[600px] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Update Information</DialogTitle>
              <DialogDescription>
                leave blank if you don't want to update
              </DialogDescription>

              <div>
                <UpdateUser />
              </div>

            </DialogHeader>
          </DialogContent>
        </Dialog>

      </div>

      <div className="flex justify-between items-center">
        <p className="py-4">Contact Healthflex</p>
        <Popover>
          <PopoverTrigger className="rounded-xl bg-[#E2C044] hover:bg-transparent duration-100 shadow-lg w-20 h-9">
              Contact
            </PopoverTrigger>
          <PopoverContent className="bg-gray-300 rounded-xl mr-16 w-80">
            <div>
              <div className="flex justify-between">
                <p>Mobile: </p>
                <p>0976-020-2486</p>
              </div>
              <div className="flex justify-between">
                <p>Telephone: </p>
                <p>(046) 887-2186</p>
              </div>
              <div className="flex justify-between">
                <p>Email: </p>
                <p>healthflexlab@gmail.com</p>
              </div>
              <div className="flex justify-between">
                <p>Facebook: </p>
                <p>healthflexlab</p>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex justify-between items-center">
        <p className="py-4">Logout</p>
        <Button className="bg-[#FF4F4E] rounded-xl" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  )
}