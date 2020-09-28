import { connectSearchBox } from 'react-instantsearch-dom';

import * as React from 'react';

import SearchInput from '@/components/Search'
import SearchHistory from '@/layout-parts/Explore/SearchHistory'
import localStorageHelper from '@/helpers/localStorage'
import Icon from '@/components/Icons'
import { SubSection } from '@/layout-parts/Explore/ExploreByType'
import ac_strings from '@/strings/ac_strings.json'

interface ICustomerSearchBox {
    setQuery: (query: string) => void
    removeTypeFilter: (filter?: string) => void
    removeTaxonomyFilter: (filter?: string) => void
    isInputFocus: boolean
    setInputFocus: (status: boolean) => void
    refine: (item: any) => void
    currentRefinement: any
    isSearchStalled: boolean
    searchHistory: string[]
    setSearchHistory: (string: []) => void
    showExploreHome: boolean
    showSearchHistory: boolean
}

const SearchBox: React.FC<ICustomerSearchBox> = ({
    setQuery,
    removeTypeFilter,
    removeTaxonomyFilter,
    refine,
    setInputFocus,
    isInputFocus,
    searchHistory,
    setSearchHistory,

    showSearchHistory,

}) => {

    const [localQuery, setLocalQuery] = React.useState('')
    const timerId = React.useRef<NodeJS.Timeout | null>(null)

    const onChangeDebounced = (event: any) => {

        const value = event.currentTarget.value;
        updateQuery(value)
    };

    const useSearchHistory = (value: string) => {
        updateQuery(value)
    }
    const updateQuery = (value: string) => {
        if (timerId.current) {
            clearTimeout(timerId.current);
        }

        timerId.current = setTimeout(() => {
            refine(value)
            setQuery(value)
        }, 500)

        setLocalQuery(value)
    }

    const cancelSearch = () => {

        setInputFocus(false)
        clearInput()
    }

    const clearInput = () => {
        refine('')
        setQuery('')
        setLocalQuery('')
        removeTypeFilter()
        removeTaxonomyFilter()
    }

    const removeSearchHistory = (q: string) => {
        localStorageHelper.removeQuery(q)
        const updatedSearchHistory = localStorageHelper.getStoredHistory()
        setSearchHistory(updatedSearchHistory)
    }

    const clearSearchHistory = () => {
        localStorageHelper.clearHistory()
        const updatedSearchHistory = localStorageHelper.getStoredHistory()
        setSearchHistory(updatedSearchHistory)
    }
    return (
        <div>
            <div className={`flex w-full px-4 sm:px-0 py-4 sm:pb-8 sm:pt-0 ${isInputFocus ? 'pt-4 sm:pt-8' : ''}`}>
                <div className="w-full">
                    <SearchInput
                        placedholderText={ac_strings.searchPlaceHolder}
                        setInputFocus={setInputFocus}
                        clearInput={clearInput}
                        value={localQuery}
                        onChange={onChangeDebounced}


                    />
                </div>
                {isInputFocus && (
                    <button
                        className="pl-2 block text-sm"
                        onClick={cancelSearch}
                        onKeyDown={cancelSearch}
                    >
                        {ac_strings.cancel}
                    </button>
                )}
            </div>

            {showSearchHistory && localQuery === "" &&
                (
                    <div className="max-w-tablet m-auto">
                        <SearchHistory
                            searches={searchHistory}
                            removeSearchHistory={removeSearchHistory}
                            useSearchHistory={useSearchHistory}
                            clearSearchHistory={clearSearchHistory}
                        />
                    </div>

                )

            }

        </div>

    );
}

const CustomSearchBox = connectSearchBox(SearchBox);

export default CustomSearchBox