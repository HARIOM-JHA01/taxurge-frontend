import Breadcrumb from "@/components/Common/Breadcrumb";
import Gst_Registration_Table from "@/components/Services/Gst-Registration-Table";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "GST Return",
  description: "This is Blog Page for Startup Nextjs Template",
  // other metadata
};

const Gst_resgistration = () => {
  const gstStrings: string[] = [
    "GSTR-1",
    "GSTR-2A",
    "GSTR-2B",
    "GSTR-2",
    "GSTR-3",
    "GSTR-3B",
    "GSTR-4",
    "GSTR-5",
    "GSTR-5A",
    "GSTR-6",
    "GSTR-7",
    "GSTR-8",
    "GSTR-9",
    "GSTR-9A",
    "GSTR-9C",
    "GSTR-10",
    "GSTR-11",
  ];

  return (
    <>
      <Breadcrumb
        pageName="GST Return"
        innerPage="Our Services"
        innerPageLink="/services"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In varius eros eget sapien consectetur ultrices. Ut quis dapibus libero."
      />

      <section className="pb-[120px] pt-[120px]">
        <div className="container justify-center">
          <div className=" mt-6 flex w-full items-end justify-center">
            <div className="flex flex-wrap justify-center gap-4">
              {gstStrings.map((gstString, index) => (
                <div
                  key={index}
                  className="card w-72 bg-[#002a7e] text-primary-content"
                >
                  <div className="card-body justify-center text-center items-center">
                    <h2 className="card-title text-white">{gstString}</h2>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className=" mt-10 w-full flex items-end justify-center">
            <Link
              href="/signup"
              className=" ease-in-up inline-block rounded-sm bg-primary px-8 py-3 text-base font-medium text-white shadow-btn transition duration-300 hover:bg-opacity-90 hover:shadow-btn-hover md:px-9 lg:px-6 xl:px-9"
            >
              Get Started
            </Link>
            </div>
        </div>
      </section>
    </>
  );
};

export default Gst_resgistration;
