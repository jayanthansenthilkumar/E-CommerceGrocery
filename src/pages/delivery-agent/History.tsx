
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";

const DeliveryAgentHistory = () => {
  return (
    <DashboardLayout
      title="Delivery History"
      subtitle="View your past deliveries"
    >
      <Card>
        <CardContent className="pt-6 flex flex-col items-center justify-center py-12 text-center">
          <Clock className="h-12 w-12 text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold mb-2">No delivery history</h3>
          <p className="text-gray-500 mb-4">
            Your completed deliveries will appear here
          </p>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default DeliveryAgentHistory;
