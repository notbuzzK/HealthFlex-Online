import { useEffect, useState } from "react";
import { getDailyAnalytics } from "@/lib/actions/admin.actions";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const DailyAnalytics = () => {
  const [analytics, setAnalytics] = useState({ userCount: 0, totalServices: 0, details: [] });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await getDailyAnalytics();
        setAnalytics(data);
      } catch (error) {
        console.error("Error fetching analytics:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (isLoading) {
    return <p className="p-5">Loading daily analytics...</p>;
  }

  return (
    <section className="px-4 flex justify-between items-center  h-full">
      <div className="">
        <p className="text-14-regular !font-semibold pb-2"><span className="text-white text-24-bold">{analytics.userCount}</span>: Total appointments</p>
        <p className="text-14-regular !font-semibold"><span className="text-white text-24-bold">{analytics.totalServices}</span>: Services booked</p>
      </div>
      <div className="">
        <p className="pb-2">Daily Analytics</p>
        <Dialog>
          <DialogContent className="sm:max-w-[600px] !rounded-xl bg-gray-300">
            <DialogHeader>
              <DialogTitle>Daily Appointment Details</DialogTitle>
            </DialogHeader>
            <div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Date and Time</TableHead>
                    <TableHead>Services</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {analytics.details.map((appointment, index) => (
                    <TableRow key={index}>
                      <TableCell>{appointment.fullName}</TableCell>
                      <TableCell>{new Date(appointment.dateTime).toLocaleString()}</TableCell>
                      <TableCell>
                        {[...appointment.lab, ...appointment.packages, ...appointment.consultation].join(", ")}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </DialogContent>
          <DialogTrigger className="rounded-2xl bg-[#E2C044] h-6 w-28 text-14-regular hover:bg-transparent duration-100 shadow-lg">
            <p className="">View Details</p>
          </DialogTrigger>
        </Dialog>
        
      </div>
      
    </section>
  );
};

export default DailyAnalytics;
