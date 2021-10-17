import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';

const ImageTag = styled.img`
	object-fit: cover;
	height: 100%;
	width: 100%;
`;

const Image = ({ src, alt }) => {
	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.2,
		rootMargin: '-15%'
	});

	return (
		<ImageTag
			ref={ref}
			className={`image-tag cursor-link view-element-bottom-top ${
				inView ? 'view-element-bottom-top--in-view' : ''
			}`}
			src={src}
			alt={alt}
		/>
	);
};

export default Image;
