import { gql } from '@apollo/client';

export const SINGLE_WORK_QUERY = gql`
	query SINGLE_WORK_QUERY($slug: String!) {
		allProjects(uid: $slug) {
			edges {
				node {
					title
					date
					vimeo_embed
					thumbnail
					category
					video_snippet {
						... on _ExternalLink {
							url
							target
						}
						... on _FileLink {
							name
							url
							size
						}
					}
					credits {
						credit_name
						credit_title
					}
					stills {
						image
					}
					_meta {
						uid
					}
				}
			}
		}
	}
`;

export const ALL_WORK_QUERY = gql`
	query ALL_WORK_QUERY($endCursor: String!) {
		allProjects(
			sortBy: meta_firstPublicationDate_DESC
			after: $endCursor
			first: 20
		) {
			totalCount
			pageInfo {
				hasPreviousPage
				hasNextPage
				startCursor
				endCursor
			}
			edges {
				node {
					title
					date
					vimeo_embed
					thumbnail
					category
					video_snippet {
						... on _ExternalLink {
							url
							target
						}
						... on _FileLink {
							name
							url
							size
						}
					}
					credits {
						credit_name
						credit_title
					}
					stills {
						image
					}
					_meta {
						uid
					}
					is_private
				}
			}
		}
	}
`;
