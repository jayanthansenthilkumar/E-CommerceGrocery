
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";

const CustomerOrders = () => {
  return (
    <DashboardLayout
      title="My Orders"
      subtitle="View and track your orders"
    >
      <Card>
        <CardContent className="pt-6">
          <p>No orders found.</p>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default CustomerOrders;
