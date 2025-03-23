import { Button } from "@mui/material";
import Image from "next/image";
import { Element } from "react-scroll";
import { ContactCard } from "../ContactCard";
export function ContactSection() {
    return (
        <Element id="contact" name="CONTACT" className="element">
            <div className="mt-[40vw] flex justify-center">
                <div className=" flex flex-col absolute z-50 ">
                    <div className=" self-center flex flex-col  text-[#1f6d4f] h-[40vw] w-[30vw]">
                        <h1 className="-mt-[15vw] mb-[15vw] text-center text-[5vw]  font-medium">
                            Contact Us
                        </h1>
                        <ContactCard name="Customer Service" email="info@zentavos.com"> <Button className="!bg-[#d1e242] !text-[#1f6d4f] !rounded-full !mt-[0.5vw] !font-bold"> +1 800-411-1139</Button></ContactCard>
                        <ContactCard name="Legal" email="legal@zentavos.com"> </ContactCard>
                        <ContactCard name="Support" email="support@zentavos.com"> </ContactCard>
                    </div>
                    <div className="-mt-[3vw] self-center w-[30vw] h-[30vw]">
                        <Image className="!relative" src="/Zentavos_logo_v1_gradient_color.svg" alt="" fill={true}></Image>
                        <h1 className="-mt-[3vw] text-center text-[#578641]">
                            Where your peace grows
                        </h1>
                    </div>
                </div>
                <div className=" flex brightness-110 contrast-150 w-full h-[70vw] overflow-hidden">
                    <Image className="!relative grayscale saturate blur-md" src="/pexels-pixabay-534219.jpg" alt="" fill={true} ></Image>
                    <div className=" bg-green-500 opacity-25  absolute w-full h-[70vw]"></div>
                    <div className="bg-linear-to-t from-white from-20% to-90% to-transparent opacity-70 w-full h-[70vw] absolute"></div>
                </div>
            </div>
        </Element>

    );
}  