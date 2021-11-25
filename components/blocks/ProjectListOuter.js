import styled from 'styled-components';
import ProjectList from './ProjectList';
import { motion } from 'framer-motion';

const ProjectListOuterWrapper = styled(motion.div)`
	grid-column: 1 / -1;
`;

const ProjectListInner = styled.div`
	position: relative;
`;

const ProjectCover = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: ${props => props.theme.colours.white};
	z-index: 1;
	pointer-events: none;
`;

const parentVarients = {
	hidden: {
		opacity: 0,
		display: 'none',
		transition: {
			duration: 1,
			when: 'afterChildren',
			staggerChildren: 0.05,
			staggerDirection: 1,
			delay: 1,
			ease: 'easeInOut'
		}
	},
	visible: {
		opacity: 1,
		display: 'block',
		transition: {
			duration: 1,
			when: 'beforeChildren',
			staggerChildren: 0.05,
			staggerDirection: 1,
			delay: 1,
			ease: 'easeInOut'
		}
	}
};

const childVarients = {
	hidden: {
		opacity: 1,
		transition: {
			duration: 0.3
		}
	},
	visible: {
		opacity: 0,
		transition: {
			duration: 0.3,
			delay: 2
		}
	}
};

const ProjectListOuter = ({
	musicVideos,
	commercials,
	narratives,
	isActive
}) => {
	return (
		<ProjectListOuterWrapper
			variants={parentVarients}
			initial="hidden"
			animate={isActive ? 'visible' : 'hidden'}
		>
			<ProjectListInner>
				<ProjectList
					data={musicVideos}
					title="Music Videos"
					id="music-videos"
				/>
				<ProjectList
					data={commercials}
					title="Commercial"
					id="commercial"
				/>
				<ProjectList
					data={narratives}
					title="Narrative"
					id="narrative"
				/>
				<ProjectCover
					variants={childVarients}
					initial="hidden"
					animate={isActive ? 'visible' : 'hidden'}
				/>
			</ProjectListInner>
		</ProjectListOuterWrapper>
	);
};

export default ProjectListOuter;
