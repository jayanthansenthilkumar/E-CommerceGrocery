
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart } from "lucide-react";

const DeliveryAdminReports = () => {
  return (
    <DashboardLayout
      title="Delivery Reports"
      subtitle="Analytics and statistics"
    >
      <Card>
        <CardContent className="pt-6 flex flex-col items-center justify-center py-12 text-center">
          <BarChart className="h-12 w-12 text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold mb-2">No reports available</h3>
          <p className="text-gray-500 mb-4">
            Delivery stats will appear here once you have completed deliveries
          </p>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default DeliveryAdminReports;
