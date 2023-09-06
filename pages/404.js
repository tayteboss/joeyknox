import styled from 'styled-components';
import InnerWrapper from '../components/elements/InnerWrapper';
import Link from 'next/link';

const Custom404Wrapper = styled.div`
	padding-top: 120px;
`;

const Title = styled.h1`
	margin-bottom: 24px;
`;

const LinkTag = styled.a``;

const Custom404 = ({ data, loading }) => {
	return (
		<Custom404Wrapper className="custom-404-wrapper">
			<InnerWrapper>
				<Title>Sorry, we couldn't find that page</Title>
				<Link scroll={false} href="/" passHref legacyBehavior>
					<LinkTag>Back to home</LinkTag>
				</Link>
			</InnerWrapper>
		</Custom404Wrapper>
	);
}

export default Custom404;
