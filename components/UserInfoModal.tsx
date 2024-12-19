import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getUserInfo, getFilesForAdmin } from "@/lib/actions/admin.actions"; // Correct imports
import { useState, useEffect } from "react";

export default function UserInfoModal({ fullName }: { fullName: string }) {
  
  const [userInfo, setUserInfo] = useState<any>(null);
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch user info
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user info to get userId
        const user = await getUserInfo(fullName);
        setUserInfo(user);

        // Fetch uploaded files for this user
        const files = await getFilesForAdmin(fullName);
        setUploadedFiles(files);
      } catch (err) {
        console.error("Error fetching user data or files:", err);
        setError("Failed to load user data or files.");
      }
    };

    fetchUserData();
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
        <DialogContent className="sm:max-w-[600px] bg-gradient-to-br from-[#D9D9D9] to-[#737373] !rounded-2xl max-h-[600px] overflow-y-auto">
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
            <div>
              <div>
                <DialogTitle>Uploaded Files</DialogTitle>
                {error && <p className="text-red-500">{error}</p>}
                  {uploadedFiles.length > 0 ? (
                    <ul className="space-y-4">
                      {uploadedFiles.map((file) => (
                        <li key={file.fileId} className="flex items-center justify-between border p-2 rounded">
                          <p className="text-sm">{file.name}</p>
                          <div className="space-x-2">
                            {/* View file */}
                            <a
                              href={file.viewUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 underline"
                            >
                              View
                            </a>
                            {/* Download file */}
                            <a
                              href={file.viewUrl}
                              download={file.name}
                              className="text-blue-500 underline"
                            >
                              Download
                            </a>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No files uploaded.</p>
                )}
              </div>
            </div>
          </DialogHeader>
        <DialogDescription></DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
}
