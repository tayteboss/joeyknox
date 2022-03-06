import { useState, useEffect } from 'react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import { motion } from 'framer-motion';
import Cursor from '../elements/Cursor';
import GearListPanel from '../elements/GearListPanel';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const Main = styled(motion.main)`
	transition: filter 1000ms ease;
`;

const variants = {
	hidden: { opacity: 0 },
	visible: { opacity: 1 }
};

export default function Layout({ children, siteOptions, work, cursorRefresh, hasVisited }) {
	const [gearListPanelOpen, setGearListPanelOpen] = useState(false);
	const [siteReady, setSiteReady] = useState(hasVisited ? true : false);
	const router = useRouter();

	useEffect(() => {
		if (!hasVisited) {
			if (
				router.asPath === '/' ||
				router.asPath === '/#work' ||
				router.asPath === '/#about' ||
				router.asPath === '/#contact'
			) {
				const body = document.querySelector('html');
		
				body.classList.add('no-scroll');
		
				setTimeout(() => {
					body.classList.remove('no-scroll');
				}, 4500);
			}
		}
	}, [router.asPath]);

	useEffect(() => {
		if (hasVisited) {
			setSiteReady(true);
		} else {
			setTimeout(() => {
				setSiteReady(true);
			}, 3000);
		}
	}, [hasVisited]);

	const handleGearListPanelOpen = () => {
		setGearListPanelOpen(true);

		const main = document.querySelectorAll('.dim-wrapper');
		
		main.forEach((item) => {
			item.classList.add('gear-list-open');
		});
	};

	const handleGearListPanelClose = () => {
		setGearListPanelOpen(false);

		const main = document.querySelectorAll('.dim-wrapper');
		
		main.forEach((item) => {
			item.classList.remove('gear-list-open');
		});
	};

	return (
		<>
			<Cursor cursorRefresh={cursorRefresh} />
			{siteReady && (
				<Header
					siteOptions={siteOptions}
					work={work}
					hasVisited={hasVisited}
				/>
			)}
			<Main
				initial="hidden"
				animate="visible"
				variants={variants}
				className="main-wrapper dim-wrapper"
			>
				{children}
			</Main>
			<GearListPanel
				isOpen={gearListPanelOpen}
				siteOptions={siteOptions}
				handleGearListPanelClose={handleGearListPanelClose}
			/>
			<Footer
				data={siteOptions}
				handleGearListPanelOpen={handleGearListPanelOpen}
			/>
		</>
	);
}
