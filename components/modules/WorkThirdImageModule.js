import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';
import InnerWrapper from '../elements/InnerWrapper';
import Grid from '../elements/Grid';
import Image from '../elements/Image';

const WorkThirdImageModuleWrapper = styled.section`
	margin-bottom: ${props => props.marginBottom};

	@media ${props => props.theme.mediaBreakpoints.mobile}
	{
		margin-bottom: ${props => props.mobileMarginBottom}
	}
`;


const WorkThirdImageModuleInner = styled.div`
	grid-column: 2 / 12;
	display: flex;
	justify-content: center;

	@media ${props => props.theme.mediaBreakpoints.tabletMedium}
	{
		grid-column: 1 / -1;
	}

	@media ${props => props.theme.mediaBreakpoints.tabletPortrait}
	{
		flex-wrap: wrap;
	}
`;

const ImageWrapper = styled.div`
	padding-top: 18%;
	position: relative;
	width: 33.333%;
	transform: ${props => props.inView ? 'translateY(0)' : 'translateY(100px)'};
	opacity: ${props => props.inView ? '1' : '0'};

	transition: all 700ms ease;
	transition-delay: 300ms;

	&:not(:last-of-type)
	{
		margin-right: 16px;
	}

	&:nth-of-type(2)
	{
		transition-delay: 500ms;

		img
		{
			transition-delay: 500ms;
		}
	}

	&:nth-of-type(3)
	{
		transition-delay: 700ms;

		img
		{
			transition-delay: 700ms;
		}
	}

	img
	{
		margin: 0 auto;
		width: ${props => props.inView ? '100%' : '90%'};
		transform: ${props => props.inView ? 'translateY(0)' : 'translateY(100px)'};
		opacity: ${props => props.inView ? '1' : '0'};
	}

	@media ${props => props.theme.mediaBreakpoints.tabletPortrait}
	{
		width: 100%;
		padding-top: 55%;

		&:not(:last-of-type)
		{
			margin-right: 0;
			margin-bottom: 16px;
		}
	}

	.image-tag
	{
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		height: 100%;
		width: 100%;
	}
`;

const WorkThirdImageModule = ({ data }) => {
	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.2,
		rootMargin: '-15%'
	});

	return (
		<WorkThirdImageModuleWrapper
			ref={ref}
			marginBottom={data.primary.margin_bottom}
			mobileMarginBottom={data.primary.mobile_margin_bottom}
		>
			<InnerWrapper>
				<Grid>
					<WorkThirdImageModuleInner>
						{data.fields.map((item, index) => (
							<ImageWrapper key={index} inView={inView}>
								<Image
									src={item.image.url}
									alt={item.image.alt}
								/>
							</ImageWrapper>
						))}
					</WorkThirdImageModuleInner>
				</Grid>
			</InnerWrapper>
		</WorkThirdImageModuleWrapper>
	);
};

export default WorkThirdImageModule;
