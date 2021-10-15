import { useState, useEffect } from 'react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import { motion } from 'framer-motion';
import Cursor from '../elements/Cursor';
import GearListPanel from '../elements/GearListPanel';
import styled from 'styled-components';

const Main = styled(motion.main)`
	transition: filter 1000ms ease;
`;

const variants = {
	hidden: { opacity: 0 },
	visible: { opacity: 1 }
};

export default function Layout({ children, siteOptions }) {
	const [gearListPanelOpen, setGearListPanelOpen] = useState(false);

	useEffect(() => {
		const body = document.querySelector('html');

		body.classList.add('no-scroll');

		setTimeout(() => {
			body.classList.remove('no-scroll');
		}, 4500);
	}, []);

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
			<Cursor />
			<Header />
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
