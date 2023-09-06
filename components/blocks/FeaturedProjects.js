/* eslint-disable prettier/prettier */
import styled from 'styled-components';
import InnerWrapper from '../elements/InnerWrapper';
import useEmblaCarousel from 'embla-carousel-react';
import ReactPlayer from 'react-player';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

const FeaturedProjectsWrapper = styled.section`
	background: ${props => props.theme.colours.white};
	padding-top: 125px;
	padding-bottom: 135px;
	background: ${props => props.theme.colours.white};
	z-index: 5;
	position: relative;
`;

const Title = styled.p`
	margin-bottom: 30px;

	@media ${props => props.theme.mediaBreakpoints.mobile}
	{
		margin-bottom: 16px;
	}
`;

const CarouselWrapper = styled(motion.div)`
	.embla
	{
		overflow: hidden;
		padding: 0 16px;

		img,
		video
		{
			transition: all ${props => props.theme.transitionSpeed.default} ease;
			object-fit: cover;
		}

		&.is-dragging
		{
			img,
			video
			{
				transform: scale(1.03);
			}
		}
	}

	.embla__container
	{
		display: flex;
	}

	.embla__slide
	{
		position: relative;
		flex: 0 0 600px;
		margin-right: 25px;

		@media ${props => props.theme.mediaBreakpoints.tabletPortrait}
		{
			flex: 0 0 400px;
		}

		@media ${props => props.theme.mediaBreakpoints.mobile}
		{
			flex: 0 0 95%;

			&.is-selected
			{
				img
				{
					opacity: 0;
				}
			}
		}
	}
`;

const Embla = styled.div``;

const EmblaContainer = styled.div``;

const EmblaSlide = styled(motion.div)``;

const MediaWrapper = styled.div`
	width: 100%;
	height: 340px;
	overflow: hidden;
	margin-bottom: 15px;
	position: relative;

	@media ${props => props.theme.mediaBreakpoints.tabletPortrait}
	{
		height: 240px;
	}

	@media ${props => props.theme.mediaBreakpoints.mobile}
	{
		height: 200px;
	}
`;

const Thumbnail = styled.img`
	object-fit: cover;
	height: 100%;
	width: 100%;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 1;

	transition: all ${props => props.theme.transitionSpeed.default} ease;

	&:hover
	{
		opacity: 0;
	}
`;

const Details = styled.div`
	display: flex;
	justify-content: space-between;
`;

const DetailsTitle = styled.p``;

const DetailsCategory = styled.p`
	color: ${props => props.theme.colours.grey};
`;

const LinkTag = styled.a``;

const parentVariants = {
	hidden: {
		opacity: 0
	},
	visible: {
		opacity: 1,
		transition: {
			duration: 0.3,
			when: 'beforeChildren',
			staggerChildren: 0.2,
			ease: 'easeInOut'
		}
	}
};

const childVariants = {
	hidden: {
		opacity: 0,
	},
	visible: {
		opacity: 1,
		transition: {
			duration: 0.3
		}
	}
};

const FeaturedProjects = ({ data }) => {
	const [emblaRef, embla] = useEmblaCarousel({
		loop: false,
		dragFree: true,
		containScroll: 'trimSnaps',
		inViewThreshold: 0.1
	});

	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.2,
		rootMargin: '-15%'
	});

	return (
		<>
			{data && (
				<FeaturedProjectsWrapper id="work" ref={ref}>

					<InnerWrapper>
						<Title
							className={`view-element-fade-in ${
								inView ? 'view-element-fade-in--in-view' : ''
							}`}
						>
							Featured
						</Title>
					</InnerWrapper>

					{data?.featured_projects && (
						<CarouselWrapper
							className="cursor-drag"
							variants={parentVariants}
							initial="hidden"
							animate={inView ? 'visible' : 'hidden'}
						>
							<Embla className="embla" ref={emblaRef}>
								<EmblaContainer className="embla__container">
									{data.featured_projects.map((item, index) => (
										<EmblaSlide
											className="embla__slide"
											key={index}
											variants={childVariants}
										>

											<Link scroll={false} href={`/${item.project?._meta.uid}`} passHref legacyBehavior>
												<LinkTag>
													<MediaWrapper>
														{item.project?.video_snippet && (
															<ReactPlayer
																width="100%"
																height="100%"
																playing={true}
																loop={true}
																muted={true}
																url={item.project?.video_snippet?.url}
																playsInline
															/>
														)}
														{item.project?.thumbnail && (
															<Thumbnail src={item.project?.thumbnail?.url} />
														)}
													</MediaWrapper>

													<Details>
														{item.project?.title && (
															<DetailsTitle>{item.project?.title}</DetailsTitle>
														)}
														{item.project?.category && (
															<DetailsCategory>{item.project?.category}</DetailsCategory>
														)}
													</Details>
												</LinkTag>
											</Link>

										</EmblaSlide>
									))}
								</EmblaContainer>
							</Embla>
						</CarouselWrapper>
					)}

				</FeaturedProjectsWrapper>
			)}
		</>
	);
};

export default FeaturedProjects;
