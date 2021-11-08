import styled from 'styled-components';
import ProjectGrid from './ProjectGrid';
import { motion } from 'framer-motion';

const ProjectGridOuterWrapper = styled(motion.div)`
	grid-column: 1 / -1;
`;

const ProjectGridInner = styled(motion.div)``;

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

const ProjectGridOuter = ({
	musicVideos,
	commercials,
	narratives,
	isActive
}) => {
	return (
		<ProjectGridOuterWrapper
			variants={parentVarients}
			initial="hidden"
			animate={isActive ? 'visible' : 'hidden'}
		>
			<ProjectGridInner variants={childVarients}>
				<ProjectGrid
					data={musicVideos}
					title="Music Videos"
					id="music-videos"
				/>
				<ProjectGrid
					data={commercials}
					title="Commercial"
					id="commercial"
				/>
				<ProjectGrid
					data={narratives}
					title="Narrative"
					id="narrative"
				/>
			</ProjectGridInner>
		</ProjectGridOuterWrapper>
	);
};

export default ProjectGridOuter;
