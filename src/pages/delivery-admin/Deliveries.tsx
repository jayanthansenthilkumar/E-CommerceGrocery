
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { PackageOpen } from "lucide-react";

const DeliveryAdminDeliveries = () => {
  return (
    <DashboardLayout
      title="All Deliveries"
      subtitle="Monitor all delivery operations"
    >
      <Card>
        <CardContent className="pt-6 flex flex-col items-center justify-center py-12 text-center">
          <PackageOpen className="h-12 w-12 text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold mb-2">No deliveries yet</h3>
          <p className="text-gray-500 mb-4">
            All active and pending deliveries will appear here
          </p>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default DeliveryAdminDeliveries;
