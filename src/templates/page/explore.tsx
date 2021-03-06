import { LayoutH1 } from '@/components/Headers';
import MetaTag from '@/components/Meta';
import localStorageHelper from '@/helpers/localStorage';
import { filterTopics } from '@/helpers/normalizers';
import ExploreHomeLayout from '@/layout-parts/Explore/ExploreHome';
import CustomePagination from '@/layout-parts/Explore/Pagination';
import CustomSearchBox from '@/layout-parts/Explore/SearchInput';
import ac_strings from '@/strings/ac_strings.js';
import { INavItem, ITopicRes, ITopicPostSlugs } from '@/types';
import loadable from '@loadable/component';
import algoliasearch from 'algoliasearch/lite';
import * as React from 'react';
import { InstantSearch } from 'react-instantsearch-dom';
import { Stats } from 'react-instantsearch-dom';

const RefinementListByTopics = loadable(() => import('@/layout-parts/Explore/ByTopics'));
const SearchResult = loadable(() => import('@/layout-parts/Explore/SearchResult'));

const searchClient = algoliasearch(`${process.env.ALGOLIA_APP_ID}`, `${process.env.ALGOLIA_SEARCH_KEY}`);

const ExplorePage: React.FC<IResource> = props => {
	const [query, setQuery] = React.useState('');
	const [searchHistory, setSearchHistory] = React.useState<string[]>([]);
	const [taxonomyFilter, setTaxonomyFilter] = React.useState<string[] | null>(null);
	const [pageNr, setPageNr] = React.useState(1);
	const [isInputFocus, setInputFocus] = React.useState(false);
	const [searchState, setSearchState] = React.useState<any>({});

	const {
		popularTopics,
		featuredTopics,
		scripturePage,
		recommendFormats,
		allFormats,
		questions,
		featuredVideos,
		songs,
		edification,
		pagePath,
		sortTopicsMap
	} = props.pageContext;

	const topics = filterTopics({ topics: [popularTopics, featuredTopics], returnSlugs: false });

	React.useEffect(() => {
		const search = localStorageHelper.getStoredHistory();
		setSearchHistory(search);
	}, [query]);

	const handleQueryChange = (searchQuery: string) => {
		localStorageHelper.storeQuery(searchQuery);
		setQuery(searchQuery);
	};
	const onSearchStateChange = (state: any) => {
		if (state.page) {
			setPageNr(state.page);
		}

		if (state.refinementList && state.refinementList['topics.name']) {
			setTaxonomyFilter(state.refinementList['topics.name']);
		}
		setSearchState(state);
	};

	const removeTaxonomyFilter = (filter?: string) => {
		if (taxonomyFilter !== null) {
			const refinementState = {
				...searchState.refinementList
			};

			const index = taxonomyFilter.findIndex(item => item === filter);
			const newFiltlerList = [...taxonomyFilter.slice(0, index), ...taxonomyFilter.slice(index + 1)];

			if (filter === undefined || index < 0 || newFiltlerList.length === 0) {
				setTaxonomyFilter(null);
				delete refinementState['topics.name'];
			} else {
				refinementState['topics.name'] = newFiltlerList;
				setTaxonomyFilter(newFiltlerList);
			}

			setSearchState({
				...searchState,
				refinementList: refinementState
			});
		}
	};

	const hasTaxonomyFilter = taxonomyFilter && taxonomyFilter.length !== 0;

	const hasSearchProps = query !== '' || hasTaxonomyFilter;

	const showExploreHome = !isInputFocus && !hasSearchProps;
	const showSearchHistory = isInputFocus && !hasSearchProps;

	const customSearchBoxProps = {
		query,
		setQuery: handleQueryChange,
		isInputFocus,
		setInputFocus,
		taxonomyFilter,
		removeTaxonomyFilter,
		searchHistory,
		setSearchHistory,
		showExploreHome,
		showSearchHistory
	};

	const title = ac_strings.explore;
	return (
		<InstantSearch
			appId=""
			apiKey=""
			searchClient={searchClient}
			indexName="facets"
			searchState={{
				query,
				refinementList: searchState.refinementList
			}}
			onSearchStateChange={onSearchStateChange}
			stalledSearchDelay={500}
		>
			<MetaTag title={title} type="page" breadcrumb={[]} path={pagePath} />
			<div className={`bg-ac-gray-light pb-8 relative`}>
				<div className={`max-w-tablet m-auto`}>
					{isInputFocus === false && (
						<div className={`px-4 sm:px-0 hidden sm:block`}>
							<LayoutH1 title={title} />
						</div>
					)}
					<CustomSearchBox {...customSearchBoxProps} />
				</div>
				{hasSearchProps ? (
					<div className="max-w-tablet m-auto">
						<RefinementListByTopics
							attribute={'topics.name'}
							isShowingResult={isInputFocus === true}
							setTaxonomyFilter={setTaxonomyFilter}
							showMore
							showMoreLimit={30}
							sortTopicsMap={sortTopicsMap}
						/>
					</div>
				) : (
					<div className="min-h-8 min-w-8"></div>
				)}
				{showExploreHome && (
					<ExploreHomeLayout
						allFormats={allFormats}
						recommendFormats={recommendFormats}
						topics={topics}
						edification={edification}
						scriptureSlug={scripturePage ? scripturePage.to : undefined}
						questions={questions}
						featuredVideos={featuredVideos}
						songs={songs}
					/>
				)}

				{!showExploreHome && (
					<div className="bg-white max-w-tablet m-auto py-4 min-h-screen">
						{hasSearchProps && (
							<div>
								<div className="text-gray-500 text-sm italic px-4">
									<Stats />
								</div>
								<SearchResult />
								<CustomePagination defaultRefinement={pageNr} setPageNr={setPageNr} />
							</div>
						)}
					</div>
				)}
			</div>
		</InstantSearch>
	);
};

export default ExplorePage;

interface IResource {
	pageContext: {
		pagePath: string;
		title: string;
		scripturePage: INavItem;
		featuredTopics: ITopicRes[];
		popularTopics: ITopicRes[];
		allFormats: ITopicRes[];
		recommendFormats: ITopicRes[];
		questions: ITopicPostSlugs;
		featuredVideos: ITopicPostSlugs;
		edification: ITopicPostSlugs;
		songs: ITopicPostSlugs;
		sortTopicsMap: any;
		popularScriptures: {
			bookName: string;
			bookId: string;
			chapter: number;
			count: number;
		}[];
	};
}
