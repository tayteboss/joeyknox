import { useEffect } from 'react';
import styled from 'styled-components';
import Grid from '../elements/Grid';
import ProjectGridCell from './ProjectGridCell';
import { useInView } from 'react-intersection-observer';

const ProjectGridWrapper = styled.div`
	margin-bottom: 50px;
	position: relative;
`;

const AnchorMarker = styled.div`
	position: absolute;
	top: -50px;
	left: 0;
`;

const Title = styled.p`
	grid-column: 1 / 6;
	position: sticky;
	top: 60px;
	left: 0;

	@media ${props => props.theme.mediaBreakpoints.mobile}
	{
		grid-column: 1 / -1;
		margin-bottom: 16px;
		position: initial;
	}
`;

const List = styled.div`
	grid-column: 6 / -1;

	@media ${props => props.theme.mediaBreakpoints.mobile}
	{
		grid-column: 1 / -1;
	}
`;

const ProjectGrid = ({ data, title, id }) => {
	const { ref, inView } = useInView({
		triggerOnce: false,
		threshold: 0.2,
		rootMargin: '-15%'
	});

	useEffect(() => {
		const body = document.querySelector('body');

		if (inView) {
			body.classList.add(`is-${id}`);
		} else {
			body.classList.remove(`is-${id}`);
		}
	}, [inView, id]);

	return (
		<ProjectGridWrapper ref={ref}>
			<Grid>
				<AnchorMarker id={id} />
				<Title>{title}</Title>
				<List>
					{data.map((item, index) => (
						<ProjectGridCell data={item} key={index} />
					))}
				</List>
			</Grid>
		</ProjectGridWrapper>
	);
};

export default ProjectGrid;
