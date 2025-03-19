import { usePathname, useRouter } from 'next/navigation';
import { Link } from 'react-scroll';
export function NavBarItem({ name }: { name: string }) {
    const router = useRouter()
    // Function to handle the activation of a link.
    const handleOnClick = () => {
        router.push("/?Section=" + name)
    };
    const getOffset = () => {
        const elHeight = document.getElementById('Header')?.clientHeight
        console.log(elHeight)
        return (elHeight ?? 0) * -1;
    };
    const pathname = usePathname()
    let button;
    if (pathname == "/") {
        button = <Link className="text-[10px] font-medium md:text-[1.4vw] lg:text-[16px] text-[#006847] p-[0.5vw] hover:bg-gray-200 rounded-sm" to={name} smooth={true} duration={500} offset={getOffset()} >{name}</Link>
    }
    else {
        button = <div className="text-[10px] font-medium md:text-[1.4vw] lg:text-[16px] text-[#006847] p-[0.5vw] hover:bg-gray-200 rounded-sm" onClick={handleOnClick}>{name}</div>
    }

    return (
        <li>
            {button}
        </li>
    );

}