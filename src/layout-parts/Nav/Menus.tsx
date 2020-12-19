
import * as React from 'react';
import Icon from '@/components/Icons/Icon'
import ac_strings from '@/strings/ac_strings.js'
export const slug_user = 'user'

export const menusItems = {
    "home": {
        name: ac_strings.home,
        to: "/"
    },
    "listen": {
        name: ac_strings.listen,
        to: ac_strings.slug_listen
    },
    "explore": {
        name: ac_strings.explore,
        to: ac_strings.slug_explore
    },
    "read": {
        name: ac_strings.read,
        to: ac_strings.slug_read
    },
    "watch": {
        name: ac_strings.watch,
        to: ac_strings.slug_watch
    },
    "about": {
        name: ac_strings.about,
        to: ac_strings.slug_about
    },
    "contact": {
        name: ac_strings.contact,
        to: ac_strings.slug_contact
    },
    "glossary": {
        name: ac_strings.glossary,
        to: ac_strings.slug_glossary
    },
    "topic": {
        name: ac_strings.topic,
        to: ac_strings.slug_topic
    },
}

export const userMenuItems = {
    "bookmarked": {
        name: ac_strings.bookmarked,
        to: `${slug_user}/${ac_strings.slug_user_bookmarked}`
    },
    "history": {
        name: ac_strings.history,
        to: `${slug_user}/${ac_strings.slug_user_history}`
    },
    "followed": {
        name: ac_strings.followed,
        to: `${slug_user}/${ac_strings.slug_user_followed}`
    },
    "changePassword": {
        name: ac_strings.change_password,
        to: `${slug_user}/${ac_strings.slug_user_change_password}`
    },
    "deleteProfile": {
        name: ac_strings.delete_profile,
        to: `${slug_user}/${ac_strings.slug_user_delete_profile}`
    },
    "myContent": {
        name: ac_strings.my_content,
        to: `${slug_user}/${ac_strings.slug_user_content}`
    }
}
const getDesktopMenu = () => {
    const listen = ["read", "listen", "watch", "explore"]
    const withoutListen = ["read", "watch", "explore", "about"]
    const menu = process.env.LANG_CODE === "en" ? listen : withoutListen
    return menu.map(item => menusItems[item]);
}

const getMobileMenu = (withItems?: boolean) => {
    const listen = ["explore", "read", "listen", "watch"]
    const withoutListen = ["explore", "read", "watch", "topic"]
    const menu = process.env.LANG_CODE === "en" ? listen : withoutListen
    return withItems ? menu.map(item => menusItems[item]) : menu
}
export const desktopMenu = getDesktopMenu();
export const mobileMenuBase = getMobileMenu();
export const sideMenu = ["about", "contact"].map(item => menusItems[item]);
export const sideResourceMenu = getMobileMenu(true)
if (process.env.LOCALE === "en") {
    sideResourceMenu.push(menusItems.glossary)
}

export const iconMapNav: {
    [key: string]: {
        selected: JSX.Element,
        default: JSX.Element
    }
} = {
    'home': {
        selected: (
            <Icon
                name="Home"
                color="slate-light"
            />
        ),
        default: (
            <Icon
                name="Home"
                color="slate-light"
            />

        )
    },
    'explore': {
        selected: (
            <Icon
                name="Explore"
                color="slate-light"
            />


        ),
        default: (
            <Icon
                name="Explore"
                color="slate-light"

            />

        )
    },
    'listen': {
        selected: (
            <Icon
                name="Headset"
                color="slate-light"
            />



        ),
        default: (
            <Icon
                name="Headset"
                color="slate-light"
            />

        )
    },
    'read': {
        selected: (
            <Icon
                name="Description"
                color="slate-light"
            />


        ),
        default: (
            <Icon
                name="Description"
                color="slate-light"
            />


        )
    },
    'watch': {
        selected: (
            <Icon
                name="PlayCircleOutline"
                color="slate-light"
            />


        ),
        default: (
            <Icon
                name="PlayCircleOutline"
                color="slate-light"
            />


        )
    },
    'my-content': {
        selected: (
            <Icon
                name="Bookmarks"
                color="slate-light"
            />


        ),
        default: (
            <Icon
                name="Bookmarks"
                color="slate-light"
            />


        )
    },
    'topic': {
        selected: (
            <Icon
                name="LocalOffer"
                color="slate-light"
            />


        ),
        default: (
            <Icon
                name="LocalOffer"
                color="slate-light"
            />


        )
    }
}