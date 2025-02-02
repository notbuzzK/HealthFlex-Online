import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getUserInfo } from "@/lib/actions/admin.actions";
import { useState, useEffect } from "react";

export default function UserInfoModal({ fullName }: { fullName: string }) {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]); // State for uploaded files
  const [error, setError] = useState<string | null>(null);

  // Fetch user info
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await getUserInfo(fullName);
        setUserInfo(data);
      } catch (err) {
        console.error("Error fetching user info:", err);
        setError("Failed to load user info.");
      }
    };

    fetchUserInfo();
  }, [fullName]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!userInfo) {
    return <p>Loading user info...</p>;
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger className="!text-left">{userInfo.fullName}</DialogTrigger>
        <DialogContent className="sm:max-w-[600px] bg-gradient-to-br from-[#253369] to-[#061133] text-white !rounded-2xl max-h-[600px] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Patient Info</DialogTitle>
            <div>
              <div className="flex justify-between">
                <p>Name:</p>
                <p>{userInfo.fullName}</p>
              </div>
              <div className="flex justify-between">
                <p>Email: </p>
                <p>{userInfo.email}</p>
              </div>
              <div className="flex justify-between">
                <p>Contact Number: </p>
                <p>{userInfo.number}</p>
              </div>
              <div className="flex justify-between">
                <p>Age: </p>
                <p>{userInfo.age}</p>
              </div>
              <div className="flex justify-between">
                <p>Birthday: </p>
                <p>{userInfo.birthday}</p>
              </div>
              <div className="flex justify-between">
                <p>Sex: </p>
                <p>{userInfo.sex}</p>
              </div>
              <div className="flex justify-between">
                <p>Medical Concerns: </p>
                <p className="text-right">{userInfo.medicalConcerns.join(", ")}</p>
              </div>
            </div>

          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
