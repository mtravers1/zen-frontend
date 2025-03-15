
import { Icon } from "./Icon";
export default function IconButton({ label, source, link }: { label: string; source: string; link: string; }) {
    return (
        <div className="bg-white rounded-full">
            <a href={link}>
                <Icon label={label} source={source} />
            </a>
        </div>
    );
}