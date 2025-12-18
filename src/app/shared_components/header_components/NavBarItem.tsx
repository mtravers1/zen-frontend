'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { scroller } from 'react-scroll';

export function NavBarItem({ name, route, closeDrawer }: { name: string, route: string, closeDrawer?: () => void }) {
	const router = useRouter()
	const pathname = usePathname()
	// Function to handle the activation of a link.
	const handleOnClick = () => {
		if (route == "/") {
			router.push("/?Section=" + name)
		}
		else {
			router.push(route)
		}
	};
	const elHeight = useRef(0);
	const isMobile = useRef(false);

	useEffect(() => {
		isMobile.current = window.innerWidth <= 768;
		elHeight.current = document.getElementById(`Header${isMobile.current ? 'Mobile' : 'Desktop'}`)?.clientHeight ?? 0

	}, [])

	const getOffset = () => {
		console.log(elHeight.current)
		return elHeight.current * -1;
	};

	const handleOnClickNoRouteChange = () => {
		if (closeDrawer) closeDrawer();
		if (route == "/") {
			scroll();
		}
		else {
			router.push(route)
		}
		scroll();
	}

	const scroll = () => {
		scroller.scrollTo(`${name}${isMobile.current ? 'Mobile' : 'Desktop'}`, {
			duration: 500,
			smooth: true,
			offset: getOffset()
		});
	}

	let button;
	if (pathname == "/") {
		button = <a className="text-[10px] font-medium md:text-[1.4vw] lg:text-[16px] text-[#006847] p-[0.5vw] hover:bg-gray-200 rounded-sm cursor-pointer" onClick={handleOnClickNoRouteChange}>{name}</a>
	}
	else {
		button = <a className="text-[10px] font-medium md:text-[1.4vw] lg:text-[16px] text-[#006847] p-[0.5vw] hover:bg-gray-200 rounded-sm cursor-pointer" onClick={handleOnClick}>{name}</a>
	}

	return (
		<li>
			{button}
		</li>
	);
}