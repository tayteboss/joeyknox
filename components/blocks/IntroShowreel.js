import { useState, useEffect } from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player';
import { motion } from 'framer-motion';
import Link from 'next/link';

const IntroShowreelWrapper = styled(motion.section)`
	width: 100%;
	padding-top: 270px;
	position: relative;
	z-index: 5;
	overflow: hidden;
	pointer-events: none;

	@media ${props => props.theme.mediaBreakpoints.mobile}
	{
		padding-top: 200px;
		margin-top: 0;
		height: 100vh;
	}

	video
	{
		object-fit: cover;
		height: 100vh;
		width: 100vw;
		pointer-events: all;
	}
`;

const IntroShowreelWrapperHasVisited = styled(motion.section)`
	width: 100%;
	padding-top: 270px;
	position: relative;
	z-index: 5;
	overflow: hidden;
	pointer-events: none;

	@media ${props => props.theme.mediaBreakpoints.mobile}
	{
		padding-top: 200px;
		margin-top: 0;
		height: 100vh;
	}

	video
	{
		object-fit: cover;
		height: 100vh;
		width: 100vw;
		pointer-events: all;
	}
`;

const LinkTag = styled.a``;

const IntroShowreel = ({ data, hasVisited }) => {
	const [isMobile, setIsMobile] = useState(false);

	const handleResize = () => {
		if (window.innerWidth < 539) {
			setIsMobile(true);
		} else {
			setIsMobile(false);
		}
	};

	useEffect(() => {
		window.addEventListener('load', handleResize);
		window.addEventListener('resize', handleResize);
	}, []);

	const videoVariant = {
		hidden: {
			y: -270,
			height: isMobile ? 'calc(100vh + 200px)' : 'calc(100vh + 270px)',
			zIndex: 1001
		},
		visible: {
			y: 0,
			height: '100vh',
			zIndex: 5,
			transition: {
				duration: 0.75,
				delay: 3,
				ease: 'easeOut'
			}
		}
	};

	return (
		<>
			{hasVisited ? (
				<IntroShowreelWrapperHasVisited>
					{data.showreel_snippet && (
						<Link scroll={false} href="/showreel" passHref>
							<LinkTag>
								<ReactPlayer
									width="100vw"
									height={isMobile ? '100%' : '100vh'}
									playing={true}
									loop={true}
									muted={true}
									url={data.showreel_snippet?.url}
									playsinline={true}
									className="cursor-showreel"
									config={{
										file: {
											attributes: {
												poster: data.showreel_fallback_image.url
											}
										}
									}}
								/>
							</LinkTag>
						</Link>
					)}
				</IntroShowreelWrapperHasVisited>
			) : (
				<IntroShowreelWrapper
					variants={videoVariant}
					initial={hasVisited ? 'visible' : 'hidden'}
					animate="visible"
				>
					{data.showreel_snippet && (
						<Link scroll={false} href="/showreel" passHref>
							<LinkTag>
								<ReactPlayer
									width="100vw"
									height={isMobile ? '100%' : '100vh'}
									playing={true}
									loop={true}
									muted={true}
									url={data.showreel_snippet?.url}
									playsinline={true}
									className="cursor-showreel"
									config={{
										file: {
											attributes: {
												poster: data.showreel_fallback_image.url
											}
										}
									}}
								/>
							</LinkTag>
						</Link>
					)}
				</IntroShowreelWrapper>
			)}
		</>
	);
};

export default IntroShowreel;
