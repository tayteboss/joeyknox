import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Grid from '../elements/Grid';
import InnerWrapper from '../elements/InnerWrapper';
import ProjectFilters from '../elements/ProjectFilters';
import MobileProjectCategories from '../elements/MobileProjectCategories';
import ProjectListOuter from '../blocks/ProjectListOuter';
import ProjectGridOuter from '../blocks/ProjectGridOuter';

const ProjectsWrapper = styled.section`
	background: ${props => props.theme.colours.white};
	position: relative;
	z-index: 5;
	padding-bottom: 90px;
`;

const Projects = ({ data, cursorRefresh, optionsData }) => {
	const [commercials, setCommercials] = useState([]);
	const [musicVideos, setMusicVideos] = useState([]);
	const [narratives, setNarratives] = useState([]);
	const [isList, setIsList] = useState(true);
	const [isGrid, setIsGrid] = useState(false);

	const handleListTrigger = () => {
		const body = document.querySelector('body');
		body.classList.add('is-list');
		body.classList.remove('is-grid');
		setIsList(true);
		setIsGrid(false);
		cursorRefresh();
	};

	const handleGridTrigger = () => {
		const body = document.querySelector('body');
		body.classList.add('is-grid');
		body.classList.remove('is-list');
		setIsList(false);
		setIsGrid(true);
		cursorRefresh();
	};

	useEffect(() => {
		const body = document.querySelector('body');
		body.classList.add('is-list');

		if (optionsData.commercial) setCommercials(optionsData.commercial);
		if (optionsData.music_videos) setMusicVideos(optionsData.music_videos);
		if (optionsData.narrative) setNarratives(optionsData.narrative);
	}, [optionsData]);

	return (
		<ProjectsWrapper>
			<InnerWrapper>
				<Grid>
					<ProjectFilters
						handleListTrigger={handleListTrigger}
						handleGridTrigger={handleGridTrigger}
						isList={isList}
						isGrid={isGrid}
					/>
					<MobileProjectCategories />
					<ProjectListOuter
						musicVideos={musicVideos}
						commercials={commercials}
						narratives={narratives}
						isActive={isList}
					/>
					<ProjectGridOuter
						musicVideos={musicVideos}
						commercials={commercials}
						narratives={narratives}
						isActive={isGrid}
					/>
				</Grid>
			</InnerWrapper>
		</ProjectsWrapper>
	);
};

export default Projects;
