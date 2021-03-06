import Link from '@/components/CustomLink';
import Image16to9 from '@/components/Images/Image16to9';
import { PostListItemMotion } from '@/components/Motion/StaggerChildren';
import PostBase from '@/components/PostElements/Base';
import { IPostItem } from '@/types';
import * as React from 'react';

interface IProps {
	small?: boolean;
}
const TopImgPost: React.FC<IPostItem & IProps> = props => {
	const { title, slug, image } = props;

	return (
		<PostListItemMotion className={`flex flex-col max-w-lg text-gray-800 h-full overflow-hidden bg-none`}>
			<Link to={`${slug}`}>
				<Image16to9 image={image} alt={title} imageClassName="rounded-xl" />
			</Link>
			<PostBase
				post={props}
				wrapperClass={'pt-4'}
				postTitleProps={{
					fontKey: 'text-lg',
					clamp: 3,
					bold: 'font-semibold',
					className: 'mb-2 text-ac-slate-dark'
				}}
				audioDuration
				hideTime
			/>
		</PostListItemMotion>
	);
};

export default TopImgPost;
