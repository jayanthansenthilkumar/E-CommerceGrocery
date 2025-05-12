
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ShopOwnerProducts = () => {
  const { toast } = useToast();
  
  return (
    <DashboardLayout
      title="Shop Products"
      subtitle="Manage your shop's product inventory"
    >
      <Card>
        <CardContent className="pt-6">
          <Button onClick={() => toast({ title: "Coming Soon", description: "This feature will be available soon." })}>
            Add New Product
          </Button>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default ShopOwnerProducts;
