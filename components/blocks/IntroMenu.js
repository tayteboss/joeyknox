import styled from 'styled-components';
import InnerWrapper from '../elements/InnerWrapper';
import Grid from '../elements/Grid';
import { motion } from 'framer-motion';
import { RichText } from 'prismic-reactjs';

const IntroMenuWrapper = styled(motion.div)`
	position: fixed;
	bottom: calc(100vh - 270px);
	background: ${props => props.theme.colours.white};
	z-index: 3;
	padding-bottom: 17px;

	transition: all 10ms ease;
	transition-delay: 10ms;

	@media ${props => props.theme.mediaBreakpoints.mobile}
	{
		top: 180px;
		bottom: initial;
		padding-bottom: 0;
		position: relative;
	}
`;

const IntroMenuWrapperDefault = styled.div`
	position: fixed;
	bottom: calc(100vh - 270px);
	background: ${props => props.theme.colours.white};
	z-index: 3;
	padding-bottom: 17px;
	opacity: 1;

	transition: all 10ms ease;
	transition-delay: 10ms;

	@media ${props => props.theme.mediaBreakpoints.mobile}
	{
		top: 180px;
		bottom: initial;
		padding-bottom: 0;
		position: relative;
	}
`;

const Intro = styled(motion.div)`
	grid-column: span 3;
	white-space: nowrap;

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

const IntroContent = styled.div``;

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
	console.log('data', data);
	return (
		<>
			{hasVisited ? (
				<IntroMenuWrapperDefault className="dim-wrapper">
					<InnerWrapper>
						<Grid align="end">
							{true && (
								<Intro
									variants={childVariant}
									initial={hasVisited ? 'visible' : 'hidden'}
									animate="visible"
								>
									<RichText render={data.site_description} />
								</Intro>
							)}
							<MenuItem
								href="#work"
								className="cursor-link"
								variants={childVariant}
								initial={hasVisited ? 'visible' : 'hidden'}
								animate="visible"
							>
								Work
							</MenuItem>
							<MenuItem
								href="#about"
								className="cursor-link"
								variants={childVariant}
								initial={hasVisited ? 'visible' : 'hidden'}
								animate="visible"
							>
								About
							</MenuItem>
							<MenuItem
								href="#contact"
								className="cursor-link"
								variants={childVariant}
								initial={hasVisited ? 'visible' : 'hidden'}
								animate="visible"
							>
								Contact
							</MenuItem>
							<MenuItem
								href="/showreel"
								className="cursor-link"
								variants={childVariant}
								initial={hasVisited ? 'visible' : 'hidden'}
								animate="visible"
							>
								Showreel
							</MenuItem>
						</Grid>
					</InnerWrapper>
				</IntroMenuWrapperDefault>
			) : (
				<IntroMenuWrapper
					variants={parentVariant}
					initial={hasVisited ? 'visible' : 'hidden'}
					animate="visible"
					className="dim-wrapper"
				>
					<InnerWrapper>
						<Grid align="end">
							{data.site_description && (
								<Intro
									variants={childVariant}
									initial={hasVisited ? 'visible' : 'hidden'}
									animate="visible"
								>
									<RichText render={data.site_description} />
								</Intro>
							)}
							<MenuItem
								href="#work"
								className="cursor-link"
								variants={childVariant}
								initial={hasVisited ? 'visible' : 'hidden'}
								animate="visible"
							>
								Work
							</MenuItem>
							<MenuItem
								href="#about"
								className="cursor-link"
								variants={childVariant}
								initial={hasVisited ? 'visible' : 'hidden'}
								animate="visible"
							>
								About
							</MenuItem>
							<MenuItem
								href="#contact"
								className="cursor-link"
								variants={childVariant}
								initial={hasVisited ? 'visible' : 'hidden'}
								animate="visible"
							>
								Contact
							</MenuItem>
							<MenuItem
								href="/showreel"
								className="cursor-link"
								variants={childVariant}
								initial={hasVisited ? 'visible' : 'hidden'}
								animate="visible"
							>
								Showreel
							</MenuItem>
						</Grid>
					</InnerWrapper>
				</IntroMenuWrapper>
			)}
		</>
	);
};

export default IntroMenu;
