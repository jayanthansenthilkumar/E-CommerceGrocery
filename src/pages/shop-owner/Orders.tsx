
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";

const ShopOwnerOrders = () => {
  return (
    <DashboardLayout
      title="Shop Orders"
      subtitle="View and manage orders for your shop"
    >
      <Card>
        <CardContent className="pt-6">
          <p>No orders found.</p>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default ShopOwnerOrders;
