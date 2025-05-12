
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Package } from "lucide-react";

const DeliveryAgentDeliveries = () => {
  return (
    <DashboardLayout
      title="Active Deliveries"
      subtitle="Manage your current delivery tasks"
    >
      <Card>
        <CardContent className="pt-6 flex flex-col items-center justify-center py-12 text-center">
          <Package className="h-12 w-12 text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold mb-2">No active deliveries</h3>
          <p className="text-gray-500 mb-4">
            You don't have any active deliveries at the moment
          </p>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default DeliveryAgentDeliveries;
