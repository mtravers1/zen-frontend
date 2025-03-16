import { Link } from 'react-scroll';
export function NavBarItem({ name }: { name: string }) {
    return (
        <li>
            <Link className="text-[10px] font-medium md:text-[1.4vw] lg:text-[16px] text-[#006847] mr-[10] ml-[10] hover:bg-gray-200 rounded-sm" to={name} smooth={true} duration={500}>{name}</Link>
        </li>
    );
}