
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Heart } from "lucide-react";

const CustomerFavorites = () => {
  return (
    <DashboardLayout
      title="My Favorites"
      subtitle="Products you have saved"
    >
      <Card>
        <CardContent className="pt-6 flex flex-col items-center justify-center py-12 text-center">
          <Heart className="h-12 w-12 text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold mb-2">No favorites yet</h3>
          <p className="text-gray-500 mb-4">
            Browse products and mark your favorites to see them here
          </p>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default CustomerFavorites;
