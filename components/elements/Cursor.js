import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useMousePosition } from '../../utils/UseMousePosition';
import _ from 'lodash';

const CursorWrapper = styled.div`
	mix-blend-mode: ${props => props.isHoveringViewLink ? 'normal' : 'difference'};
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
	top: ${props => props.isHoveringViewLink ? '-38px' : props.isHoveringLink ? '-25px' : '-12px'};
	left: ${props => props.isHoveringViewLink ? '-38px' : props.isHoveringLink ? '-25px' : '-12px'};
	height: ${props => props.isHoveringViewLink ? '75px' : props.isHoveringLink ? '50px' : '25px'};
	width: ${props => props.isHoveringViewLink ? '75px' : props.isHoveringLink ? '50px' : '25px'};
	background: ${props => props.isHoveringLink ? props.theme.colours.white : 'none'};
	border-radius: 50%;
	border: 1px solid ${props => props.theme.colours.white};
	mix-blend-mode: ${props => props.isHoveringViewLink ? 'normal' : 'difference'};
	pointer-events: none;
	text-align: center;
	z-index: 2;

	transition: height 300ms ease, width 300ms ease, background 200ms ease, top 300ms ease, left 300ms ease, border-radius 300ms ease;
`;

const CursorPointer = styled(motion.div)`
	position: fixed;
	display: flex;
	flex-flow: row;
	align-content: center;
	justify-content: center;
	top: ${props => props.isHoveringLink ? '-2px' : '0'};
	left: ${props => props.isHoveringLink ? '-2px' : '0'};
	height: ${props => props.isHoveringLink ? '5px' : '2px'};
	width: ${props => props.isHoveringLink ? '5px' : '2px'};
	border-radius: 50%;
	background: ${props => props.isHoveringLink ? props.theme.colours.black : props.theme.colours.white};
	pointer-events: none;
	text-align: center;
	z-index: 2;
	opacity: ${props => props.isHoveringViewLink ? 0 : 1};

	transition: height 300ms ease, width 300ms ease, top 300ms ease, left 300ms ease, opacity 300ms ease;
`;

const CursorFilterBlur = styled(motion.div)`
	position: fixed;
	display: flex;
	flex-flow: row;
	align-content: center;
	justify-content: center;
	top: ${props => props.isHoveringViewLink ? '-99px' : '0'};
	left: ${props => props.isHoveringViewLink ? '-99px' : '0'};
	opacity: ${props => props.isHoveringViewLink ? 1 : 0};
	visibility: ${props => props.isHoveringViewLink ? 'visible' : 'hidden'};
	height: ${props => props.isHoveringViewLink ? '200px' : '0'};
	width: ${props => props.isHoveringViewLink ? '200px' : '0'};
	border-radius: 50%;
	backdrop-filter: blur(20px);
	z-index: 1;
	pointer-events: none;

	transition: opacity 300ms ease, visibility 300ms ease, height 300ms ease,
		width 300ms ease, top 300ms ease, left 300ms ease, border-radius 300ms ease;
`;

const CursorText = styled.span`
	padding-top: 30px;
	opacity: ${props => props.isHoveringViewLink ? 1 : 0};
	text-transform: uppercase;
	letter-spacing: 0.036rem;
	font-size: 0.667rem;
	color: ${props => props.isHoveringVideoLink || props.isCloseStyle ? props.theme.colours.white};

	transition: opacity 300ms ease 300ms, padding-top 300ms ease;
`;

const Cursor = () => {
	const [isHoveringLink, setIsHoveringLink] = useState(false);
	const [isHoveringViewLink, setIsHoveringViewLink] = useState(false);
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

	const variantsPointer = {
		visible: {
			x: mouseXPosition,
			y: mouseYPosition,
			transition: {
				type: 'spring',
				mass: 0.1,
				stiffness: 500,
				damping: 80,
				ease: 'linear'
			}
		}
	};

	useEffect(() => {
		const aTags = document.querySelectorAll('a');
		const altLinks = document.querySelectorAll('.cursor-link');
		const viewStyleLinks = document.querySelectorAll('.cursor-link--view');

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

		viewStyleLinks.forEach((link) => {
			link.addEventListener('mouseenter', () => {
				setIsHoveringViewLink(true);
				setCursorText('View');
			});
			link.addEventListener('mouseleave', () => {
				setIsHoveringViewLink(false);
				setCursorText('');
			});
		});

		// checking if on a device
		const ua = navigator.userAgent;
		if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
			setIsOnDevice(true);
		} else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
			setIsOnDevice(true);
		}
	}, [videoIsMuted]);

	return (
		<CursorWrapper
			isHoveringViewLink={isHoveringViewLink}
			isOnDevice={isOnDevice}
		>
			<CursorRing
				isHoveringLink={isHoveringLink}
				isHoveringViewLink={isHoveringViewLink}
				variants={variantsWrapper}
				animate="visible"
			>
				<CursorText
					isHoveringViewLink={isHoveringViewLink}
				>
					{cursorText}
				</CursorText>
			</CursorRing>
			<CursorPointer
				isHoveringLink={isHoveringLink}
				isHoveringViewLink={isHoveringViewLink}
				variants={variantsPointer}
				animate="visible"
			></CursorPointer>
			<CursorFilterBlur
				className="cursor-filter-blur"
				isHoveringViewLink={isHoveringViewLink}
				isDragging={isDragging}
				variants={variantsPointer}
				animate="visible"
			>
			</CursorFilterBlur>
		</CursorWrapper>
	);
};

export default Cursor;
