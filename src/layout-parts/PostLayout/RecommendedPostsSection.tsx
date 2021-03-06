import Row3ColAndXScroll from '@/components/List/Combo/Row3Col-HorizontalScroll';
import { fetchPostslistFromArchivePage, fetchLocalPostsFromSlugs } from '@/helpers/fetchLocalData';
import { getRandomArray } from '@/helpers/normalizers';
import ac_strings from '@/strings/ac_strings.js';
import { ITopicNavItem, IPostItem } from '@/types';
import * as React from 'react';

const acApiModule = import('@/util/api');

const RecommendedPostsSection: React.FC<{ postId: string; readMorePosts: string[]; topics?: ITopicNavItem[] }> = ({
	postId,
	readMorePosts,
	topics
}) => {
	const [randomPosts, setRandomPosts] = React.useState<IPostItem[]>([]);

	React.useEffect(() => {
		let readMore: string[] = [];
		if (readMorePosts.length > 0) {
			const procssedReadMore = readMorePosts
				.filter(item => typeof item === 'string')
				.map(item => item.replace(/^\/|\/$/g, ''));
			readMore = procssedReadMore;
		}
		acApiModule.then(res => {
			const api = res.default;
			api.recommendedByPost(postId)
				.then(res => {
					/* setPosts(allSlugs) */

					let randomRecommendPosts: string[] = [];

					if (res.recommendedByPost) {
						const recommendedPosts = res.recommendedByPost.map((p: any) => p.slug);
						let randName = [];
						const recommendPostsSlugs = [...recommendedPosts];
						if (recommendPostsSlugs.length > 0) {
							randName = getRandomArray(recommendPostsSlugs, 3);
							// prepare to remove dupicates in readmores
							randomRecommendPosts = randName.map(item => item.replace(/^\/|\/$/g, ''));
						}
						const allPosts = [...randomRecommendPosts, ...readMore];
						readMore = [...new Set(allPosts)];
						fetchLocalPostsFromSlugs(readMore).then(res => {
							if (res) {
								setRandomPosts(res);
							}
						});
					} else {
						const allTopics = topics ? topics : [];
						Promise.all(allTopics.map(item => fetchPostslistFromArchivePage(item.to))).then(topicsPosts => {
							const topicPosts: IPostItem[] = [];
							topicsPosts.forEach(postRes => {
								if (postRes) {
									const getRandomFromTopic = getRandomArray(postRes, 2);
									topicPosts.push(...getRandomFromTopic);
								}
							});

							return fetchLocalPostsFromSlugs(readMore).then(res => {
								if (res) {
									const allPosts = [...res, ...topicPosts];
									setRandomPosts(allPosts);
								} else {
									setRandomPosts(topicPosts);
								}
							});
						});
					}
				})
				.catch(error => {
					console.log(error);
				});
		});
	}, [postId, readMorePosts]);
	return <Row3ColAndXScroll title={`${ac_strings.you_might_be_interested_in}`} posts={randomPosts} />;
};
export default RecommendedPostsSection;
