import { useEffect } from 'react';
import styled from 'styled-components';
import Grid from '../elements/Grid';
import InnerWrapper from '../elements/InnerWrapper';
import { useInView } from 'react-intersection-observer';

const WorkIntroModuleWrapper = styled.section`
	margin-bottom: ${props => props.marginBottom};

	@media ${props => props.theme.mediaBreakpoints.mobile}
	{
		margin-bottom: ${props => props.mobileMarginBottom}
	}
`;

const Heading = styled.h2`
	grid-column: 2 / 10;

	@media ${props => props.theme.mediaBreakpoints.laptop}
	{
		grid-column: 2 / 11;
	}

	@media ${props => props.theme.mediaBreakpoints.tabletMedium}
	{
		grid-column: 1 / 8;
	}

	@media ${props => props.theme.mediaBreakpoints.tabletPortrait}
	{
		grid-column: 1 / -1;
	}
`;

const WorkIntroModule = ({ data, handleIsVisible }) => {
	let id = '';
	if (data.primary.sub_navigation_label) {
		id = data.primary.sub_navigation_label.replace(/\s+/g, '-').toLowerCase();
	}

	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.2,
		rootMargin: '-15%'
	});

	return (
		<WorkIntroModuleWrapper
			marginBottom={data.primary.margin_bottom}
			mobileMarginBottom={data.primary.mobile_margin_bottom}
			ref={ref}
			className={`${
				data.primary.add_to_sub_navigation
					? 'sub-nav-section'
					: ''
			} view-element-bottom-top ${
				inView ? 'view-element-bottom-top--in-view' : ''
			}`}
			id={id}
			data-id={id}
		>
			<InnerWrapper>
				<Grid>
					<Heading>{data.primary.heading}</Heading>
				</Grid>
			</InnerWrapper>
		</WorkIntroModuleWrapper>
	);
};

export default WorkIntroModule;
