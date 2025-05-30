"use client";
import React from "react";
import { useRouter } from "next/navigation";
import gstServicesData from "@/components/Services/gstServicesData";
import incomeTaxServicesData from "@/components/Services/incomeTaxServicesData";
import { Service } from "@/types/service";

type CustomSidebarProps = {
  activeService: Service | null;
  onServiceSelect: (service: Service) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
};

const CustomSidebar = ({
  activeService,
  onServiceSelect,
  activeTab,
  onTabChange,
}: CustomSidebarProps) => {
  const router = useRouter();
  const [isServicesOpen, setIsServicesOpen] = React.useState(true);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    router.push("/login");
  };

  return (
    <div className="w-full h-full flex flex-col bg-white dark:bg-gray-900 shadow-lg rounded-lg">
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-2xl font-bold text-primary tracking-tight">Dashboard</h2>
      </div>

      <div className="flex-1 overflow-auto py-6 px-4 space-y-8">
        {/* Services Section */}
        <div className="w-full">
          <button
            onClick={() => setIsServicesOpen(!isServicesOpen)}
            className="w-full flex items-center justify-between text-lg font-semibold bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 px-4 py-3 rounded-lg transition-all duration-200"
          >
            <span>Services</span>
            <svg
              className={`w-5 h-5 transform transition-transform ${isServicesOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isServicesOpen && (
            <div className="mt-4 space-y-6">
              {/* GST Services */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 px-3">
                  GST Services
                </h4>
                <ul className="space-y-2">
                  {gstServicesData.map((service) => (
                    <li key={service.id}>
                      <button
                        onClick={() => {
                          onServiceSelect(service);
                          onTabChange('services');
                        }}
                        className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-all duration-200 ${
                          activeService?.id === service.id
                            ? "bg-primary text-white font-medium shadow-md"
                            : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {service.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Income Tax Services */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 px-3">
                  Income Tax Services
                </h4>
                <ul className="space-y-2">
                  {incomeTaxServicesData.map((service) => (
                    <li key={service.id}>
                      <button
                        onClick={() => {
                          onServiceSelect(service);
                          onTabChange('services');
                        }}
                        className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-all duration-200 ${
                          activeService?.id === service.id
                            ? "bg-primary text-white font-medium shadow-md"
                            : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {service.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Documents Section */}
        <div className="w-full">
          <button
            onClick={() => onTabChange('documents')}
            className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-all duration-200 ${
              activeTab === 'documents'
                ? "bg-primary text-white font-medium shadow-md"
                : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
            }`}
          >
            Uploaded Documents
          </button>
        </div>
      </div>

      {/* Logout Button */}
      <div className="p-6 border-t border-gray-200 dark:border-gray-800 mt-auto">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Logout
        </button>
      </div>
    </div>
  );
};

export default CustomSidebar;