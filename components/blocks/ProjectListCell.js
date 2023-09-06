import { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import ReactPlayer from 'react-player';
import { motion, AnimatePresence } from 'framer-motion';
import { useMousePosition } from '../../utils/UseMousePosition';

const ProjectListCellWrapper = styled.div`
	display: inline;
`;

const LinkTag = styled.a``;

const ProjectTitle = styled.div`
	font-size: 27px;
	line-height: 1.3;
	position: relative;
	z-index: ${props => props.isHovered ? 3 : 1};
	mix-blend-mode: difference;
	color: ${props => props.theme.colours.white};
	display: inline;
`;

const SnippetWrapper = styled(motion.div)`
	position: fixed;
	height: 280px;
	width: 500px;
	top: -140px;
	left: -250px;
	pointer-events: none;
	z-index: 2;
	overflow: hidden;

	transition: all 0 ease;

	@media ${props => props.theme.mediaBreakpoints.mobile}
	{
		display: none;
	}

	video
	{
		object-fit: cover;
		height: 100%;
		width: 100%;
	}
`;

const ProjectListCell = ({ data, dataLength, index }) => {
	const [isHovered, setIsHovered] = useState(false);
	const position = useMousePosition();

	let mouseXPosition = position.x;
	let mouseYPosition = position.y;

	const snippetVariants = {
		hidden: {
			opacity: 0,
			x: mouseXPosition,
			y: mouseYPosition
		},
		visible: {
			opacity: 1,
			x: mouseXPosition,
			y: mouseYPosition
		}
	};

	return (
		<>
			{!data.project.is_private && (
				<ProjectListCellWrapper
					onMouseOver={() => setIsHovered(true)}
					onMouseOut={() => setIsHovered(false)}
					className="cursor-link"
				>
					<Link scroll={false} href={`/${data.project._meta.uid}`} passHref legacyBehavior>
						<LinkTag>
							<ProjectTitle className="cursor-link" isHovered={isHovered}>
								{data.project.title}{index === dataLength - 1 ? '' : ', '}
							</ProjectTitle>
							<AnimatePresence>
								{isHovered && (
									<SnippetWrapper
										variants={snippetVariants}
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
											url={data.project.video_snippet?.url}
											fileconfig={{ attributes: { poster: data.project.thumbnail?.url } }}
											playsInline
										/>
									</SnippetWrapper>
								)}
							</AnimatePresence>
						</LinkTag>
					</Link>
				</ProjectListCellWrapper>
			)}
		</>
	);
};

export default ProjectListCell;
