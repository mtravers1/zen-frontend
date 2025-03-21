import { IoIosCheckmark } from "react-icons/io";

export function ContactCard({ name, email, children }: { name: string, email: string, children: React.ReactNode }) {
    return (
        <div>
            <div className="p-[1vw] m-[1vw] justify-center bg-transparent border border-gray-300">
                <div className="flex flex-row">
                    <div className="m-[0.5vw] mr-[1vw] flex justify-center bg-gray-200 w-[3vw] h-[3vw] rounded-full ">
                        <IoIosCheckmark className="self-center w-[2vw] h-[2vw]" />
                    </div>
                    <div className="flex flex-col">
                        <h2 className=" text-[1.5vw] font-bold">
                            {name}
                        </h2>
                        <a>
                            {email}
                        </a>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}