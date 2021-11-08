import styled from 'styled-components';
import Grid from '../elements/Grid';
import ProjectListCell from './ProjectListCell';

const ProjectListWrapper = styled.div`
	margin-bottom: 80px;
	position: relative;
`;

const Title = styled.p`
	grid-column: 1 / 5;

	@media ${props => props.theme.mediaBreakpoints.mobile}
	{
		grid-column: 1 / -1;
		margin-bottom: 16px;
	}
`;

const List = styled.div`
	grid-column: 5 / 11;

	@media ${props => props.theme.mediaBreakpoints.tabletLandscape}
	{
		grid-column: 5 / 12;
	}

	@media ${props => props.theme.mediaBreakpoints.tabletPortrait}
	{
		grid-column: 5 / -1;
	}

	@media ${props => props.theme.mediaBreakpoints.mobile}
	{
		grid-column: 1 / -1;
	}
`;

const ProjectList = ({ data, title }) => {
	return (
		<ProjectListWrapper>
			<Grid>
				<Title>{title}</Title>
				<List>
					{data.map((item, index) => (
						<ProjectListCell
							data={item}
							key={index}
							dataLength={data.length}
							index={index}
						/>
					))}
				</List>
			</Grid>
		</ProjectListWrapper>
	);
};

export default ProjectList;
