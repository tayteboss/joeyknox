import { gql } from '@apollo/client';
import projectFragments from '../fragments/fragments';

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
					showreel_fallback_image
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
					gear_list
					cv {
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
					music_videos {
						... on Site_optionsMusic_videos {
							project {
								... on Project {
									title
									date
									vimeo_embed
									is_private
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
					commercial {
						... on Site_optionsCommercial {
							project {
								... on Project {
									title
									date
									vimeo_embed
									is_private
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
					narrative {
						... on Site_optionsNarrative {
							project {
								... on Project {
									title
									date
									vimeo_embed
									is_private
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
				}
			}
		}
	}
`;
