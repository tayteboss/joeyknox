import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';
import InnerWrapper from '../elements/InnerWrapper';
import Grid from '../elements/Grid';
import Image from '../elements/Image';

const WorkHalfImageModuleWrapper = styled.section`
	margin-bottom: ${props => props.marginBottom};

	@media ${props => props.theme.mediaBreakpoints.mobile}
	{
		margin-bottom: ${props => props.mobileMarginBottom}
	}
`;


const WorkHalfImageModuleInner = styled.div`
	grid-column: 2 / 12;

	@media ${props => props.theme.mediaBreakpoints.tabletMedium}
	{
		grid-column: 1 / -1;
	}
`;

const GridInner = styled.div`
	display: grid;
	grid-template-columns: repeat(10, minmax(0, 1fr));
	grid-column-gap: 16px;
	align-items: center;

	@media ${props => props.theme.mediaBreakpoints.tabletMedium}
	{
		grid-template-columns: repeat(8, minmax(0, 1fr));
	}

	@media ${(props) => props.theme.mediaBreakpoints.mobile} {
		grid-template-columns: repeat(4, minmax(0, 1fr));
	}
`;

const ImageWrapper = styled.div`
	grid-column: span 5;
	padding-top: 55%;
	position: relative;
	transform: ${props => props.inView ? 'translateY(0)' : 'translateY(100px)'};
	opacity: ${props => props.inView ? '1' : '0'};
	width: ${props => props.inView ? '100%' : '90%'};
	margin: 0 auto;

	transition: all 700ms ease;
	transition-delay: 300ms;

	&:last-of-type
	{
		transition-delay: 500ms;
	}

	@media ${props => props.theme.mediaBreakpoints.tabletMedium}
	{
		grid-column: span 4;
	}

	@media ${props => props.theme.mediaBreakpoints.tabletPortrait}
	{
		grid-column: 1 / -1;

		&:not(:last-of-type)
		{
			margin: 0 auto 16px auto;
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

const WorkHalfImageModule = ({ data }) => {
	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.2,
		rootMargin: '-15%'
	});

	return (
		<WorkHalfImageModuleWrapper
			ref={ref}
			marginBottom={data.primary.margin_bottom}
			mobileMarginBottom={data.primary.mobile_margin_bottom}
		>
			<InnerWrapper>
				<Grid>
					<WorkHalfImageModuleInner>
						<GridInner>
							{data.fields.map((item, index) => (
								<ImageWrapper key={index} inView={inView}>
									<Image
										src={item.image.url}
										alt={item.image.alt}
									/>
								</ImageWrapper>
							))}
						</GridInner>
					</WorkHalfImageModuleInner>
				</Grid>
			</InnerWrapper>
		</WorkHalfImageModuleWrapper>
	);
};

export default WorkHalfImageModule;
