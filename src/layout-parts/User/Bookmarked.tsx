import PostItem from '@/components/PostItemCards/RightImg';
import { fetchLocalPostsFromSlugs } from '@/helpers/fetchLocalData';
import { bookmarkedSelector } from '@/state/selectors/user';
import { IPostItem } from '@/types';
import * as React from 'react';
import { useSelector } from 'react-redux';

const UserHistory = () => {
	const [likedPosts, setLikePosts] = React.useState<IPostItem[]>([]);
	const bookmarkedPosts = useSelector(bookmarkedSelector);
	React.useEffect(() => {
		fetchLocalPostsFromSlugs(bookmarkedPosts.map(p => p.slug));
	}, [bookmarkedPosts]);

	return (
		<div className="flex flex-col">
			{likedPosts.map((item, i) => (
				<PostItem {...item} key={i} />
			))}
		</div>
	);
};

export default UserHistory;
