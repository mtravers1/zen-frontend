import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import IconButton from "./IconButton";

export function IconBar() {
    const icons = [];
    icons.push({ "link": "https://www.facebook.com", "label": "facebook", "icon": <FaFacebookF className="scale-75 fill-[#006847] h-[3vw] w-[3vw] md:h-[2vw] md:w-[2vw] lg:h-[1.5vw] lg:w-[1.5vw]" /> });
    icons.push({ "link": "https://instagram.com", "label": "instagram", "icon": <FaInstagram className="scale-75 fill-[#006847] h-[3vw] w-[3vw] md:h-[2vw] md:w-[2vw] lg:h-[1.5vw] lg:w-[1.5vw]" /> });
    icons.push({ "link": "https://x.com/home", "label": "x", "icon": <FaXTwitter className="scale-75 fill-[#006847] h-[3vw] w-[3vw] md:h-[2vw] md:w-[2vw] lg:h-[1.5vw] lg:w-[1.5vw]" /> });
    icons.push({ "link": "https://www.youtube.com", "label": "youtube", "icon": <FaYoutube className="scale-75 fill-[#006847] h-[3vw] w-[3vw] md:h-[2vw] md:w-[2vw] lg:h-[1.5vw] lg:w-[1.5vw]" /> });


    const rows = [];
    for (let i = 0; i < icons.length; i++) {
        rows.push(<IconButton key={i} link={icons[i].link} label={icons[i].label}> {icons[i].icon}</IconButton>);
    }
    return (
        <div className="flex shrink gap-[1vw] lg:gap-[0.3vw]">
            {rows}
        </div>
    );
}