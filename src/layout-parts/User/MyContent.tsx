import QPopularAndFeaturedPosts from '@/HOC/QPopularAndFeaturedTopics';
import ImgBgTopicCard from '@/components/Cards/BgImgTopicCard';
import { PageSectionHeader, SectionTitleDesktopAndMobile } from '@/components/Headers';
import XScrollCustomSize from '@/components/HorizontalScroll/BaseCustomSize';
import FeaturedTopics from '@/components/HorizontalScroll/FeaturedTopics';
import HSCardListVideo from '@/components/HorizontalScroll/HSCardListVideo';
import StaggerChildrenMotion from '@/components/Motion/StaggerChildren';
import StaggerChildrenItemMotion from '@/components/Motion/StaggerChildrenItem';
import { SlateDarkUnfollowButton } from '@/components/PostElements/TopicToggleFollow';
import PostItem from '@/components/PostItemCards/RightImg';
import { normalizePostRes, getRandomArray } from '@/helpers/normalizers';
import { followedTopicsSelector, bookmarkedSelector } from '@/state/selectors/user';
import ac_strings from '@/strings/ac_strings.js';
import { IPostItem, IPostRes, ITopic } from '@/types';
import * as React from 'react';
import { useSelector } from 'react-redux';
import shortid from 'shortid';

const acApiModule = import('@/util/api');

const UserContent = () => {
	const followedTopics = useSelector(followedTopicsSelector);
	const bookmarkedPosts = useSelector(bookmarkedSelector);
	const [videoPosts, setVideoPosts] = React.useState<IPostItem[]>([]);
	const [otherPosts, setOtherPosts] = React.useState<IPostItem[]>([]);
	const [topics, setTopics] = React.useState<ITopic[]>([]);
	React.useEffect(() => {
		const postsIds = bookmarkedPosts.map(p => p.id);
		const topicsIds = followedTopics.map(p => p.id); //
		acApiModule.then(res => {
			const api = res.default;
			api.getPostsAndTopicsByIds({ postsIds, topicsIds }).then(postResData => {
				const postRes = postResData.posts && postResData.posts.data ? postResData.posts.data : [];
				const topicRes = postResData.topics ? postResData.topics : [];
				const video: IPostItem[] = [];
				const other: IPostItem[] = [];
				setTopics(topicRes);
				postRes.map((p: IPostRes) => {
					const post = normalizePostRes(p);
					if (post.media.video) {
						video.push(post);
					} else {
						other.push(post);
					}
				});
				setVideoPosts(video);
				setOtherPosts(other);
			});
		});
	}, [bookmarkedPosts]);
	return (
		<div className="flex flex-col ">
			<div className="py-6">
				{followedTopics.length > 0 ? (
					<>
						<SectionTitleDesktopAndMobile name={ac_strings.following} />

						<StaggerChildrenMotion className="hidden sm:grid grid-cols-6 gap-4 px-4">
							{topics.map(({ name, slug: to, id, image }) => {
								return (
									<StaggerChildrenItemMotion className="flex flex-col items-center" key={shortid()}>
										<div style={{ width: '100px', height: '138px' }}>
											<ImgBgTopicCard
												name={name}
												to={`${ac_strings.slug_topic}/${to}`}
												image={image}
											/>
										</div>
										<SlateDarkUnfollowButton id={id} />
									</StaggerChildrenItemMotion>
								);
							})}
						</StaggerChildrenMotion>
						<XScrollCustomSize
							childeClassName=""
							items={topics.map(({ name, slug, id, image }) => {
								return (
									<div className="flex flex-col items-center" key={shortid()}>
										<div style={{ width: '100px', height: '138px' }}>
											<ImgBgTopicCard
												name={name}
												image={image}
												to={`${ac_strings.slug_topic}/${slug}`}
												rounded="rounded-xxl"
											/>
										</div>
										<SlateDarkUnfollowButton id={id} />
									</div>
								);
							})}
						/>
					</>
				) : (
					<div>
						<SectionTitleDesktopAndMobile name={ac_strings.no_followed_topics} />
						<QPopularAndFeaturedPosts
							render={({ topics }) => {
								const randomTopics = getRandomArray(topics, 6);
								return <FeaturedTopics featured={randomTopics} />;
							}}
						/>
					</div>
				)}
			</div>
			{/*             {followedPlaylists.length > 0 && (
                <div>{followedPlaylists.map(p => p.name)}</div>
            )} */}
			{bookmarkedPosts.length > 0 ? (
				<div>
					{videoPosts.length > 0 && (
						<div className="py-6">
							<SectionTitleDesktopAndMobile name={ac_strings.bookmarked_video} />
							<HSCardListVideo posts={videoPosts} />
						</div>
					)}
					{otherPosts.length > 0 && (
						<div className="py-6">
							<SectionTitleDesktopAndMobile name={ac_strings.bookmarked_posts} />
							<div className="px-4">
								{otherPosts.map((item, i) => (
									<PostItem {...item} key={i} />
								))}
							</div>
						</div>
					)}
				</div>
			) : (
				<div className="py-6">
					<PageSectionHeader title={ac_strings.no_bookmark} />
				</div>
			)}
		</div>
	);
};

export default UserContent;
