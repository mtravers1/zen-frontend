import { Link } from 'react-scroll';
export function NavBarItem({ name }: { name: string }) {
    return (
        <li>
            <Link className="text-lg text-[#006847] mr-[10] ml-[10] hover:bg-gray-200 p-2 rounded-sm" to={name} smooth={true} duration={500}>{name}</Link>
        </li>
    );
}