import { useState, useEffect } from 'react';
import styled from 'styled-components';
import InnerWrapper from '../elements/InnerWrapper';
import Grid from '../elements/Grid';
import { useInView } from 'react-intersection-observer';
import ReactPlayer from 'react-player';

const WorkVideoNativeModuleWrapper = styled.section`
	margin-bottom: ${props => props.marginBottom};

	@media ${props => props.theme.mediaBreakpoints.mobile}
	{
		margin-bottom: ${props => props.mobileMarginBottom}
	}

	video
	{
		object-fit: cover;
	}

	.native-video-mobile-controls
	{
		position: absolute;
		bottom: 30px;
		left: 30px;
		height: 32px;
		width: 32px;
		background: ${props => props.theme.colours.white};
		border-radius: 50%;
		overflow: initial;

		transition-delay: 1000ms;
	}
`;

const VideoWrapperFull = styled.div`
	width: 100%;
	height: 100vh;
	overflow: hidden;
	position: relative;

	& > div
	{
		width: 100%;
		height: 100vh;
		overflow: hidden;
	}
`;

const VideoWrapperFramed = styled.div`
	grid-column: 2 / 12;

	& > div
	{
		width: 100%;
		height: auto;
		overflow: hidden;
	}

	@media ${props => props.theme.mediaBreakpoints.tabletMedium}
	{
		grid-column: 1 / -1;
	}
`;

const MobileControls = styled.div``;

const PlayIcon = styled.img`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

const MuteStateMessage = styled.p`
	position: absolute;
	left: calc(100% + 12px);
	top: 50%;
	transform: translateY(-50%);
	color: ${props => props.theme.colours.white};
	width: 170px;
`;

const WorkVideoNativeModule = ({ data }) => {
	const [hasSound, setHasSound] = useState(false);
	const [isOnDevice, setIsOnDevice] = useState(false);

	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.2,
		rootMargin: '-15%'
	});

	const handleClick = () => {
		setHasSound(!hasSound);
	};

	useEffect(() => {
		// checking if on a device
		const ua = navigator.userAgent;
		if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
			setIsOnDevice(true);
		} else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
			setIsOnDevice(true);
		}
	}, []);

	return (
		<>
			{data.primary.video && (
				<WorkVideoNativeModuleWrapper
					marginBottom={data.primary.margin_bottom}
					mobileMarginBottom={data.primary.mobile_margin_bottom}
					ref={ref}
					className={`view-element-bottom-top ${inView ? 'view-element-bottom-top--in-view' : ''}`}
				>
					{data.primary.full_width ? (
						<VideoWrapperFull
							onClick={() => handleClick()}
							className="cursor-link--video"
						>
							<ReactPlayer
								width="100%"
								height="100vh"
								playing={true}
								loop={true}
								muted={hasSound ? false : true}
								url={data.primary.video.url}
							/>
							{isOnDevice && (
								<MobileControls
									className={`native-video-mobile-controls view-element-left-right ${inView ? 'view-element-left-right--in-view' : ''}`}
									onClick={() => handleClick()}
								>
									<PlayIcon src="/icons/play-triangle.svg" />
									<MuteStateMessage className="work-sans-label-style">
										{hasSound ? 'Mute' : 'Unmute'}
									</MuteStateMessage>
								</MobileControls>
							)}
						</VideoWrapperFull>
					) : (
						<InnerWrapper>
							<Grid>
								<VideoWrapperFramed
									className="cursor-link--video"
									onClick={() => handleClick()}
								>
									<ReactPlayer
										width="100%"
										height="100%"
										playing={true}
										loop={true}
										muted={hasSound ? false : true}
										url={data.primary.video.url}
									/>
									{isOnDevice && (
										<MobileControls
											className={`native-video-mobile-controls view-element-left-right ${inView ? 'view-element-left-right--in-view' : ''}`}
											onClick={() => handleClick()}
										>
											<PlayIcon src="/icons/play-triangle.svg" />
											<MuteStateMessage className="work-sans-label-style">
												{hasSound ? 'Mute' : 'Unmute'}
											</MuteStateMessage>
										</MobileControls>
									)}
								</VideoWrapperFramed>
							</Grid>
						</InnerWrapper>
					)}
				</WorkVideoNativeModuleWrapper>
			)}
		</>
	);
};

export default WorkVideoNativeModule;
