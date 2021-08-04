import Placeholder from '@/components/Loader/MainpagePlaceholder';
import { fetchLocalPostsFromSlugs } from '@/helpers/fetchLocalData';
import { trimSlug } from '@/helpers/index-js';
import { getRandomArray } from '@/helpers/normalizers';
import { IPostItem } from '@/types';
import * as React from 'react';

interface IFetchPost {
	latestSlug: string;
	popularPosts: string[];
	featuredPosts: string[];
	topicId?: string;
	render: (data: { posts: IPostItem[] }) => JSX.Element;
}

const GetFeaturedPostsForTopic: React.FC<IFetchPost> = ({
	latestSlug,
	popularPosts,
	featuredPosts,
	topicId,
	render
}) => {
	const [randomPosts, setRandomPosts] = React.useState<IPostItem[]>([]);
	React.useEffect(() => {
		const processSlug = trimSlug(latestSlug);
		fetch(`/page-data/${processSlug}/page-data.json`)
			.then(res => res.json())
			.then(res => {
				if (res.result && res.result && res.result.pageContext.posts) {
					const latestPost: string[] = res.result.pageContext.posts;
					let toCheck = [...new Set([...popularPosts, ...latestPost])];
					const featuredList1 = getRandomArray(toCheck, 6);
					toCheck = [...new Set([...featuredPosts, ...featuredList1])];
					const featuredList = getRandomArray(toCheck.slice(0, 6), featuredList1.length);
					return fetchLocalPostsFromSlugs(featuredList)
						.then(res => {
							if (res) {
								setRandomPosts(res);
							}
						})
						.catch(error => {
							console.log(error);
						});
				}
				return undefined;
			});
	}, []);
	return <Placeholder loading={randomPosts.length === 0}>{render({ posts: randomPosts })}</Placeholder>;
};

export default GetFeaturedPostsForTopic;
