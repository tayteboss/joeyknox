import { useState, useEffect } from 'react';
import styled from 'styled-components';
import InnerWrapper from '../elements/InnerWrapper';
import Grid from '../elements/Grid';
import _ from 'lodash';
import { motion } from 'framer-motion';

const IntroMenuWrapper = styled(motion.div)`
	position: fixed;
	bottom: calc(100vh - 270px);
	background: ${props => props.theme.colours.white};
	z-index: 3;
	padding-bottom: 17px;
	opacity: ${props => props.hasScrolled ? 0 : 1};
	visibility: ${props => props.hasScrolled ? 'hidden' : 'visible'};
	pointer-events: ${props => props.hasScrolled ? 'none' : 'all'};

	transition: all 10ms ease;
	transition-delay: 10ms;

	@media ${props => props.theme.mediaBreakpoints.mobile}
	{
		top: 140px;
		bottom: initial;
		padding-bottom: 0;
	}
`;

const Intro = styled(motion.div)`
	grid-column: span 3;

	@media ${props => props.theme.mediaBreakpoints.tabletPortrait}
	{
		grid-column: 1 / 10;
	}

	@media ${props => props.theme.mediaBreakpoints.mobile}
	{
		grid-column: 1 / -1;
	}
`;

const MenuItem = styled(motion.a)`
	grid-column: span 2;
	color: ${props => props.theme.colours.grey};
	width: 50px;

	transition: all ${props => props.theme.transitionSpeed.fast} ease;

	&:hover
	{
		color: ${props => props.theme.colours.black};
	}

	&:first-of-type
	{
		grid-column: 5 / 7;
	}

	@media ${props => props.theme.mediaBreakpoints.tabletPortrait}
	{
		display: none;
	}
`;

const parentVariant = {
	hidden: {
		opacity: 0
	},
	visible: {
		opacity: 1,
		transition: {
			duration: 0.3,
			delay: 3.8,
			ease: 'easeOut',
			when: 'beforeChildren',
			staggerChildren: 0.1
		}
	}
};

const childVariant = {
	hidden: {
		opacity: 0
	},
	visible: {
		opacity: 1,
		transition: {
			duration: 0.3,
			ease: 'easeOut'
		}
	}
};

const IntroMenu = ({ data, hasVisited }) => {
	return (
		<IntroMenuWrapper
			variants={parentVariant}
			initial={hasVisited ? 'visible' : 'hidden'}
			animate="visible"
			className="dim-wrapper"
		>
			<InnerWrapper>
				<Grid align="end">
					<Intro variants={childVariant}>
						{data.site_description && data.site_description}
					</Intro>
					<MenuItem
						href="#work"
						className="cursor-link"
						variants={childVariant}
					>
						Work
					</MenuItem>
					<MenuItem
						href="#about"
						className="cursor-link"
						variants={childVariant}
					>
						About
					</MenuItem>
					<MenuItem
						href="#contact"
						className="cursor-link"
						variants={childVariant}
					>
						Contact
					</MenuItem>
					<MenuItem
						href="/showreel"
						className="cursor-link"
						variants={childVariant}
					>
						Showreel
					</MenuItem>
				</Grid>
			</InnerWrapper>
		</IntroMenuWrapper>
	);
};

export default IntroMenu;
