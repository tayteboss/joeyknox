import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';
import InnerWrapper from '../elements/InnerWrapper';
import Grid from '../elements/Grid';
import { RichText } from 'prismic-reactjs';

const WorkLabelContentModuleWrapper = styled.section`
	margin-bottom: ${props => props.marginBottom};

	@media ${props => props.theme.mediaBreakpoints.mobile}
	{
		margin-bottom: ${props => props.mobileMarginBottom}
	}
`;

const Label = styled.p`
	max-width: 160px;
	grid-column: ${props => props.isLeftAligned ? '3 / 5' : '6 / 8'};

	@media ${props => props.theme.mediaBreakpoints.tabletMedium}
	{
		grid-column: ${props => props.isLeftAligned ? '1 / 3' : '3 / 5'};
	}

	@media ${props => props.theme.mediaBreakpoints.mobile}
	{
		max-width: 100%;
		grid-column: 1 / -1;
		margin-bottom: 24px;
	}
`;

const ContentWrapper = styled.div`
	grid-column: ${props => props.isLeftAligned ? '5 / 9' : '8 / 12'};

	transition-delay: 500ms;

	@media ${props => props.theme.mediaBreakpoints.tabletMedium}
	{
		grid-column: ${props => props.isLeftAligned ? '3 / 8' : '5 / 9'};
	}

	@media ${props => props.theme.mediaBreakpoints.mobile}
	{
		grid-column: 1 / -1;
	}
`;

const WorkLabelContentModule = ({ data }) => {
	let isLeftAligned = false;

	if (data.primary.column_offset.includes('6')) {
		isLeftAligned = false;
	} else {
		isLeftAligned = true;
	}

	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.2,
		rootMargin: '-15%'
	});

	return (
		<WorkLabelContentModuleWrapper
			marginBottom={data.primary.margin_bottom}
			mobileMarginBottom={data.primary.mobile_margin_bottom}
			ref={ref}
		>
			<InnerWrapper>
				<Grid>
					{data.primary.label_title && (
						<Label
							className={`work-sans-label-style view-element-left-right ${inView ? 'view-element-left-right--in-view' : ''}`}
							isLeftAligned={isLeftAligned}
						>
							{data.primary.label_title}
						</Label>
					)}
					{data.primary.content && (
						<ContentWrapper
							isLeftAligned={isLeftAligned}
							className={`content body2-style view-element-bottom-top ${inView ? 'view-element-bottom-top--in-view' : ''}`}
						>
							<RichText render={data.primary.content} />
						</ContentWrapper>
					)}
				</Grid>
			</InnerWrapper>
		</WorkLabelContentModuleWrapper>
	);
};

export default WorkLabelContentModule;
