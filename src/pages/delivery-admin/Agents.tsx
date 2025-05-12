
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

const DeliveryAdminAgents = () => {
  return (
    <DashboardLayout
      title="Delivery Agents"
      subtitle="Manage your delivery team"
    >
      <div className="flex justify-end mb-4">
        <Button>
          Add New Agent
        </Button>
      </div>
      
      <Card>
        <CardContent className="pt-6 flex flex-col items-center justify-center py-12 text-center">
          <Users className="h-12 w-12 text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold mb-2">No agents yet</h3>
          <p className="text-gray-500 mb-4">
            Add your first delivery agent to get started
          </p>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default DeliveryAdminAgents;
