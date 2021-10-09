import styled from 'styled-components';

const ImageTag = styled.img`
	object-fit: cover;
	height: 100%;
	width: 100%;
`;

const Image = ({ src, alt }) => {
	return <ImageTag className="image-tag" src={src} alt={alt} />;
};

export default Image;
