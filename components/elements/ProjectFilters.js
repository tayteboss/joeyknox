import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';

const ProjectFiltersWrapper = styled.div`
	grid-column: 5 / -1;
	display: flex;
	margin-bottom: 20px;

	transition: all ${props => props.theme.transitionSpeed.slow} ease;

	@media ${props => props.theme.mediaBreakpoints.mobile}
	{
		position: fixed;
		bottom: ${props => props.hasScrolled ? '55px' : '-55px'};
		left: 0;
		width: 100%;
		background: ${props => props.theme.colours.white};
		padding: 16px;
		z-index: 10;
		margin-bottom: 0;
		border-top: 1px solid ${props => props.theme.colours.grey};
		opacity: 1 !important;

		transition: all 800ms ease !important;
	}
`;

const FilterTrigger = styled.div`
	margin-right: 12%;
	color: ${props => props.isActive ? props.theme.colours.black : props.theme.colours.grey};

	transition: all ${props => props.theme.transitionSpeed.default} ease;

	&:hover
	{
		color: ${props => props.theme.colours.black};
	}
`;

const ProjectFilters = ({
	handleListTrigger,
	handleGridTrigger,
	isList,
	isGrid
}) => {
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

	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.2,
		rootMargin: '-15%'
	});

	return (
		<ProjectFiltersWrapper
			hasScrolled={hasScrolled}
			ref={ref}
			className={`project-filters-wrapper view-element-fade-in ${
				inView ? 'view-element-fade-in--in-view test' : ''
			}`}
		>
			<FilterTrigger
				isActive={isList}
				className="cursor-link"
				onClick={() => handleListTrigger()}
			>
				List
			</FilterTrigger>
			<FilterTrigger
				isActive={isGrid}
				className="cursor-link"
				onClick={() => handleGridTrigger()}
			>
				Grid
			</FilterTrigger>
		</ProjectFiltersWrapper>
	);
};

export default ProjectFilters;
