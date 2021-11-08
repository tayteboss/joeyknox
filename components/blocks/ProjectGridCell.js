import { useState, useEffect } from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ProjectGridCellWrapper = styled.div`
	margin-bottom: 30px;
`;

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
			duration: 0.2
		}
	},
	visible: {
		opacity: 1,
		transition: {
			duration: 0.2
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

	console.log('isHovered', isHovered);

	return (
		<ProjectGridCellWrapper
			ref={ref}
			className={`cursor-link view-element-bottom-top ${
				inView2 ? 'view-element-bottom-top--in-view' : ''
			}`}
		>
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
								url={data.node.video_snippet?.url}
							/>
						</ReactPlayerWrapper>
					)}
				</AnimatePresence>
				<Image src={data.node.thumbnail.url} />
			</MediaWrapper>
			<Details>
				{data.node.title && <Title>{data.node.title}</Title>}
				{data.node.date && <Year>{data.node.date}</Year>}
			</Details>
		</ProjectGridCellWrapper>
	);
};

export default ProjectGridCell;
