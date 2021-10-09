import { useState, useEffect } from 'react';
import styled from 'styled-components';
import InnerWrapper from '../elements/InnerWrapper';
import Grid from '../elements/Grid';
import _ from 'lodash';

const IntroMenuWrapper = styled.div`
	position: fixed;
	bottom: calc(100vh - 255px);
	display: ${props => props.hasScrolled ? 'none' : 'block'};

	@media ${props => props.theme.mediaBreakpoints.mobile}
	{
		bottom: calc(100vh - 225px);
	}
`;

const Intro = styled.div`
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

const MenuItem = styled.a`
	grid-column: span 2;
	color: ${props => props.theme.colours.grey};
	width: 50px;

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

const IntroMenu = ({ data }) => {
	const [hasScrolled, setHasScrolled] = useState(false);

	const handleScroll = () => {
		if (window.scrollY > 200) {
			setHasScrolled(true);
		} else {
			setHasScrolled(false);
		}
	};

	useEffect(() => {
		const throttledHandleScroll = _.throttle(handleScroll, 100);
		window.addEventListener('scroll', throttledHandleScroll);
		return () => window.removeEventListener('scroll', throttledHandleScroll);
	}, []);

	return (
		<IntroMenuWrapper hasScrolled={hasScrolled}>
			<InnerWrapper>
				<Grid align="end">
					{data.site_description && (
						<Intro>{data.site_description}</Intro>
					)}
					<MenuItem href="#work">Work</MenuItem>
					<MenuItem href="#about">About</MenuItem>
					<MenuItem href="#contact">Contact</MenuItem>
					<MenuItem href="/work/showreel">Showreel</MenuItem>
				</Grid>
			</InnerWrapper>
		</IntroMenuWrapper>
	);
};

export default IntroMenu;
