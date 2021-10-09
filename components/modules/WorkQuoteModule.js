import { useEffect } from 'react';
import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';
import InnerWrapper from '../elements/InnerWrapper';
import Grid from '../elements/Grid';

const WorkQuoteModuleWrapper = styled.section`
	margin-bottom: ${props => props.marginBottom};

	@media ${props => props.theme.mediaBreakpoints.mobile}
	{
		margin-bottom: ${props => props.mobileMarginBottom}
	}
`;

const QuoteWrapper = styled.div`
	grid-column: 4 / 10;

	@media ${props => props.theme.mediaBreakpoints.laptop}
	{
		grid-column: 3 / 11;
	}

	@media ${props => props.theme.mediaBreakpoints.tabletMedium}
	{
		grid-column: 1 / -1;
	}
`;

const Quote = styled.h3`
	margin-bottom: 60px;

	@media ${props => props.theme.mediaBreakpoints.tabletPortrait}
	{
		margin-bottom: 40px;
	}
`;

const Footnote = styled.p`
	transition-delay: 500ms;
`;

const WorkQuoteModule = ({ data, handleIsVisible }) => {
	let id = '';
	if (data.primary.sub_navigation_label) {
		id = data.primary.sub_navigation_label.replace(/\s+/g, '-').toLowerCase();
	}

	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.2,
		rootMargin: '-15%'
	});

	return (
		<WorkQuoteModuleWrapper
			marginBottom={data.primary.margin_bottom}
			mobileMarginBottom={data.primary.mobile_margin_bottom}
			ref={ref}
			className={data.primary.add_to_sub_navigation ? 'sub-nav-section' : ''}
			id={id}
			data-id={id}
		>
			<InnerWrapper>
				<Grid>
					<QuoteWrapper>
						{data.primary.quote && (
							<Quote
								className={`view-element-bottom-top ${
									inView
										? 'view-element-bottom-top--in-view'
										: ''
								}`}
							>
								{data.primary.quote}
							</Quote>
						)}
						{data.primary.credit_footnote && (
							<Footnote
								className={`label-style view-element-left-right ${inView ? 'view-element-left-right--in-view' : ''}`}
							>
								{data.primary.credit_footnote}
							</Footnote>
						)}
					</QuoteWrapper>
				</Grid>
			</InnerWrapper>
		</WorkQuoteModuleWrapper>
	);
};

export default WorkQuoteModule;
