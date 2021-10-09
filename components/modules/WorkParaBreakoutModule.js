import { useEffect } from 'react';
import styled from 'styled-components';
import { RichText } from 'prismic-reactjs';
import InnerWrapper from '../elements/InnerWrapper';
import Grid from '../elements/Grid';
import { useInView } from 'react-intersection-observer';

const WorkParaBreakoutModuleWrapper = styled.section`
	margin-bottom: ${props => props.marginBottom};

	@media ${props => props.theme.mediaBreakpoints.mobile}
	{
		margin-bottom: ${props => props.mobileMarginBottom}
	}
`;

const ContentWrapper = styled.div`
	grid-column: ${props => props.gridColumn};

	@media ${props => props.theme.mediaBreakpoints.tabletMedium}
	{
		grid-column: 1 / 6;
	}

	@media ${props => props.theme.mediaBreakpoints.mobile}
	{
		grid-column: 1 / -1;
	}
`;

const WorkParaBreakoutModule = ({ data, handleIsVisible }) => {
	let id = '';
	if (data.primary.sub_navigation_label) {
		id = data.primary.sub_navigation_label.replace(/\s+/g, '-').toLowerCase();
	}

	let gridColumn = '8 / 12';

	if (data.primary.column_offset.includes('8')) {
		gridColumn = '8 / 12';
	} else {
		gridColumn = '3 / 7';
	}

	const [ref, inView] = useInView({
		triggerOnce: true,
		threshold: 0.2,
		rootMargin: '-15%'
	});

	return (
		<WorkParaBreakoutModuleWrapper
			marginBottom={data.primary.margin_bottom}
			mobileMarginBottom={data.primary.mobile_margin_bottom}
			id={id}
			data-id={id}
			ref={ref}
			className={data.primary.add_to_sub_navigation ? 'sub-nav-section' : ''}
		>
			<InnerWrapper>
				<Grid>
					<ContentWrapper
						gridColumn={gridColumn}
						className={`content body2-style view-element-bottom-top ${inView ? 'view-element-bottom-top--in-view' : ''}`}
					>
						<RichText render={data.primary.content} />
					</ContentWrapper>
				</Grid>
			</InnerWrapper>
		</WorkParaBreakoutModuleWrapper>
	);
};

export default WorkParaBreakoutModule;
