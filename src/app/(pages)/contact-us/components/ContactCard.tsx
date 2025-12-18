import { IoIosCheckmark } from "react-icons/io";

export function ContactCard({ name, email, children }: { name: string, email: string, children: React.ReactNode }) {
	return (
		<div>
			<div className="p-[1vw] m-[1vw] justify-center bg-transparent border border-gray-300">
				<div className="flex flex-row">
					<div className="m-[0.5vw] mr-[1vw] flex justify-center bg-gray-200 w-[7vw] h-[7vw] md:w-[3vw] md:h-[3vw] rounded-full ">
						<IoIosCheckmark className="self-center w-[5vw] h-[5vw] md:w-[2vw] md:h-[2vw]" />
					</div>
					<div className="flex flex-col">
						<h2 className="text-[5vw] md:text-[1.5vw] font-bold mx-[2vw]">
							{name}
						</h2>
						<a className="text-[3vw] md:text-[1vw] underline m-[2vw]" href={`mailto:${email}`}>
							{email}
						</a>

					</div>
				</div>
				<div className="mx-[2vw] text-center">
					{children}
				</div>
			</div>
		</div>
	);
}