import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';
import { useEmblaCarousel } from 'embla-carousel/react';
import { motion } from 'framer-motion';
import ReactPlayer from 'react-player';

const WorkCarouselOneModuleWrapper = styled.section`
	margin-bottom: ${props => props.marginBottom};

	@media ${props => props.theme.mediaBreakpoints.mobile}
	{
		margin-bottom: ${props => props.mobileMarginBottom}
	}

	.embla
	{
		overflow: hidden;
		padding-left: 10%;

		@media ${props => props.theme.mediaBreakpoints.tabletMedium}
		{
			padding-left: 16px;
		}

		&.is-dragging
		{
			.embla__slide__img
			{
				transform: translate(-50%, -50%) scale(1.05);
			}
		}

		video
		{
			object-fit: cover;
		}
	}

	.embla__container
	{
		display: flex;
		position: relative;
		margin-bottom: 16px;
		margin-right: 16px;
	}

	.embla__slide
	{
		position: relative;
		flex: 0 0 544px;
		margin-right: 16px;

		@media ${props => props.theme.mediaBreakpoints.tabletMedium}
		{
			flex: 0 0 400px;
		}

		@media ${props => props.theme.mediaBreakpoints.mobile}
		{
			flex: 0 0 310px;
		}
	}

	.embla__slide__inner {
		position: relative;
		height: 760px;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;

		@media ${props => props.theme.mediaBreakpoints.tabletMedium}
		{
			height: 560px;
		}

		@media ${props => props.theme.mediaBreakpoints.mobile}
		{
			height: 435px;
		}
	}

	.embla__slide__parallax {
		flex: 0 0 544px;
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		transform: ${props => props.isMouseDown ? null : 'translateX(0) !important'};

		transition: all 500ms ease;
	}

	.embla__slide__img {
		position: absolute;
		display: block;
		top: 50%;
		left: 50%;
		width: 100%;
		min-height: 100%;
		min-width: 100%;
		max-width: none;
		transform: ${props => props.isMouseDown ? 'translate(-50%, -50%) scale(1.05)' : 'translate(-50%, -50%) scale(1)'};
		object-fit: cover;

		transition: all 500ms ease;
	}
`;

const CarouselWrapper = styled(motion.div)``;

const CarouselContainer = styled.div``;

const EmblaSlide = styled(motion.div)``;

const EmblaSlideInner = styled.div``;

const EmblaSlideParallax = styled.div``;

const Img = styled.img``;

const ProgressBar = styled.div`
	width: calc(100vw - 12%);
	height: 1px;
	background: ${props => props.theme.colours.lightGrey};
	position: relative;
	overflow: hidden;

	@media ${props => props.theme.mediaBreakpoints.tabletMedium}
	{
		width: calc(100vw - 32px);
	}
`;

const Progress = styled.div`
	position: absolute;
	width: 100%;
	top: 0;
	bottom: 0;
	left: -100%;
	background: ${props => props.theme.colours.black};
	height: 2px;

	transition: all 500ms ease;
`;

const wrapperVariants = {
	hidden: {
		opacity: 0
	},
	visible: {
		opacity: 1,
		transition: {
			duration: 0.3,
			staggerChildren: 0.1,
			delayChildren: 0.2,
			when: 'beforeChildren'
		}
	}
};

const childVariants = {
	hidden: {
		opacity: 0,
		y: 50
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5
		}
	}
};

const WorkCarouselOneModule = ({ data }) => {
	const parallaxFactor = 21;
	const [isMouseDown, setIsMouseDown] = useState(false);
	const [scrollProgress, setScrollProgress] = useState(0);
	const [parallaxValues, setParallaxValues] = useState([]);

	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.2,
		rootMargin: '-15%'
	});

	const [emblaRef, embla] = useEmblaCarousel({
		loop: false,
		dragFree: true,
		containScroll: 'trimSnaps',
		inViewThreshold: 0.1
	});

	const onScroll = useCallback(() => {
		if (!embla) return;
		const progress = Math.max(0, Math.min(1, embla.scrollProgress()));
		setScrollProgress(Math.ceil(progress * 100));

		const engine = embla.dangerouslyGetEngine();
		const scrollProgress = embla.scrollProgress();

		const styles = embla.scrollSnapList().map((scrollSnap, index) => {
			// if (!embla.slidesInView().includes(index)) return 0;
			let diffToTarget = scrollSnap - scrollProgress;

			if (engine.options.loop) {
				engine.slideLooper.loopPoints.forEach((loopItem) => {
					const target = loopItem.getTarget();

					if (index === loopItem.index && target !== 0) {
						const sign = Math.sign(target);
						if (sign === -1) diffToTarget = scrollSnap - (1 + scrollProgress);
						if (sign === 1) diffToTarget = scrollSnap + (1 - scrollProgress);
					}
				});
			}

			return diffToTarget * (-1 / parallaxFactor) * 100;
		});

		setParallaxValues(styles);
	}, [embla, setScrollProgress, setParallaxValues]);

	useEffect(() => {
		if (!embla) return;
		onScroll();
		embla.on('scroll', onScroll);
		embla.on('resize', onScroll);
	}, [embla, onScroll]);

	return (
		<WorkCarouselOneModuleWrapper
			ref={ref}
			isMouseDown={isMouseDown}
			marginBottom={data.primary.margin_bottom}
			mobileMarginBottom={data.primary.mobile_margin_bottom}
		>
			<CarouselWrapper
				className="embla cursor-link--carousel"
				ref={emblaRef}
				onMouseDown={() => setIsMouseDown(true)}
				onMouseUp={() => setIsMouseDown(false)}
				variants={wrapperVariants}
				initial="hidden"
				animate={inView ? 'visible' : 'hidden'}
			>
				<CarouselContainer className="embla__container">
					{data.fields.map((item, index) => (
						<EmblaSlide
							variants={childVariants}
							className="embla__slide"
							key={index}
						>
							<EmblaSlideInner className="embla__slide__inner">
								<EmblaSlideParallax
									className="embla__slide__parallax"
									style={{
										transform: `translateX(${parallaxValues[index]}%)`
									}}
								>
									{item.image_or_video.name.includes('.mp4') ? (
										<ReactPlayer
											width="100%"
											height="100%"
											playing={true}
											loop={true}
											muted={true}
											url={item.image_or_video.url}
										/>
									) : (
										<Img
											className="embla__slide__img"
											src={item.image_or_video.url}
											alt={item.image_or_video.alt}
										/>
									)}
								</EmblaSlideParallax>
							</EmblaSlideInner>
						</EmblaSlide>
					))}
				</CarouselContainer>
				<ProgressBar>
					<Progress
						style={{ transform: `translateX(${scrollProgress}%)` }}
					/>
				</ProgressBar>
			</CarouselWrapper>
		</WorkCarouselOneModuleWrapper>
	);
};

export default WorkCarouselOneModule;
