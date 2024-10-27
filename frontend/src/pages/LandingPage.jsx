import React from "react";
import { ArrowRight, BarChart2, Users, Layers, Lock } from "lucide-react";
import { Button } from "@headlessui/react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-blue-600">Optima ERP</h1>
        <nav>
          <Button className="mr-4">
            <Link to="/accDash">Login</Link>
          </Button>
          <Button>Get Started</Button>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-5xl font-bold mb-6">
          Streamline Your Business with Optima ERP
        </h2>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Optimize operations, boost productivity, and drive growth with our
          comprehensive Enterprise Resource Planning solution.
        </p>
        <Button className="mr-4">
          Get Started <ArrowRight className="ml-2" />
        </Button>
        <Button>Schedule Demo</Button>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: BarChart2,
              title: "Analytics",
              description: "Gain insights with powerful reporting tools",
            },
            {
              icon: Users,
              title: "HR Management",
              description: "Streamline your workforce operations",
            },
            {
              icon: Layers,
              title: "Inventory Control",
              description: "Optimize stock levels and reduce costs",
            },
            {
              icon: Lock,
              title: "Secure",
              description: "Enterprise-grade security for your data",
            },
          ].map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <feature.icon className="w-12 h-12 text-blue-500 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-gray-100 py-8 mt-20">
        <div className="container mx-auto px-4 text-center text-gray-600">
          &copy; 2024 Optima ERP Systems. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
