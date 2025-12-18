import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import IconButton from "../IconButton";

export function IconBar() {
	const icons = [];
	icons.push({ "link": "https://www.facebook.com/zentavosinc", "label": "facebook", "icon": <FaFacebookF className="scale-75 fill-[#006847] h-[4.5vw] w-[4.5vw] sm:h-[2.5vw] sm:w-[2.5vw] md:h-[2vw] md:w-[2vw] lg:h-[1.5vw] lg:w-[1.5vw]" /> });
	icons.push({ "link": "https://www.instagram.com/zentavosinc/", "label": "instagram", "icon": <FaInstagram className="scale-75 fill-[#006847] h-[4.5vw] w-[4.5vw] sm:h-[2.5vw] sm:w-[2.5vw] md:h-[2vw] md:w-[2vw] lg:h-[1.5vw] lg:w-[1.5vw]" /> });
	icons.push({ "link": "https://x.com/ZentavosInc", "label": "x", "icon": <FaXTwitter className="scale-75 fill-[#006847] h-[4.5vw] w-[4.5vw] sm:h-[2.5vw] sm:w-[2.5vw] md:h-[2vw] md:w-[2vw] lg:h-[1.5vw] lg:w-[1.5vw]" /> });
	icons.push({ "link": "https://www.youtube.com/@zentavosinc", "label": "youtube", "icon": <FaYoutube className="scale-75 fill-[#006847] h-[4.5vw] w-[4.5vw] sm:h-[2.5vw] sm:w-[2.5vw] md:h-[2vw] md:w-[2vw] lg:h-[1.5vw] lg:w-[1.5vw]" /> });


	const rows = [];
	for (let i = 0; i < icons.length; i++) {
		rows.push(<IconButton key={i} link={icons[i].link} label={icons[i].label}> {icons[i].icon}</IconButton>);
	}
	return (
		<div className="flex shrink gap-[2vw] sm:gap-[1.5vw] md:gap-[0.75vw] lg:gap-[0.5vw]">
			{rows}
		</div>
	);
}