import { useEffect } from 'react';
import styled from 'styled-components';
import Grid from '../elements/Grid';
import Image from '../elements/Image';
import InnerWrapper from '../elements/InnerWrapper';
import { useInView } from 'react-intersection-observer';
import Parallax from '../../utils/Parallax';

const WorkFullImageModuleWrapper = styled.section`
	margin-bottom: ${props => props.marginBottom};

	@media ${props => props.theme.mediaBreakpoints.mobile}
	{
		margin-bottom: ${props => props.mobileMarginBottom}
	}

	height: 100vh;
	width: 100%;

	.image-tag {
		transform: scale(1.075);
	}

	.parallax-container
	{
		height: 100%;
	}
`;

const FullImageWrapper = styled.div`
	width: ${props => props.inView ? '100%' : '90%'};
	transform: ${props => props.inView ? 'translateY(0)' : 'translateY(100px)'};
	opacity: ${props => props.inView ? '1' : '0'};
	height: 100%;
	margin: 0 auto;
	overflow: hidden;

	transition: all 700ms ease;
	transition-delay: 300ms;
`;

const WorkFramedImageModuleWrapper = styled.section`
	margin-bottom: ${props => props.marginBottom};

	@media ${props => props.theme.mediaBreakpoints.mobile}
	{
		margin-bottom: ${props => props.mobileMarginBottom}
	}
`;

const FramedImageWrapper = styled.div`
	grid-column: 2 / 12;
	width: ${props => props.inView ? '100%' : '90%'};
	padding-top: 55%;
	transform: ${props => props.inView ? 'translateY(0)' : 'translateY(100px)'};
	opacity: ${props => props.inView ? '1' : '0'};
	margin: 0 auto;
	overflow: hidden;
	position: relative;

	transition: all 700ms ease;
	transition-delay: 300ms;

	.image-tag
	{
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		height: 100%;
		width: 100%;
	}

	@media ${props => props.theme.mediaBreakpoints.tabletMedium}
	{
		grid-column: 1 / -1;
	}
`;

const WorkImageModule = ({ data, handleIsVisible }) => {
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
		<>
			{data.primary.full_width ? (
				data.primary.image && (
					<WorkFullImageModuleWrapper
						ref={ref}
						marginBottom={data.primary.margin_bottom}
						mobileMarginBottom={data.primary.mobile_margin_bottom}
						id={id}
						data-id={id}
						className={data.primary.add_to_sub_navigation ? 'sub-nav-section' : ''}
					>
						<FullImageWrapper inView={inView}>
							<Parallax offset={50}>
								<Image
									src={data.primary.image.url}
									alt={data.primary.image.alt}
								/>
							</Parallax>
						</FullImageWrapper>
					</WorkFullImageModuleWrapper>
				)
			) : (
				<WorkFramedImageModuleWrapper
					ref={ref}
					marginBottom={data.primary.margin_bottom}
					mobileMarginBottom={data.primary.mobile_margin_bottom}
					className={data.primary.add_to_sub_navigation ? 'sub-nav-section' : ''}
				>
					<InnerWrapper>
						<Grid>
							<FramedImageWrapper inView={inView}>
								<Image
									src={data.primary.image.url}
									alt={data.primary.image.alt}
								/>
							</FramedImageWrapper>
						</Grid>
					</InnerWrapper>
				</WorkFramedImageModuleWrapper>
			)}
		</>
	);
};

export default WorkImageModule;
