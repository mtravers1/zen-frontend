import Chip from '@mui/material/Chip';

export function IconLabel({ name, children, soon }: { name: string, children: React.ReactNode, soon?: boolean }) {
    return (
        <div className="flex gap-[1vw]">
            <div className="text-[#1f6d4f] content-center text-md sm:text-lg lg:text-2xl"> {children}</div>
            <div className="font-medium  content-center text-md sm:text-lg lg:text-2xl"><span className="mr-2">{name}</span>
                {soon && (
                    <Chip label="Coming Soon" size="xsmall" variant="outlined" color="primary" />
                )}
            </div>
        </div>
    )
}