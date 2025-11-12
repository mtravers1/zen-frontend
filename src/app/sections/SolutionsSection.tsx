"use client";
import { PieChart } from "@mui/x-charts/PieChart";
import Image from "next/image";
import { FaBarcode, FaBook, FaBriefcase, FaChartLine } from "react-icons/fa";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { ImPieChart } from "react-icons/im";
import { IoInformationCircleOutline, IoKey } from "react-icons/io5";
import { LuClipboardCheck } from "react-icons/lu";
import { MdOutlineOndemandVideo, MdOutlinePhoneIphone } from "react-icons/md";
import { RiFilePaperLine } from "react-icons/ri";
import { Element } from "react-scroll";
import { IconLabel } from "../shared_components/IconLabel";
import { Chip } from "@mui/material";

/**
 * Renders the Solutions section for desktop layouts.
 */
export const SolutionsSection = (): JSX.Element => (
  <div>
    <Element
      id="SolutionsDesktop"
      name="SOLUTIONSDesktop"
      className="element gap-[10vw] flex flex-col"
    >
      <h1 className="absolute z-40 text-center w-full text-[#1f6d4f] text-[4vw] font-bold -mt-[10vw]">
        The Complete Financial Tool You Need!
      </h1>
      <div className="relative w-full bg-[url(/Downtown_Houston_BW.jpg)] bg-cover">
        <div className="relative z-30 grid md:grid-cols-2 w-full h-full justify-center bg-[#bfc221E6]">
          <div className="relative !h-full hidden md:block bg-[url(/Screenshots_arrange.png)] bg-cover bg-no-repeat bg-right"></div>
          <div className="flex flex-col my-10 gap-[4vw] w-3/4 md:w-full md:pr-10 mx-auto lg:max-w-xl xl:ml[10vw]">
            <div className="text-[#1f6d4f] font-bold text-center text-lg, sm:text-2xl lg:text-3xl">
              Everything a Small Business Owner needs at the push of a button.
            </div>
            <div className="grid sm:grid-cols-2 mx-auto gap-y-[2vw]">
              <IconLabel name={"Digital Wallet"}>
                {" "}
                <FaBarcode />
              </IconLabel>
              <IconLabel name={"Bookkeeping, Accounting, & Taxes"} soon>
                {" "}
                <ImPieChart />
              </IconLabel>
              <IconLabel name={"Real-time Cash Flow Insights"}>
                {" "}
                <FaHandHoldingDollar />
              </IconLabel>
              <IconLabel name={"Real-time Financial Reports"}>
                {" "}
                <FaChartLine />
              </IconLabel>
              <IconLabel name={"Tax Liability"} soon>
                {" "}
                <IoInformationCircleOutline />
              </IconLabel>
              <IconLabel name={"Invoicing"} soon>
                <RiFilePaperLine />
              </IconLabel>
              <IconLabel name={"On-Call CFO"} soon>
                {" "}
                <MdOutlinePhoneIphone />
              </IconLabel>
              <IconLabel name={"Full Back-Office Support"}>
                {" "}
                <LuClipboardCheck />
              </IconLabel>
              <IconLabel name={"Access to Capital"} soon>
                {" "}
                <IoKey />
              </IconLabel>
              <IconLabel name={"Financial & Business Education"}>
                {" "}
                <FaBook />
              </IconLabel>
              <IconLabel name={"Video Training Library"} soon>
                {" "}
                <MdOutlineOndemandVideo />
              </IconLabel>
              <IconLabel name={"B2B Marketplaces"} soon>
                {" "}
                <FaBriefcase />
              </IconLabel>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-[10vw] justify-center">
        <div className="hidden lg:block pl-[5vw] w-[40vw] h-[25vw]">
          <Image
            className="!relative z-10"
            src="/vecteezy_ai-artificial-intelligence-concept-global-data-connection_24299683.jpg"
            fill={true}
            alt=""
          ></Image>
        </div>
        <div className=" flex flex-col grow px-[10vw] lg:px-[0]">
          <div className="font-bold text-3xl text-center text-[#1f6d4f] pr-[2vw]">
            Ai Automation
          </div>

          <div className="text-lg font-medium text-center pr-[2vw]">
            Data entry automation and AI predictions and projections.
          </div>
          <div className="text-center">
            <Chip
              label="Coming Soon"
              size="small"
              variant="outlined"
              color="primary"
            />
          </div>
          <div className="mt-[5vw] flex justify-center h-[25vw]">
            <div className="basis-1/4">
              <div className="lg:text-[3vw] text-[5vw] font-bold text-[#1f6d4f]">
                70%
              </div>

              <div className="font-medium lg:text-[1vw]/[1.5vw] text-[.8em] ">
                Artificial Intelligence
                <br />
                Data and Technology
              </div>
              <div className="border-2  border-t-0 border-r-0 w-[5vw] h-[2vw] ml-[50%] z-10" />
            </div>
            <div className="basis-1/2 flex-grow">
              <PieChart
                className=""
                tooltip={{ trigger: "none" }}
                series={[
                  {
                    data: [
                      { id: 0, value: 30, color: "#1f6d4f" },
                      { id: 1, value: 70, color: "#E0E721" },
                    ],
                    paddingAngle: 5,
                    outerRadius: "100%",
                    cx: "60%",
                    cy: "50%",
                    innerRadius: "4%",
                  },
                ]}
              />
            </div>
            <div className="basis-1/4 mt-[10vw]">
              <div className="border-2 border-b-0 border-l-0 w-[5vw] h-[2vw]  -ml-[15%] z-10"></div>
              <div className=" lg:text-[3vw] text-[5vw] font-bold text-[#1f6d4f] ">
                30%
              </div>
              <div className="font-medium lg:text-[1vw]/[1.5vw] text-[.8em]">
                Human Intelligence
                <br />
                Costumer Service
                <br />
                and Advice
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="flex flex-col  self-center -mt-[10vw]">
          <div className="ml-[10vw] text-[3vw]/[3vw] text-[#1f6d4f] font-bold text-center">
            Specialized Reporting
            <br />& Financial Dashboard
          </div>
          <div className="mt-[3vw] ml-[5vw] self-center sm:text-[1vw]  text-[2vw] font-medium">
            • Cash Flow Analysis: Up-to-date Financial
            <br />
            Reports, KPI’s, Net Worth
            <br />
            <br />• Actionable data to achieve your financial goals
          </div>
        </div>
        <div className="h-[50vw] w-[50vw]">
          <Image
            className="!relative z-10"
            src="/Laptop.png"
            fill={true}
            alt=""
          ></Image>
        </div>
      </div>
    </Element>
  </div>
);

/**
 * Renders the Solutions section optimized for mobile layouts.
 */
export const MobileSolutionsSection = (): JSX.Element => (
  <div>
    <Element
      id="SolutionsMobile"
      name="SOLUTIONSMobile"
      className="element gap-[20vw] flex flex-col"
    >
      <h1 className="absolute z-40 text-center w-full text-[#1f6d4f] text-[8vw] font-bold -mt-[30vw]">
        The Complete Financial Tool You Need!
      </h1>
      <div className="relative w-full h-[80vw]  overflow-clip">
        <Image
          className="!relative z-10 scale-150"
          src="/Downtown_20Houston_BW.tif"
          fill={true}
          alt=""
        ></Image>
      </div>
      <div className="absolute z-20 bg-[#bfc221] opacity-90 w-full h-[80vw]"></div>
      <div className="absolute h-[80vw] w-[100vw] overflow-clip">
        <div className="w-[128vw] h-[80vw] -ml-[55vw]">
          <Image
            className="!relative z-30 "
            src="/Screenshots_arrange.png"
            fill={true}
            alt=""
          ></Image>
        </div>
      </div>
      <div className="flex flex-col w-[45vw] gap-[8vw] z-40 ml-[50vw] absolute">
        <div className="-ml-[5vw] text-[#1f6d4f] font-bold text-center text-[3vw] mt-[6vw]">
          {" "}
          Everything a Small Business Owner <br /> needs at the push of a button.
        </div>
        <div className="-mt-[5vw] grid  grid-cols-1  gap-y-[2vw]">
          <IconLabel name={"Digital Wallet"}>
            {" "}
            <FaBarcode />
          </IconLabel>
          <IconLabel name={"Bookkeeping, Accounting, & Taxes"}>
            {" "}
            <ImPieChart />
          </IconLabel>
          <IconLabel name={"Real-time Cash Flow Insights"}>
            {" "}
            <FaHandHoldingDollar />
          </IconLabel>
          <IconLabel name={"Real-time Financial Reports"}>
            {" "}
            <FaChartLine />
          </IconLabel>
          <IconLabel name={"Tax Liability"}>
            {" "}
            <IoInformationCircleOutline />
          </IconLabel>
          <IconLabel name={"Invoicing"}>
            <RiFilePaperLine />
          </IconLabel>
          <IconLabel name={"On-Call CFO"}>
            {" "}
            <MdOutlinePhoneIphone />
          </IconLabel>
          <IconLabel name={"Full Back-Office Support"}>
            {" "}
            <LuClipboardCheck />
          </IconLabel>
          <IconLabel name={"Access to Capital"}>
            {" "}
            <IoKey />
          </IconLabel>
          <IconLabel name={"Financial & Business Education"}>
            {" "}
            <FaBook />
          </IconLabel>
          <IconLabel name={"Video Training Library"}>
            {" "}
            <MdOutlineOndemandVideo />
          </IconLabel>
          <IconLabel name={"B2B Marketplaces"}>
            {" "}
            <FaBriefcase />
          </IconLabel>
        </div>
      </div>

      <div className="flex flex-col grow">
        <div className="font-bold text-[6vw] text-center text-[#1f6d4f] pr-[4vw]">
          Ai Automation
        </div>
        <div className="text-[3vw] font-medium text-center pr-[4vw]">
          Data entry automation and AI predictions and projections.
        </div>
        <div className="absolute text-[6vw] font-bold text-[#1f6d4f] mt-[20vw] ml-[10vw]">
          70%
        </div>
        <div className="absolute font-medium text-[3vw]/[3vw] mt-[30vw] ml-[6vw] ">
          Artificial Intelligence
          <br />
          Data and Technology
        </div>
        <div className="absolute  text-[6vw] font-bold text-[#1f6d4f] mt-[40vw] ml-[70vw]">
          30%
        </div>
        <div className="absolute font-medium text-[3vw]/[3vw] mt-[50vw] ml-[70vw]">
          Human Intelligence
          <br />
          Costumer Service
          <br />
          and Advice
        </div>
        <div className="absolute border-2  border-t-0 border-r-0 w-[10vw] h-[5vw] mt-[40vw] ml-[16vw] z-10"></div>
        <div className="absolute border-2 border-b-0 border-l-0 w-[10vw] h-[5vw] mt-[36vw] ml-[66vw] z-10"></div>
        <div className="ml-[20vw] self-center h-[50vw] w-[50vw] sm:h-[35vw] sm:w-[35vw]">
          <PieChart
            tooltip={{ trigger: "none" }}
            series={[
              {
                data: [
                  { id: 0, value: 30, color: "#1f6d4f" },
                  { id: 1, value: 70, color: "#E0E721" },
                ],
                paddingAngle: 5,
                innerRadius: "4%",
              },
            ]}
          />
        </div>
      </div>
      <div className="flex flex-col  self-center -mt-[10vw]">
        <div className=" text-[6vw]/[6vw] text-[#1f6d4f] font-bold text-center">
          Specialized Reporting
          <br />& Financial Dashboard
        </div>
      </div>
      <div>
        <div className="flex -mt-[10vw]">
          <div className="ml-[5vw] -mt-[5vw] self-center text-[3vw] font-medium">
            • Cash Flow Analysis: Up-to-date Financial
            <br />
            Reports, KPI’s, Net Worth
            <br />
            <br />• Actionable data to achieve your financial goals
          </div>
          <div className="h-[50vw] w-[50vw]">
            <Image
              className="!relative z-10"
              src="/Laptop.png"
              fill={true}
              alt=""
            ></Image>
          </div>
        </div>
      </div>
    </Element>
  </div>
);
