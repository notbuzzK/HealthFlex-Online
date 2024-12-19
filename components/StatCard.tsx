import { IoWarning } from "react-icons/io5";
import { TbCalendarCheck } from "react-icons/tb";
import { BsHourglass } from "react-icons/bs";
import { verifyAdmin } from "@/lib/actions/admin.actions";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { checkAdminAccess } from "@/lib/actions/admin.actions";


type StatCardProps = {
  type: "appointments" | "pending" | "cancelled";
  count: number;
  label: string;
};

export const StatCard = ({ count = 0, label, type }: StatCardProps) => {
  const router = useRouter();

  useEffect(() => {
    const verifyAccess = async () => {
      const hasAccess = await checkAdminAccess(router);
      if (!hasAccess) return;
    };

    verifyAccess();
  }, [router]);

  let icon;

  switch (type) {
    case "appointments":
      icon = <TbCalendarCheck size={32} color="#56ff61" />;
      break;
    case "pending":
      icon = <BsHourglass size={32} color="#6b26ff" />;
      break;
    case "cancelled":
      icon = <IoWarning size={32} color="#FF4F4E" />;
      break;
    default:
      icon = null;
  }

  return (
    <div
      className="bg-gradient-to-br from-[#D9D9D9] to-[#737373] h-24 rounded-xl p-5 flex items-center gap-4"
    >
      <div className="flex items-center gap-4">
        {icon}
        <h2 className="text-32-bold text-white">{count}</h2>
      </div>

      <p className="text-14-regular !font-semibold">{label}</p>
    </div>
  );
};
