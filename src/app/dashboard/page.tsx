"use client";
import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Breadcrumb from "@/components/Common/Breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import clsx from "clsx";
import Image from "next/image";

const Dashboard = () => {
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const [activeTab, setActiveTab] = useState<string>("upload");
  const [activeTab2, setActiveTab2] = useState<string>("payment");
  const [balance, setBalance] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
    } else {
      fetchBalance(token);
    }
  }, []);

  const fetchBalance = async (token: string) => {
    try {
      const response = await fetch('https://seahorse-app-kcu4q.ondigitalocean.app/api/users/balance', {
        headers: {
          'token': token,
        },
      });
      const data = await response.json();
      toast.success("Balance fetched successfully!");
      setBalance(data); // Assuming the API response contains a balance field
    } catch (error) {
      toast.error("Error fetching balance.");
      console.error("Error fetching balance:", error);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files);
      setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleSaveChanges = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
        router.push("/");
        return;
    }

    const formData = new FormData();
    files.forEach((file) => {
        formData.append('uploadedDocuments', file);
    });

    try {
        const response = await fetch('https://seahorse-app-kcu4q.ondigitalocean.app/api/users/upload', {
            method: 'POST',
            headers: {
                'token': token,
            },
            body: formData,
        });

        if (response.ok) {
            toast.success("Files uploaded successfully");
        } else {
            const errorText = await response.text(); // Get the error message from the server
            toast.error(`Failed to upload files: ${errorText}`);
            console.error(`Failed to upload files: ${errorText}`);
        }
    } catch (error) {
        toast.error("Error uploading files.");
        console.error("Error uploading files:", error);
    }
};

  

  const handleDownload = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
      return;
    }
  
    try {
      const response = await fetch('https://seahorse-app-kcu4q.ondigitalocean.app/api/users/download', {
        headers: {
          'token': token,
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data.files) && data.files.length > 0) {
          for (const file of data.files) {
            const response = await fetch(file.url);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = file.name || 'coolFileName'; // Use the file name from response or a default name
            document.body.appendChild(a);
            a.click();
            a.remove();
          }
          toast.success("Files downloaded successfully!");
        } else {
          toast.info("No files available for download.");
        }
      } else {
        toast.error("Failed to download files.");
      }
    } catch (error) {
      toast.error("Error downloading files.");
      console.error("Error downloading files:", error);
    }
  };
  

  return (
    <>
      <ToastContainer />
      <Breadcrumb
        pageName="Dashboard"
        description="Welcome to TaxUrge Dashboard"
      />

      <section className="pb-[190px] pt-[10px]">
        <div className="container">
          <div className="flex w-full items-center justify-center gap-10">
            <Tabs
              defaultValue="upload"
              className="w-[500px]"
              onValueChange={(value) => setActiveTab(value)}
            >
              <TabsList className="grid h-10 w-full grid-cols-2 border border-solid">
                <TabsTrigger
                  value="upload"
                  className={clsx(
                    activeTab === "upload" && "bg-[#002a7e] text-white",
                  )}
                >
                  Upload
                </TabsTrigger>
                <TabsTrigger
                  value="download"
                  className={clsx(
                    activeTab === "download" && "bg-[#002a7e] text-white",
                  )}
                >
                  Download
                </TabsTrigger>
              </TabsList>
              <TabsContent value="upload">
                <Card>
                  <CardHeader>
                    <CardTitle>Upload Files</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {files.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-md border border-solid bg-[#002a7e] p-[0.3rem] text-white"
                      >
                        <span>{file.name}</span>
                        <Button
                          variant={"link"}
                          className="text-white"
                          size="sm"
                          onClick={() => handleRemoveFile(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                    <Input
                      type="file"
                      onChange={handleFileChange}
                      ref={fileInputRef}
                      className="pt-[6px]"
                    />
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleSaveChanges} className="text-white">
                      Save changes
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="download">
                <Card>
                  <CardHeader>
                    <CardTitle>Download Files</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button onClick={handleDownload} className="text-white">
                      Download Files
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            <Tabs
              defaultValue="payment"
              className="w-[500px]"
              onValueChange={(value) => setActiveTab2(value)}
            >
              <TabsList className="grid h-10 w-full grid-cols-2 border border-solid">
                <TabsTrigger
                  value="balance"
                  className={clsx(
                    activeTab2 === "balance" && "bg-[#002a7e] text-white",
                  )}
                >
                  Balance
                </TabsTrigger>
                <TabsTrigger
                  value="payment"
                  className={clsx(
                    activeTab2 === "payment" && "bg-[#002a7e] text-white",
                  )}
                >
                  Payment
                </TabsTrigger>
              </TabsList>
              <TabsContent value="balance">
                <Card>
                  <CardHeader>
                    <CardTitle>Balance</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {balance !== null ? `Remaining Balance: RS. ${balance}` : "Loading..."}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="payment">
                <Card>
                  <CardHeader>
                    <CardTitle>Make Payment</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 flex justify-center items-start">
                    <Image
                      src="/images/payment/default_qrcode.png"
                      width={100}
                      height={100}
                      alt="QR Code"
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
