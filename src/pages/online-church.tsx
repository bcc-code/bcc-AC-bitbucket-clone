import React from 'react'
import MetaTag from '@/components/Meta'
import onlineServer16to9 from '@/images/landingPage/online-church.jpg'
import onlineServerMobile from '@/images/landingPage/online-church-small.jpg'
import Icon from '@/components/Icons/Icon'
import Countdown from 'react-countdown';
import EmbedVideo from '@/components/Images/Video16to9'
import Image2To1 from '@/components/Images/Image2To1'
import { FetchOnePost } from '@/HOC/FetchPosts'
import shortid from 'shortid'
import Link from '@/components/CustomLink'
import { timeToString } from '@/helpers'
import AddToCalendarLocal from '@/layout-parts/LandingPage/AddToCalendar'
import MailchimpSubscribe from "react-mailchimp-subscribe"
import CustomForm from '@/layout-parts/LandingPage/SignUpFormMailChimp'
import ModalWProps from '@/components/Modal/ModalWProps'
import {
    EmailShareButton,
    FacebookShareButton,
    TelegramShareButton,
    WhatsappShareButton,
    FacebookMessengerShareButton,


} from "react-share";

const Completionist = () => <span>You are good to go!</span>;

const OnlineChurch = () => {
    const refElem = React.useRef<HTMLDivElement | null>(null)

    const handleShowDetailsClick = () => {
        if (refElem.current) {
            refElem.current.scrollIntoView()
        }
    }
    const mailChimpUrl = "https://activechristianity.us2.list-manage.com/subscribe/post?u=ac35386bb66cd1f6e45717bcd&amp;id=f36218379d"
    const onlineChurchUrl = "https://brunstadchristianchurch.online.church"
    const date1 = new Date('1 Nov 2020 17:00:00 UTC')
    const date2 = new Date('1 Nov 2020 20:00:00 UTC')
    const date3 = new Date('2 Nov 2020 02:00:00 UTC')

    const IconProps = {
        size: 40,
    }


    const strings = {
        tagline: 'Join us live this sunday',
        title1: 'Take up your cross:',
        title2: 'The secret to perfect unity',
        timeGeneral: '9AM (PST) / 11AM (CST) / 12PM (EST) ',
        dateGeneral: 'NOVEMBER 1',
        days: 'Days',
        hours: 'Hours',
        minutes: 'Minutes',
        seconds: 'Seconds',
        cta: 'See details',
        theme: 'Theme:',
        inviteTitle: 'Online Church Service this Sunday. ',
        inviteDescription: 'BCC Church Service Live – Take up your cross: The secret to perfect unity. Join us this Sunday and connect with our community on our online church service!',
        emailOptionTitle: 'Notify me by email ',
        emailOptionConsent: 'By continuing, you consent to receiving email updates from ActiveChristianity.',
        eventTitle: 'Brunstad Christian Church Online Service',
        eventDescription: 'Sermon theme: “Take up your cross: The secret to perfect unity. Join us on our online service this Sunday, where we will hear more about how we as disciples of Christ are to react to all that\'s going on in the world today. Click on the URL to watch!',
        eventUrl: onlineChurchUrl
    }


    return (
        <div>
            <MetaTag
                type="article"
                title={strings.inviteDescription}
                path={'/online-church'}
                breadcrumb={[]}
            />
            <div className="relative font-roboto font-semibold">
                <div className="absolute inset-0 z-10 pt-4 sm:pt-16">
                    <div className="standard-max-w-px mx-auto text-white h-full flex flex-col" >
                        <div className="flex flex-col">
                            <span className="pb-2 sm:text-2xl">Join us <span className="bg-red-600 text-white px-2 rounded">Live</span> This Sunday </span>

                            <h1 className="text-xl leading-snug md:text-3xl lg:text-4xl bold sm:leading-normal shadow">
                                Take up your cross:<br /> The secret to perfect unity
                        </h1>

                        </div>
                        <div className="flex flex-col pb-12 sm:pt-16">
                            <div className="mt-4 sm:mt-0">
                                <Countdown
                                    date={date1.getTime()}
                                    renderer={({ days, hours, minutes, seconds, completed }) => {
                                        if (completed) {
                                            // Render a completed state
                                            return <Completionist />;
                                        } else {
                                            // Render a countdown
                                            const countingBlocks = [
                                                { time: days, string: strings.days },
                                                { time: hours, string: strings.hours },
                                                { time: minutes, string: strings.minutes },
                                                { time: seconds, string: strings.seconds }
                                            ]
                                            return (
                                                <div className="flex text-white">
                                                    {countingBlocks.map(b => (
                                                        <span className="flex flex-col items-center border border-white rounded-lg mr-2 p-2">
                                                            <span className="text-xs sm:text-4xl">{b.time}</span>
                                                            <span className="text-xs sm:text-base">{b.string}</span>
                                                        </span>
                                                    ))}

                                                </div>
                                            )
                                        }
                                    }}
                                />
                            </div>
                            <div>
                                <button className="flex items-center bg-d4primary text-black py-2 my-4 sm:mt-12 px-4 rounded-full">

                                    <span className="text-sm sm:text-2xl font-bold" onClick={handleShowDetailsClick}>{strings.cta}</span>
                                    <div className="block sm:hidden">
                                        <Icon
                                            name="KeyboardArrowRight"

                                            size="6"
                                        />
                                    </div>
                                    <div className="hidden sm:block">
                                        <Icon
                                            name="KeyboardArrowRight"

                                            size="12"
                                        />
                                    </div>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="absolute inset-0" style={{ background: "#252730", opacity: "0.5" }}></div>
                <img className="hidden sm:block inset-0 w-full" src={onlineServer16to9} alt="" />
                <img className="block sm:hidden inset-0 w-full" src={onlineServerMobile} alt="" />
            </div>
            <div className="bg-d4slate-dark text-white py-4 ">
                <div className="standard-max-w-px mx-auto">
                    <h1 className="text-xs uppercase font-bold pb-2">Before the service starts</h1>
                    <h1 className="font-bold text-lg">More on Message of the cross</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4 py-4">
                        <div className="py-2 mb-6">
                            <FetchOnePost
                                slug={"bible-words-explained-what-does-it-mean-to-take-up-my-cross-daily"}
                                render={({ post }) => {
                                    return post ? (
                                        <>
                                            <div className="w-full">
                                                <EmbedVideo
                                                    className={`rounded-xxl sm:rounded-xl overflow-hidden`}
                                                    src="https://www.youtube.com/embed/3zIwaKgJrbU"

                                                />
                                            </div>
                                            <Link className="flex flex-col" to="/bible-words-explained-what-does-it-mean-to-take-up-my-cross-daily">
                                                <h2 className="text-lg bold py-4 font-semibold text-d4slate-lighter leading-normal">{post.title}</h2>
                                                <p className="leading-normal">{post?.excerpt}</p>
                                            </Link>
                                        </>
                                    ) : <div></div>
                                }}

                            />

                        </div>

                        {["the-message-of-the-cross-practical-christianity",
                            "the-message-of-the-cross-essential-but-unpopular-christianity"].map(slug => (
                                <div className="py-2 mb-6">
                                    <FetchOnePost
                                        slug={slug}
                                        render={({ post }) => {
                                            return post ? (
                                                <Link className="flex flex-col" to={post?.slug}>
                                                    <Image2To1
                                                        className="rounded-xxl overflow-hidden"
                                                        image={post?.image}
                                                    />
                                                    <h2 className="text-lg bold py-4 font-semibold text-d4slate-lighter leading-normal">{post?.title}</h2>
                                                    <p className="leading-normal">{post?.excerpt}</p>
                                                </Link>
                                            ) : <div></div>
                                        }}

                                    />

                                </div>
                            ))
                        }


                    </div>
                </div>

            </div>
            <div className=" py-8" ref={refElem} style={{ background: "#e5e5e5" }}>
                <div className="standard-max-w-px mx-auto sm:flex">
                    <div className="bg-white text-d4slate-dark rounded-xl flex flex-col py-6 px-4 sm:w-7/12">

                        <h5 className="mb-4 ">
                            <div>
                                <Icon name="Event" /><span className="ml-2 font-bold">Event:</span>
                            </div>
                            <span className="font-medium">Brunstad Christian Church Online Service</span>
                        </h5>
                        <div className="mb-4 ">
                            <div>
                                <Icon name="Chat" /><span className="font-bold ml-2">Theme:</span>
                            </div>
                            <h5 className="leading-normal font-medium mb-4">Take up your cross: The secret to perfect unity</h5>
                            <p className="leading-normal font-medium">Join us on our online service Live this Sunday November 1, where we will hear more about how we as disciples are to react to all that’s going on in the world today. Set a reminder so you don’t miss this!</p>
                        </div>
                        <div className="mb-4">
                            <div>
                                <Icon name="WatchLater" /> <span className="font-bold ml-2">Date and Time:</span>
                            </div>

                            {[
                                'November 1 – 6:00 PM (CEST)',
                                'November 1 – 9:00 PM (CEST)',
                                'November 2 – 3:00 AM (CEST)'
                            ].map(d => (
                                <span key={shortid()} className="flex">

                                    <span className="whitespace-pre-wrap font-medium py-2">
                                        {d}
                                    </span>
                                </span>
                            ))}
                        </div>


                        <div className="pr-4">
                            <Icon name="LocationOn" />
                            <span className="font-bold ml-2">Watch live here:</span>
                            <span key={shortid()} className="flex">

                                <a href={onlineChurchUrl} className="break-words w-11/12 py-2" target="_blank" >{onlineChurchUrl}</a>
                            </span>

                        </div>

                    </div>
                    <div className="sm:w-5/12 sm:px-6 sm:flex sm:items-center">
                        <div className="grid sm:grid-cols-1 gap-4 py-4 w-full">
                            {[{
                                iconName: "GroupAdd",
                                bgColor: "bg-d4slate-light",
                                contentBgColor: "bg-d4slate-lighter",
                                textColor: "text-d4slate-dark",
                                title: 'Invite a friend',
                                popUpTitle: 'Invite a friend',
                                popUpContent: (
                                    <div className="mx-auto w-full">
                                        <div className="flex flex-col">
                                            <div className="py-1">
                                                <FacebookMessengerShareButton
                                                    url={onlineChurchUrl}
                                                    title={strings.inviteTitle}

                                                    appId={"1879474385645145"}
                                                >
                                                    <div className="flex items-center">
                                                        <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M35 17.5C35 7.83402 27.166 0 17.5 0C7.83402 0 0 7.83402 0 17.5C0 26.2364 6.39844 33.4756 14.7656 34.7881V22.5586H10.3222V17.5H14.7656V13.6445C14.7656 9.25925 17.377 6.83594 21.376 6.83594C23.29 6.83594 25.293 7.17773 25.293 7.17773V11.4844H23.085C20.9111 11.4844 20.2344 12.8345 20.2344 14.2188V17.5H25.0879L24.312 22.5586H20.2344V34.7881C28.6016 33.4756 35 26.2364 35 17.5Z" fill="#384156" />
                                                            <path d="M24.312 22.5586L25.0879 17.5H20.2344V14.2188C20.2344 12.8345 20.9111 11.4844 23.085 11.4844H25.293V7.17773C25.293 7.17773 23.29 6.83594 21.376 6.83594C17.377 6.83594 14.7656 9.25925 14.7656 13.6445V17.5H10.3222V22.5586H14.7656V34.7881C15.6577 34.9283 16.5703 35 17.5 35C18.4297 35 19.3423 34.9283 20.2344 34.7881V22.5586H24.312Z" fill="white" />
                                                        </svg>

                                                        <span className="pl-4 font-semibold">Facebook Messenger</span>
                                                    </div>

                                                </FacebookMessengerShareButton>

                                            </div>
                                            <div className="py-1">
                                                <FacebookShareButton
                                                    url={onlineChurchUrl}
                                                    quote={`${strings.inviteTitle} | ${strings.inviteDescription}`}
                                                >
                                                    <div className="flex items-center">
                                                        <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M17.5 35C27.165 35 35 27.165 35 17.5C35 7.83502 27.165 0 17.5 0C7.83502 0 0 7.83502 0 17.5C0 27.165 7.83502 35 17.5 35Z" fill="white" />
                                                            <path d="M10.8334 24.2386V27.974L14.3262 25.9883C15.2998 26.2689 16.3348 26.4204 17.4071 26.4204C23.1551 26.4204 27.8142 22.0726 27.8142 16.7102C27.8142 11.3474 23.1551 7 17.4071 7C11.6594 7 7 11.3474 7 16.7102C7 19.7468 8.49397 22.4582 10.8334 24.2386Z" fill="url(#paint0_linear)" />
                                                            <path d="M16.2958 14.0505L10.6833 19.993L15.7911 17.1905L18.4599 19.993L24.0407 14.0505L18.9895 16.804L16.2958 14.0505Z" fill="white" />
                                                            <defs>
                                                                <linearGradient id="paint0_linear" x1="8.16143" y1="8.41784" x2="8.16143" y2="27.0511" gradientUnits="userSpaceOnUse">
                                                                    <stop stop-color="#00C6FF" />
                                                                    <stop offset="1" stop-color="#0068FF" />
                                                                </linearGradient>
                                                            </defs>
                                                        </svg>

                                                        <span className="pl-4 font-semibold">Facebook</span>
                                                    </div>

                                                </FacebookShareButton>

                                            </div>
                                            <div className="py-1">
                                                <WhatsappShareButton
                                                    url={onlineChurchUrl}
                                                    title={`${strings.inviteTitle} | ${strings.inviteDescription}`}
                                                >
                                                    <div className="flex items-center">
                                                        <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M17.5 35C27.165 35 35 27.165 35 17.5C35 7.83502 27.165 0 17.5 0C7.83502 0 0 7.83502 0 17.5C0 27.165 7.83502 35 17.5 35Z" fill="#25D366" />
                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M18.0768 27.2363H18.0725C16.3309 27.2357 14.6196 26.7987 13.0997 25.9697L7.58333 27.4167L9.05961 22.0244C8.14897 20.4463 7.66979 18.6562 7.67057 16.8221C7.67286 11.0847 12.341 6.41675 18.0767 6.41675C20.8605 6.41795 23.4732 7.50165 25.4379 9.46861C27.4025 11.4355 28.4839 14.0499 28.4828 16.8303C28.4805 22.5665 23.8142 27.2339 18.0768 27.2363ZM13.3553 24.0857L13.6711 24.2732C14.9991 25.0612 16.5213 25.4782 18.0733 25.4788H18.0768C22.8439 25.4788 26.7239 21.5987 26.7258 16.8296C26.7267 14.5186 25.8279 12.3455 24.195 10.7107C22.562 9.07582 20.3904 8.17504 18.0802 8.17424C13.3094 8.17424 9.42941 12.0539 9.42752 16.8226C9.42685 18.4569 9.88412 20.0485 10.7499 21.4255L10.9556 21.7528L10.0818 24.9444L13.3553 24.0857ZM22.9632 19.0706C23.1446 19.1583 23.267 19.2174 23.3193 19.3047C23.3843 19.4131 23.3843 19.9337 23.1677 20.5412C22.951 21.1485 21.9122 21.7028 21.4126 21.7775C20.9647 21.8444 20.3978 21.8724 19.775 21.6744C19.3973 21.5546 18.913 21.3946 18.2927 21.1267C15.8551 20.0742 14.2078 17.7117 13.8965 17.2652C13.8747 17.2339 13.8594 17.212 13.8509 17.2006L13.8488 17.1978C13.7112 17.0143 12.7892 15.7841 12.7892 14.5109C12.7892 13.3132 13.3775 12.6855 13.6483 12.3965C13.6669 12.3767 13.684 12.3585 13.6992 12.3418C13.9376 12.0815 14.2193 12.0164 14.3926 12.0164C14.5659 12.0164 14.7395 12.018 14.8909 12.0256C14.9096 12.0266 14.9291 12.0265 14.9492 12.0263C15.1007 12.0255 15.2896 12.0243 15.476 12.472C15.5476 12.6442 15.6525 12.8996 15.7632 13.169C15.9869 13.7137 16.2341 14.3155 16.2776 14.4026C16.3426 14.5327 16.386 14.6845 16.2993 14.8581C16.2863 14.8842 16.2743 14.9087 16.2628 14.9322C16.1977 15.0651 16.1498 15.1629 16.0393 15.2919C15.9958 15.3426 15.9509 15.3973 15.906 15.4519C15.8166 15.5609 15.7271 15.6698 15.6493 15.7474C15.5191 15.8771 15.3836 16.0177 15.5353 16.278C15.6869 16.5384 16.2088 17.3898 16.9817 18.0793C17.8126 18.8204 18.5348 19.1336 18.9009 19.2924C18.9723 19.3234 19.0302 19.3485 19.0727 19.3698C19.3326 19.5 19.4843 19.4782 19.636 19.3047C19.7877 19.1312 20.286 18.5455 20.4593 18.2852C20.6326 18.025 20.806 18.0683 21.0443 18.1551C21.2827 18.2419 22.561 18.8709 22.821 19.001C22.8718 19.0264 22.9192 19.0493 22.9632 19.0706Z" fill="#FDFDFD" />
                                                        </svg>

                                                        <span className="pl-4 font-semibold">Whatsapp</span>
                                                    </div>


                                                </WhatsappShareButton>
                                            </div>
                                            <div className="py-1">
                                                <TelegramShareButton
                                                    url={onlineChurchUrl}
                                                    title={`${strings.inviteTitle} | ${strings.inviteDescription}`}
                                                >
                                                    <div className="flex items-center">
                                                        <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M17.5 35C27.165 35 35 27.165 35 17.5C35 7.83504 27.165 0 17.5 0C7.83504 0 0 7.83504 0 17.5C0 27.165 7.83504 35 17.5 35Z" fill="url(#paint0_linear)" />
                                                            <path d="M6.51746 18.356C8.5632 17.2291 10.8468 16.2886 12.9805 15.3434C16.6513 13.795 20.3366 12.2736 24.0592 10.8571C24.7834 10.6157 26.0848 10.3797 26.2124 11.453C26.1425 12.9723 25.8551 14.4827 25.6579 15.9931C25.1575 19.3146 24.5791 22.6247 24.0151 25.9353C23.8208 27.038 22.4394 27.6089 21.5555 26.9032C19.4313 25.4683 17.2907 24.0475 15.1937 22.5794C14.5067 21.8814 15.1437 20.879 15.7572 20.3805C17.5068 18.6563 19.3622 17.1914 21.0204 15.3781C21.4676 14.298 20.1461 15.2083 19.7102 15.4872C17.315 17.1378 14.9785 18.8891 12.4532 20.3397C11.1633 21.0497 9.65994 20.4429 8.37062 20.0467C7.21459 19.5681 5.52057 19.0859 6.51735 18.3561L6.51746 18.356Z" fill="white" />
                                                            <defs>
                                                                <linearGradient id="paint0_linear" x1="13.127" y1="1.4595" x2="4.37704" y2="21.875" gradientUnits="userSpaceOnUse">
                                                                    <stop stop-color="#37AEE2" />
                                                                    <stop offset="1" stop-color="#1E96C8" />
                                                                </linearGradient>
                                                            </defs>
                                                        </svg>

                                                        <span className="pl-4 font-semibold">Telegram</span>
                                                    </div>

                                                </TelegramShareButton>
                                            </div>
                                            <div className="py-1">
                                                <EmailShareButton
                                                    url={onlineChurchUrl}
                                                    subject={strings.inviteTitle}
                                                    body={strings.inviteDescription}
                                                >
                                                    <div className="flex items-center">
                                                        <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                                            <rect width="34.0789" height="35" rx="17.0395" fill="url(#pattern0)" />
                                                            <defs>
                                                                <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                                                                    <use xlinkHref="#image0" transform="scale(0.00555556)" />
                                                                </pattern>
                                                                <image id="image0" width="180" height="180" xlinkHref="data:image/png;base64,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" />
                                                            </defs>
                                                        </svg>

                                                        <span className="pl-4 font-semibold">Send Email</span>
                                                    </div>
                                                </EmailShareButton>
                                            </div>
                                        </div>
                                    </div>
                                )
                            },
                            {
                                iconName: "AddAlert",
                                bgColor: "bg-d4primary",
                                contentBgColor: "bg-d4primary",
                                textColor: "text-white",
                                title: strings.emailOptionTitle,
                                popUpTitle: strings.emailOptionTitle,
                                popUpContent: (
                                    <MailchimpSubscribe
                                        url={mailChimpUrl}
                                        render={({ subscribe, status, message }) => (
                                            <CustomForm
                                                status={status}
                                                message={message}
                                                onValidated={formData => subscribe(formData)}
                                            />
                                        )}
                                    />
                                )
                            },
                            {
                                iconName: "Event",
                                bgColor: "bg-d4slate-dark",
                                contentBgColor: "bg-d4slate-dark",
                                textColor: "text-white",
                                title: 'Add to Calendar',
                                popUpTitle: "Add to Calendar",
                                popUpContent: (
                                    <div>
                                        {[
                                            {
                                                date: date1,
                                                duration: 1
                                            },
                                            {
                                                date: date2,
                                                duration: 1
                                            },
                                            {
                                                date: date3,
                                                duration: 1
                                            }
                                        ].map(e => {

                                            const endDate = new Date(e.date)
                                            endDate.setHours(endDate.getHours() + e.duration);
                                            return (
                                                <div className="pb-8">
                                                    <h5 className="whitespace-pre-wrap font-semibold mb-4">
                                                        - {timeToString(e.date)}
                                                    </h5>

                                                    <AddToCalendarLocal
                                                        event={{
                                                            title: strings.eventTitle,
                                                            description: strings.eventDescription,
                                                            startTime: e.date,
                                                            endTime: endDate,
                                                            location: 'Online Church'
                                                        }}

                                                    />
                                                </div>
                                            )
                                        })}

                                    </div>
                                )
                            },

                            ].map(item => {
                                return (
                                    <ModalWProps
                                        key={shortid()}
                                        trigger={(
                                            <button className={`${item.bgColor} p-4 text-white rounded-xl flex  items-center justify-center w-full`} >
                                                <Icon name={item.iconName} size="8" />
                                                <span className="px-4 font-bold"> {item.title}</span>
                                            </button>
                                        )}
                                        content={(props: any) => {
                                            return (
                                                <div className={`py-8 px-4 ${item.contentBgColor} ${item.textColor}`}>
                                                    <h2 className={`font-bold pb-4 text-xl`}>{item.popUpTitle}</h2>
                                                    {item.popUpContent}
                                                </div>
                                            )
                                        }}
                                        contentLabel="Get reminder"
                                    />

                                )
                            })}
                        </div>

                    </div>


                </div>
            </div>
        </div>

    )
}

export default OnlineChurch