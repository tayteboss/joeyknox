import { gql } from '@apollo/client';

export const SITE_OPTIONS_QUERY = gql`
	query SITE_OPTIONS_QUERY {
		allSite_optionss {
			edges {
				node {
					site_title
					site_description
					phone
					email
					footer_content
					instagram {
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
					vimeo {
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
					showreel_snippet {
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
					featured_projects {
						project {
							... on _ExternalLink {
								url
								target
							}
							... on _FileLink {
								name
								url
								size
							}
							... on Project {
								title
								date
								vimeo_embed
								thumbnail
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
					gear_list
					cv
				}
			}
		}
	}
`;
