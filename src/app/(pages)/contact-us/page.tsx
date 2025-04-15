
import { Button } from "@mui/material";
import { headers } from "next/headers";
import Image from "next/image";
import { userAgent } from "next/server";
import { Suspense } from "react";
import { MainTemplate } from "../../shared_components/MainTemplate";
import { ContactCard } from "./components/ContactCard";
export default async function Contact() {
    const headersList = await headers();
    const { device } = userAgent({ headers: headersList });
    const deviceType = device?.type === "mobile" ? "mobile" : "desktop";
    if (deviceType === "desktop") {
        return (
            <div>
                <Suspense>
                    <MainTemplate>
                        <div className="md:mb-[10vw] mb-[100vw]">
                            <div className="flex flex-col">
                                <h1 className=" mb-[5vw] text-center text-[#1f6d4f] text-[5vw]  font-medium">
                                    Contact Us
                                </h1>
                                <div className="mt-[20vw] w-full gap-[10vw] absolute z-20 flex md:flex-row flex-col justify-center ">

                                    <div className="self-center flex flex-col text-[#1f6d4f] ">
                                        <ContactCard name="Customer Service" email="info@zentavos.com">
                                            <Button className="!bg-[#d1e242] !text-[#1f6d4f] !rounded-full"> +1 800-411-1139</Button>
                                        </ContactCard>
                                        <ContactCard name="Legal" email="legal@zentavos.com"> </ContactCard>
                                        <ContactCard name="Support" email="support@zentavos.com"> </ContactCard>
                                    </div>
                                    <div className="-mt-[3vw] self-center w-[50vw] h-[50vw] sm:w-[30vw] sm:h-[30vw]">
                                        <Image className="!relative" src="/Zentavos_logo_v1_gradient_color.svg" alt="" fill={true}></Image>
                                        <h1 className="-mt-[3vw] text-center text-[#578641]">
                                            Where your peace grows
                                        </h1>
                                    </div>

                                </div>
                            </div>
                            <div className=" flex brightness-110 contrast-150 w-full h-[70vw] overflow-hidden">
                                <Image className="!relative grayscale saturate blur-md" src="/pexels-pixabay-534219.jpg" alt="" fill={true} ></Image>
                                <div className=" bg-green-500 opacity-25  absolute w-full h-[70vw]"></div>
                                <div className="bg-linear-to-t from-white from-20% to-90% to-transparent opacity-70 w-full h-[70vw] absolute"></div>
                            </div>
                        </div>
                    </MainTemplate>
                </Suspense>
            </div>
        );
    }
    else {
        return (
            <div>
                <Suspense>
                    <MainTemplate>
                        <div className="mt-[20vw] flex justify-center">
                            <div className=" flex flex-col absolute z-50 ">
                                <div className=" self-center flex flex-col  text-[#1f6d4f]  sm:h-[40vw] sm:w-[30vw]">
                                    <h1 className="-mt-[15vw] mb-[15vw] text-center text-[5vw]  font-medium">
                                        Contact Us
                                    </h1>
                                    <ContactCard name="Customer Service" email="info@zentavos.com">
                                        <Button className="!bg-[#d1e242] !text-[#1f6d4f] !rounded-full"> +1 800-411-1139</Button>
                                    </ContactCard>
                                    <ContactCard name="Legal" email="legal@zentavos.com"> </ContactCard>
                                    <ContactCard name="Support" email="support@zentavos.com"> </ContactCard>
                                </div>
                                <div className="mt-[5vw] self-center w-[50vw] h-[50vw]">
                                    <Image className="!relative" src="/Zentavos_logo_v1_gradient_color.svg" alt="" fill={true}></Image>
                                    <h1 className="-mt-[3vw] text-center text-[#578641]">
                                        Where your peace grows
                                    </h1>
                                </div>

                            </div>
                            <div className=" flex brightness-110 contrast-150 w-full h-[70vw] overflow-hidden">
                                <Image className="!relative grayscale saturate blur-[1vw]" src="/pexels-pixabay-534219.jpg" alt="" fill={true} ></Image>
                                <div className=" bg-green-500 opacity-25  absolute w-full h-[70vw]"></div>
                                <div className="bg-linear-to-t from-white from-20% to-90% to-transparent opacity-70 w-full h-[70vw] absolute"></div>
                            </div>

                        </div>
                        <div className="bg-white w-full h-[80vw]"></div>
                    </MainTemplate>
                </Suspense>
            </div>

        );
    }
}
