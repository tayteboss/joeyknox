import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';
import { useEmblaCarousel } from 'embla-carousel/react';
import InnerWrapper from '../elements/InnerWrapper';
import Grid from '../elements/Grid';
import { useRecursiveTimeout } from '../../utils/UseRecursiveTimeout';
import ReactPlayer from 'react-player';

const WorkCarouselTwoModuleWrapper = styled.section`
		margin-bottom: ${props => props.marginBottom};

	@media ${props => props.theme.mediaBreakpoints.mobile}
	{
		margin-bottom: ${props => props.mobileMarginBottom}
	}

	.embla
	{
		overflow: hidden;
		grid-column: 2 / 12;

		@media ${props => props.theme.mediaBreakpoints.tabletMedium}
		{
			grid-column: 1 / -1;
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
	}

	.embla__slide
	{
		position: relative;
		flex: 0 0 100%;
	}

	.embla__slide__inner {
		position: relative;
		height: 750px;
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
			height: 450px;
		}
	}

	.embla__slide__parallax {
		flex: 0 0 100%;
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		transform: ${props => props.isMouseDown ? null : 'translateX(0) !important'};

		transition: all 100ms ease;
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

const CarouselWrapper = styled.div``;

const CarouselContainer = styled.div``;

const EmblaSlide = styled.div``;

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

const WorkCarouselTwoModule = ({ data }) => {
	const autoplayInterval = 4000;
	const parallaxFactor = 0.7;
	const [isMouseDown, setIsMouseDown] = useState(false);
	const [scrollProgress, setScrollProgress] = useState(0);
	const [parallaxValues, setParallaxValues] = useState([]);
	const [isOnDevice, setIsOnDevice] = useState(false);

	useEffect(() => {
		// checking if on a device
		const ua = navigator.userAgent;
		if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
			setIsOnDevice(true);
		} else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
			setIsOnDevice(true);
		}
	}, []);

	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.2,
		rootMargin: '-15%'
	});

	const [emblaRef, embla] = useEmblaCarousel({
		loop: true,
		containScroll: 'trimSnaps',
		draggable: isOnDevice,
		speed: 10
	});

	// PARALLAX & PROGRESS
	const onScroll = useCallback(() => {
		if (!embla) return;
		const progress = Math.max(0, Math.min(1, embla.scrollProgress()));
		setScrollProgress(Math.ceil(progress * 100));

		const engine = embla.dangerouslyGetEngine();
		const scrollProgress = embla.scrollProgress();

		const styles = embla.scrollSnapList().map((scrollSnap, index) => {
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

			return diffToTarget * (-1 / parallaxFactor) * 50;
		});

		setParallaxValues(styles);
	}, [embla, setScrollProgress, setParallaxValues]);

	// AUTOPLAY
	const handleClick = () => {
		scrollNext();
		stop();
	};

	const autoplay = useCallback(() => {
		if (!embla) return;
		if (embla.canScrollNext()) {
			embla.scrollNext();
		} else {
			embla.scrollTo(0);
		}
	}, [embla]);

	const { play, stop } = useRecursiveTimeout(autoplay, autoplayInterval);

	const scrollNext = useCallback(() => {
		if (!embla) return;
		embla.scrollNext();
	}, [embla]);

	// TRIGGERING ALL
	useEffect(() => {
		if (!embla) return;
		onScroll();
		embla.on('scroll', onScroll);
		embla.on('resize', onScroll);
		embla.on('pointerDown', stop);
		embla.on('pointerUp', play);
	}, [embla, onScroll, stop, play]);

	useEffect(() => {
		play();
	}, [play]);

	return (
		<WorkCarouselTwoModuleWrapper
			ref={ref}
			isMouseDown={isMouseDown}
			marginBottom={data.primary.margin_bottom}
			mobileMarginBottom={data.primary.mobile_margin_bottom}
		>
			<InnerWrapper>
				<Grid>
					<CarouselWrapper
						className="embla cursor-link--carousel-click"
						ref={emblaRef}
						onMouseDown={() => setIsMouseDown(true)}
						onMouseUp={() => setIsMouseDown(false)}
					>
						<CarouselContainer className="embla__container">
							{data.fields.map((item, index) => (
								<EmblaSlide
									className="embla__slide"
									key={index}
									onClick={() => handleClick()}
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
				</Grid>
			</InnerWrapper>
		</WorkCarouselTwoModuleWrapper>
	);
};

export default WorkCarouselTwoModule;
