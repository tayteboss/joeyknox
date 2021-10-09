import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';
import InnerWrapper from '../elements/InnerWrapper';
import Grid from '../elements/Grid';

const WorkVideoEmbedModuleWrapper = styled.section`
	margin-bottom: ${props => props.marginBottom};

	@media ${props => props.theme.mediaBreakpoints.mobile}
	{
		margin-bottom: ${props => props.mobileMarginBottom}
	}
`;

const VideoWrapperFull = styled.div`
	width: 100%;
`;

const VideoWrapperFramed = styled.div`
	grid-column: 2 / 12;

	@media ${props => props.theme.mediaBreakpoints.tabletMedium}
	{
		grid-column: 1 / -1;
	}
`;

const IframeWrapper = styled.div`
	position: relative;
	overflow: hidden;
	width: 100%;
	padding-top: 56.25%; /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */

	iframe
	{
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		width: 100%;
		height: 100%;
	}
`;

const WorkVideoEmbedModule = ({ data }) => {
	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.2,
		rootMargin: '-15%'
	});

	return (
		<>
			{data.primary.video_embed && (
				<WorkVideoEmbedModuleWrapper
					marginBottom={data.primary.margin_bottom}
					mobileMarginBottom={data.primary.mobile_margin_bottom}
					ref={ref}
					className={`view-element-bottom-top ${inView ? 'view-element-bottom-top--in-view' : ''}`}
				>
					{data.primary.full_width ? (
						<VideoWrapperFull>
							<IframeWrapper dangerouslySetInnerHTML={{ __html: data.primary.video_embed[0].text }} />
						</VideoWrapperFull>
					) : (
						<InnerWrapper>
							<Grid>
								<VideoWrapperFramed>
									<IframeWrapper dangerouslySetInnerHTML={{ __html: data.primary.video_embed[0].text }} />
								</VideoWrapperFramed>
							</Grid>
						</InnerWrapper>
					)}
				</WorkVideoEmbedModuleWrapper>
			)}
		</>
	);
};

export default WorkVideoEmbedModule;
