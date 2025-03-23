export function IconLabel({ name, children }: { name: string, children: React.ReactNode }) {
    return (
        <div className="flex gap-[1vw]">
            <div className="text-[#1f6d4f] content-center text-[3vw] sm:text-[2vw]"> {children}</div>
            <div className="font-medium  content-center text-[2.5vw]/[2vw] sm:text-[2vw]/[2vw]"> {name} </div>
        </div>
    )
}