import Link from '@/components/CustomLink';
import MetaTag from '@/components/Meta';
import { ToggleFollowOutlineBtn } from '@/components/PostElements/TopicToggleFollow';
import ResourceLayout from '@/layouts/ResourceLayout';
import { ITopicNavItem, IPage } from '@/types';
import { graphql } from 'gatsby';
import React from 'react';
import shortid from 'shortid';

const AllTopic: React.FC<IAllTopic> = props => {
	const { title, groupedTopics, pagePath } = props.pageContext;

	return (
		<ResourceLayout title={title}>
			<MetaTag title={title} type="page" path={pagePath} breadcrumb={[]} />
			<div className="standard-max-w-px mb-8">
				<div className="staggered-boxes-2col">
					{Object.keys(groupedTopics).map(k => {
						return (
							<div style={{ maxWidth: 320 }} className="staggered-boxes-items" key={shortid()}>
								<div className="font-bold border-t uppercase pb-2">{groupedTopics[k].info.name}</div>
								<div className="py-2">
									{groupedTopics[k].topics.map(t => {
										return (
											<div className="flex justify-between pb-2 ">
												<Link className="block text-xs" to={`/${t.to}`}>
													{t.name}
												</Link>
												<div className="px-4 flex">
													<ToggleFollowOutlineBtn id={t.id} />
												</div>
											</div>
										);
									})}
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</ResourceLayout>
	);
};

export default AllTopic;

interface IAllTopic {
	path: string;

	pageContext: {
		pagePath: string;
		title: string;
		themes: IPage[];
		groupedTopics: {
			[key: string]: {
				info: {
					id: string;
					name: string;
				};
				topics: ITopicNavItem[];
			};
		};
	};
}
