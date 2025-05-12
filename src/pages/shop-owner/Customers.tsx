
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";

const ShopOwnerCustomers = () => {
  return (
    <DashboardLayout
      title="Shop Customers"
      subtitle="View and manage your customer relationships"
    >
      <Card>
        <CardContent className="pt-6">
          <p>No customers found.</p>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default ShopOwnerCustomers;
