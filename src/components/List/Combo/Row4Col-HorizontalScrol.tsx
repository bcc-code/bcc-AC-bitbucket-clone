import { PageSectionHeaderUpperCaseGray } from '@/components/Headers';
import TopImgHorizontalScrollRow from '@/components/HorizontalScroll/TopImgRow';
import PostRow4Col from '@/components/List/PostRow4Col';
import { IPostItem } from '@/types';
import * as React from 'react';

const Row2ColAndHorizontalScroll: React.FC<{ title: string; posts: IPostItem[] }> = ({ title, posts }) => {
	return (
		<div className="py-6">
			<PageSectionHeaderUpperCaseGray title={title} />
			<div className="hidden sm:block">
				<PostRow4Col posts={posts} />
			</div>
			<div className="sm:hidden -ml-4 -mr-4 py-6">
				<TopImgHorizontalScrollRow posts={posts} />
			</div>
		</div>
	);
};

export default Row2ColAndHorizontalScroll;
