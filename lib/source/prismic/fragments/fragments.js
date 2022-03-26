export const projectFragment = `
	... on Site_optionsMusic_videos {
		project {
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
`;
