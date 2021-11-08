import { useState, useEffect } from 'react';
import styled from 'styled-components';
import _ from 'lodash';

const MobileProjectCategoriesWrapper = styled.div`
	display: none;

	@media ${props => props.theme.mediaBreakpoints.mobile}
	{
		display: block;
		position: fixed;
		bottom: ${props => props.hasScrolled ? '0' : '-55px'};
		left: 0;
		width: 100%;
		background: ${props => props.theme.colours.white};
		padding: 16px;
		z-index: 10;
		margin-bottom: 0;
		border-top: 1px solid ${props => props.theme.colours.grey};
		border-bottom: 1px solid ${props => props.theme.colours.grey};

		transition: all ${props => props.theme.transitionSpeed.slow} ease;
	}
`;

const Category = styled.a`
	margin-right: 12%;
	color: ${props => props.theme.colours.grey};

	transition: all ${props => props.theme.transitionSpeed.default} ease;
`;

const MobileProjectCategories = () => {
	const [hasScrolled, setHasScrolled] = useState(false);

	const handleScroll = () => {
		if (window.scrollY > 600) {
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
		<MobileProjectCategoriesWrapper
			className="project-categories-wrapper"
			hasScrolled={hasScrolled}
		>
			<Category href="#music-videos" className="music-videos-category-button">Music Videos</Category>
			<Category href="#commercial" className="commercial-category-button">Commercial</Category>
			<Category href="#narrative" className="narrative-category-button">Narrative</Category>
		</MobileProjectCategoriesWrapper>
	);
};

export default MobileProjectCategories;
