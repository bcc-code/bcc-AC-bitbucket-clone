import { createSelector } from 'reselect'

import { IRootState, ILogginStatus } from '@/state/types'
const stateSelector = (state: IRootState) => (state)

export const isPlaySelector = createSelector(stateSelector, ({ mpPlayPause }) => mpPlayPause)

export const isAutoPlaySelector = createSelector(stateSelector, ({ isAutoPlay }) => isAutoPlay)
export const playlistSelector = createSelector(stateSelector, ({ playlist }) => playlist)
export const currentMediaSelector = createSelector(stateSelector, ({ currentMedia }) => currentMedia)

