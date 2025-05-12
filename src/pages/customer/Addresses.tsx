
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

const CustomerAddresses = () => {
  return (
    <DashboardLayout
      title="My Addresses"
      subtitle="Manage your delivery addresses"
    >
      <div className="flex justify-end mb-4">
        <Button>
          Add New Address
        </Button>
      </div>
      
      <Card>
        <CardContent className="pt-6 flex flex-col items-center justify-center py-12 text-center">
          <MapPin className="h-12 w-12 text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold mb-2">No addresses yet</h3>
          <p className="text-gray-500 mb-4">
            Add your first address to make checkout easier
          </p>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default CustomerAddresses;
