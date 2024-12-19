import { useEffect, useState } from "react";
import { getUserInfo } from "@/lib/actions/patient.actions";
import { useRouter } from "next/navigation";
import { account } from "@/lib/appwrite.config";

export default function UserInfo() {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();


  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await getUserInfo();
        setUserInfo(data);
      } catch (err) {
        console.error("Error fetching user info:", err);
        setError("Failed to load user info.");
        // Redirect to login if the user is not logged in
        router.replace("/src/login");
      }
    };

    fetchUserInfo();
  }, [router]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!userInfo) {
    return <p>Loading user info...</p>;
  }

  return (
    <div className="max-h-[600px] overflow-y-auto">
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
          <p>Password: </p>
          <p>{userInfo.password}</p>
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
    </div>
  );
}
