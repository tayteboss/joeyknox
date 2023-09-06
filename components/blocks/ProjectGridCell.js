import { useState, useEffect } from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';

const ProjectGridCellWrapper = styled.div`
	margin-bottom: 30px;
`;

const LinkTag = styled.a``;

const MediaWrapper = styled.div`
	width: 100%;
	overflow: hidden;
	position: relative;
	margin-bottom: 16px;
	padding-top: 56.25%;

	img,
	video
	{
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		object-fit: cover;
		height: 100%;
		width: 100%;
	}
`;

const ReactPlayerWrapper = styled(motion.div)`
	height: 100%;
	width: 100%;
	z-index: 2;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	object-fit: cover;
`;

const Image = styled.img`
	z-index: 1;
`;

const Details = styled.div`
	display: flex;
	justify-content: space-between;
`;

const Title = styled.p``;

const Year = styled.p`
	color: ${props => props.theme.colours.grey};
`;

const mediaVariants = {
	hidden: {
		opacity: 0,
		transition: {
			duration: 0.3
		}
	},
	visible: {
		opacity: 1,
		transition: {
			duration: 0.3
		}
	}
};

const ProjectGridCell = ({ data }) => {
	const [isHovered, setIsHovered] = useState(false);
	const [isInView, setIsInView] = useState(false);

	const { ref, inView } = useInView({
		triggerOnce: false,
		threshold: 0.6,
		rootMargin: '-15%'
	});

	const { ref: ref2, inView: inView2 } = useInView({
		triggerOnce: true,
		threshold: 0.2,
		rootMargin: '-15%'
	});

	useEffect(() => {
		if (inView && window.innerWidth < 550) {
			setIsInView(true);
		} else {
			setIsInView(false);
		}
	}, [inView]);

	return (
		<>
			{!data.is_private && (
				<ProjectGridCellWrapper
					ref={ref}
					className={`cursor-link view-element-bottom-top ${
						inView2 ? 'view-element-bottom-top--in-view' : ''
					}`}
				>
					<Link href={`/${data.project._meta.uid}`} passHref legacyBehavior>
						<LinkTag>
							<MediaWrapper
								onMouseOver={() => setIsHovered(true)}
								onMouseOut={() => setIsHovered(false)}
								ref={ref2}
							>
									<AnimatePresence>
										{isHovered && (
											<ReactPlayerWrapper
												variants={mediaVariants}
												initial="hidden"
												animate="visible"
												exit="hidden"
											>
												<ReactPlayer
													width="100%"
													height="100%"
													playing={true}
													loop={true}
													muted={true}
													playsInline
													url={data.project.video_snippet?.url}
												/>
											</ReactPlayerWrapper>
										)}
									</AnimatePresence>
								{data.project.thumbnail && (
									<Image src={data.project.thumbnail.url} />
								)}
							</MediaWrapper>
						</LinkTag>
					</Link>
					<Details>
						{data.project.title && <Title>{data.project.title}</Title>}
						{data.project.date && <Year>{data.project.date}</Year>}
					</Details>
				</ProjectGridCellWrapper>
			)}
		</>
	);
};

export default ProjectGridCell;
