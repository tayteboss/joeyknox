import { useState } from 'react';
import { getAllWork, getSingleWork, getSiteOptions } from '../lib/source/prismic/api';
import styled from 'styled-components';
import InnerWrapper from '../components/elements/InnerWrapper';
import Grid from '../components/elements/Grid';
import { useInView } from 'react-intersection-observer';
import Image from '../components/elements/Image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { NextSeo } from 'next-seo';

const Project = styled(motion.div)`
	padding-top: 246px;

	@media ${props => props.theme.mediaBreakpoints.mobile}
	{
		padding-top: 185px;
	}
`;

const Title = styled.p`
	grid-column: 1 / 3;
	margin-bottom: 25px;

	@media ${props => props.theme.mediaBreakpoints.mobile}
	{
		grid-column: 1 / 3;
		margin-bottom: 15px;
	}
`;

const Date = styled.p`
	grid-column: 3 / 5;

	@media ${props => props.theme.mediaBreakpoints.tabletMedium}
	{
		grid-column: 5 / 8;
	}

	@media ${props => props.theme.mediaBreakpoints.mobile}
	{
		display: none;
	}
`;

const CreditsTrigger = styled.p`
	grid-column: 5 / 6;
	color: ${props => props.theme.colours.grey};

	transition: all ${props => props.theme.transitionSpeed.default} ease;

	@media ${props => props.theme.mediaBreakpoints.tabletMedium}
	{
		grid-column: 8 / -1;
		text-align: right;
	}

	@media ${props => props.theme.mediaBreakpoints.mobile}
	{
		grid-column: 3 / -1;
	}

	&:hover
	{
		color: ${props => props.theme.colours.black};
	}
`;

const VideoWrapper = styled.section`
	grid-column: 1 / -1;
	margin-bottom: 25px;

	@media ${props => props.theme.mediaBreakpoints.mobile}
	{
		margin-bottom: 15px;
	}
`;

const Video = styled.div`
	position: relative;
	overflow: hidden;
	width: 100%;
	padding-top: 56.25%;

	iframe
	{
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		width: 100%;
		height: 100%;
	}
`;

const StillsWrapper = styled.section`
	grid-column: 1 / -1;
`;

const ImageWrapper = styled.div`
	width: 100%;
	height: auto;
	overflow: hidden;
	margin-bottom: 25px;

	@media ${props => props.theme.mediaBreakpoints.mobile}
	{
		margin-bottom: 13px;
	}

	img
	{
		object-fit: cover;
		height: 100%;
		width: 100%;
	}
`;

const GoBack = styled.a`
	grid-column: 1 / 2;
	margin: 100px 0 120px;

	@media ${props => props.theme.mediaBreakpoints.mobile}
	{
		grid-column: 1 / -1;
		margin: 40px 0 40px 0;
	}
`;

const WorkIndex = styled.div`
	grid-column: 5 / 11;
	margin: 100px 0 120px;

	@media ${props => props.theme.mediaBreakpoints.tabletMedium}
	{
		grid-column: 5 / -1;
	}

	@media ${props => props.theme.mediaBreakpoints.mobile}
	{
		grid-column: 1 / -1;
		margin: 0 0 60px 0;
	}
`;

const WorkIndexTitle = styled.p`
	color: ${props => props.theme.colours.grey};
	margin-bottom: 10px;
`;

const WorkList = styled.div``;

const WorkItem = styled.a`
	color: ${props => props.isWorkIndexHovered ? props.theme.colours.grey : props.theme.colours.black};

	transition: all ${props => props.theme.transitionSpeed.default} ease;

	&:hover
	{
		color: ${props => props.theme.colours.black};
	}
`;

const CreditsOverlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	background: ${props => props.isOpen ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0)'};
	backdrop-filter: ${props => props.isOpen ? 'blur(10px)' : 'blur(0)'};
	opacity: ${props => props.isOpen ? 1 : 0};
	visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
	overflow-y: scroll;

	transition: all ${props => props.theme.transitionSpeed.slow} ease;
`;

const RoleWrapper = styled.div`
	display: flex;
	flex-direction: column;
	margin-right: 5px;
`;

const NameWrapper = styled.div`
	display: flex;
	flex-direction: column;
	margin-left: 5px;
`;

const Role = styled.p`
	color: ${props => props.theme.colours.white};
	text-align: right;
	display: flex;
	flex-direction: column;
`;

const Name = styled.p`
	color: ${props => props.theme.colours.white};
	display: flex;
	flex-direction: column;
`;

const pageTransitionVariants = {
	hidden: { opacity: 0, transition: { duration: 0.5 } },
	visible: { opacity: 1, transition: { duration: 0.5 } }
};

const Page = ({ data, work, cursorRefresh, options }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [isWorkIndexHovered, setIsWorkIndexHovered] = useState(false);

	const handleOpenCredits = () => {
		setIsOpen(true);
		cursorRefresh();
	}

	const handleCloseCredits = () => {
		setIsOpen(false);
		cursorRefresh();
	}

	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.2,
		rootMargin: '-15%'
	});

	const { ref: ref2, inView: inView2 } = useInView({
		triggerOnce: true,
		threshold: 0.2,
		rootMargin: '-15%'
	});

	return (
		<>
			{data && work && (
				<Project
					variants={pageTransitionVariants}
					initial="hidden"
					animate="visible"
					exit="hidden"
				>
					<NextSeo 
						title={data.title ? `${data.title} | Joey Knox Cinematography` : 'Joey Knox Cinematography'}
						description={options.site_description ? options.site_description : null}
					/>
					<InnerWrapper>
						<Grid>
							{data.title && (
								<Title
									className={`view-element-fade-in ${
										inView ? 'view-element-fade-in--in-view' : ''
									}`}
								>
									{data.title}
								</Title>
							)}
							{data.date && (
								<Date
									className={`view-element-fade-in ${
										inView ? 'view-element-fade-in--in-view' : ''
									}`}
								>
									{data.date}
								</Date>
							)}
							<CreditsTrigger
								onClick={() => handleOpenCredits()}
								className={`cursor-link view-element-fade-in ${
									inView ? 'view-element-fade-in--in-view' : ''
								}`}
							>
								See Credits
							</CreditsTrigger>
							{data.vimeo_embed && (
								<VideoWrapper
									ref={ref}
									className={`cursor-hide view-element-bottom-top ${
										inView ? 'view-element-bottom-top--in-view' : ''
									}`}
								>
									<Video
										className="cursor-hide"
										dangerouslySetInnerHTML={{
											__html: data.vimeo_embed
										}}
									/>
								</VideoWrapper>
							)}
							<StillsWrapper>
								{data.stills && (
									data.stills.map((item, index) => (
										<ImageWrapper key={index}>
											<Image
												src={item.image?.url}
												alt={item.image?.alt}
											/>
										</ImageWrapper>
									))
								)}
							</StillsWrapper>

							<Link scroll={false} href="/#work" passHref>
								<GoBack className="cursor-link">Go Back</GoBack>
							</Link>

							<WorkIndex
								ref={ref2}
								className={`cursor-link view-element-fade-in ${
									inView2 ? 'view-element-fade-in--in-view' : ''
								}`}
							>
								<WorkIndexTitle>Index</WorkIndexTitle>
								<WorkList>
									{work.map((item, index) => (
										<Link
											key={index}
											passHref
											href={item.node._meta.uid}
										>
											<WorkItem
												className="cursor-link"
												onMouseOver={() =>
													setIsWorkIndexHovered(true)
												}
												onMouseOut={() =>
													setIsWorkIndexHovered(false)
												}
												isWorkIndexHovered={isWorkIndexHovered}
											>
												{item.node.title},{' '}
											</WorkItem>
										</Link>
									))}
								</WorkList>
							</WorkIndex>

							{data.credits && (
								<CreditsOverlay
									isOpen={isOpen}
									onClick={() => handleCloseCredits()}
									className="cursor-close"
								>
									<RoleWrapper>
										{data.credits.map((item, index) => (
											item.credit_title && (
												<Role key={index}>
													{item.credit_title}
												</Role>
											)
										))}
									</RoleWrapper>
									<NameWrapper>
										{data.credits.map((item, index) => (
											item.credit_name && (
												<Name key={index}>
													{item.credit_name}
												</Name>
											)
										))}
									</NameWrapper>
								</CreditsOverlay>
							)}

						</Grid>
					</InnerWrapper>
				</Project>
			)}
		</>
	);
}

export async function getStaticPaths() {
	const allWork = await getAllWork();

	return {
		paths: allWork.map((item) => {
			return `/${item.node._meta.uid}`;
		}),
		fallback: true
	};
}

export async function getStaticProps({ params }) {
	const data = await getSingleWork(params.slug);
	const work = await getAllWork();
	const options = await getSiteOptions();

	return {
		props: {
			data: data,
			work: work,
			option: options
		}
	};
}

export default Page;
