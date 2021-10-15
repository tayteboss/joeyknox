import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useMousePosition } from '../../utils/UseMousePosition';
import _ from 'lodash';

const CursorWrapper = styled.div`
	mix-blend-mode: difference;
	height: 27px;
	width: 27px;
	z-index: 1000;
	position: fixed;
	display: ${props => props.isOnDevice ? 'none' : 'block'};

	@media ${props => props.theme.mediaBreakpoints.mobile}
	{
		display: none;
	}
`;

const CursorRing = styled(motion.div)`
	position: fixed;
	display: flex;
	flex-flow: row;
	align-content: center;
	justify-content: center;
	top: ${props => props.isHoveringLink ? '-10px' : '-1px'};
	left: ${props => props.isHoveringLink ? '-10px' : '-1px'};
	height: ${props => props.isHoveringLink ? '20px' : '5px'};
	width: ${props => props.isHoveringLink ? '20px' : '5px'};
	background: ${props => props.theme.colours.white};
	border-radius: 50%;
	border: 1px solid ${props => props.theme.colours.white};
	mix-blend-mode: difference;
	pointer-events: none;
	text-align: center;
	z-index: 2;

	transition: height 300ms ease, width 300ms ease, background 200ms ease, top 300ms ease, left 300ms ease, border-radius 300ms ease;
`;

// const CursorText = styled.span`
// 	padding-top: 30px;
// 	opacity: 1;
// 	text-transform: uppercase;
// 	letter-spacing: 0.036rem;
// 	font-size: 0.667rem;
// 	color: ${props => props.theme.colours.white};

// 	transition: opacity 300ms ease 300ms, padding-top 300ms ease;
// `;

const Cursor = () => {
	const [isHoveringLink, setIsHoveringLink] = useState(false);
	const [cursorText, setCursorText] = useState('');
	const [isOnDevice, setIsOnDevice] = useState('');
	const position = useMousePosition();

	let mouseXPosition = position.x;
	let mouseYPosition = position.y;

	const variantsWrapper = {
		visible: {
			x: mouseXPosition,
			y: mouseYPosition,
			transition: {
				type: 'spring',
				mass: 0.1,
				stiffness: 500,
				damping: 50,
				ease: 'linear'
			}
		}
	};

	useEffect(() => {
		const aTags = document.querySelectorAll('a');
		const altLinks = document.querySelectorAll('.cursor-link');

		aTags.forEach((link) => {
			link.addEventListener('mouseenter', () => {
				setIsHoveringLink(true);
			});
			link.addEventListener('mouseleave', () => {
				setIsHoveringLink(false);
			});
		});

		altLinks.forEach((link) => {
			link.addEventListener('mouseenter', () => {
				setIsHoveringLink(true);
			});
			link.addEventListener('mouseleave', () => {
				setIsHoveringLink(false);
			});
		});

		// checking if on a device
		const ua = navigator.userAgent;
		if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
			setIsOnDevice(true);
		} else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
			setIsOnDevice(true);
		}
	}, []);

	return (
		<CursorWrapper isOnDevice={isOnDevice}>
			<CursorRing
				isHoveringLink={isHoveringLink}
				variants={variantsWrapper}
				animate="visible"
			>
				{/* <CursorText>
					{cursorText}
				</CursorText> */}
			</CursorRing>
		</CursorWrapper>
	);
};

export default Cursor;
