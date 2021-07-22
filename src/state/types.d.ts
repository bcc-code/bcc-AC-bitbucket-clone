import { Dispatch, Action } from 'redux'
import { ITrack, IUser, IMedia, ITrackType, INavItem, ITranslations, IApiItem, IBreadcrumb, IInfobar } from '@/types'


export interface StateAction extends Action {
  dispatch: Dispatch
  payload?: any
}
export type ILogginStatus = 'success' | 'loading' | 'notLoggedIn'
export interface IRootState {
  auth: IUserState,
  translatedUrls: ITranslationNavItem[]
  playlist: IMedia[]
  isAutoPlay: boolean,
  isSignInModalOpen: ISignInModalContentType
  mpPlayPause: boolean
  userLibrary: IUserLibrary
  currentMedia: IMedia,
  isPlaying: boolean,
  mpHeight: number
  breadcrumb: IBreadcrumb
  infobar: null | IInfobar
}

export interface IUserLibrary {
  followedTopics: IApiItem[]
  followedPlaylists: IApiItem[]
  followedAuthors: IApiItem[]
  unfinishedPosts: IApiItem[]
  bookmarkedPosts: IApiItem[]
  historyPosts: IApiItem[]
}
export interface IUserState {
  is_editor?: boolean
  user?: IUser
  loggedIn: 'loading' | 'success' | 'loading' | 'notLoggedIn'
  errorMessage?: string
}

export type ISignInModalContentType = 'signUpOptions' | 'signInOptions' | 'signInForm' | 'signUpForm' | "forgotPassword" | "giveConsent" | null

export interface ADD_T_URLS_Payload {
  translated: ITranslations[]
}

export interface SET_SCREEN_SIZE_Payload {
  size: ScreenSizeType
  width: number,
  height: number
}

