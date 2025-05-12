
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TicketPercent } from "lucide-react";

const ShopOwnerCoupons = () => {
  const { toast } = useToast();
  
  return (
    <DashboardLayout
      title="Shop Coupons"
      subtitle="Create and manage discount coupons"
    >
      <Card>
        <CardContent className="pt-6 flex flex-col items-center justify-center py-12 text-center">
          <TicketPercent className="h-12 w-12 text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold mb-2">No coupons yet</h3>
          <p className="text-gray-500 mb-4 max-w-md">
            Create your first discount coupon to attract customers to your shop products
          </p>
          <Button 
            onClick={() => toast({ title: "Coming Soon", description: "This feature will be available soon." })}
          >
            Create Coupon
          </Button>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default ShopOwnerCoupons;
