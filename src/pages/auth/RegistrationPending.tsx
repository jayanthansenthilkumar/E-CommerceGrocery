
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const RegistrationPending = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center bg-gray-50">
        <div className="max-w-md px-4 py-12 text-center">
          <div className="bg-amber-50 rounded-full p-4 w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          <h1 className="text-2xl font-bold mb-4">Registration Pending Approval</h1>
          
          <p className="text-gray-600 mb-8">
            Thank you for registering with Prisona Store. Your account is currently pending approval by our administrators. 
            You'll receive an email notification once your account has been approved.
          </p>
          
          <div className="space-y-4">
            <Button asChild className="w-full bg-prisona-500 hover:bg-prisona-600">
              <Link to="/">Return to Home Page</Link>
            </Button>
            
            <Button asChild variant="outline" className="w-full">
              <Link to="/login">Go to Login</Link>
            </Button>
          </div>
          
          <p className="mt-8 text-sm text-gray-500">
            If you have any questions, please contact our support team at <a href="mailto:support@prisonastore.com" className="text-prisona-600 hover:underline">support@prisonastore.com</a>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RegistrationPending;
