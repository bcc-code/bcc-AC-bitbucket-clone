declare interface IStrings {
  'lang': string
  'about_activechristianity': string
  'about_activechristianity_body': string
  'account': string
  'all_topics': string
  'all_translations': string
  'already_have_account': string
  'also_available_in': string
  'back_to_home': string
  'blog': string
  'by': string
  'categories': string
  'change_password': string
  'christian_snapshots': string
  'clear': string
  'confirm_password': string
  'contact': string
  'contact_sent': string
  'continue_reading': string
  'copyright': string
  'delete_account': string
  'download_as_pdf': string
  'download_free_e-book': string
  'download': string
  'downloaded_e-books': string
  'downloading': string
  'e-book': string
  'e-books': string
  'email': string
  'featured_articles': string
  'featured_topics': string
  'filter': string
  'follow_us': string
  'forgot_password': string
  'frequently_asked_questions': string
  'full_name': string
  'glossary': string
  'go_to_e_book_library': string
  'go_to_media_library': string
  'incorrect_login': string
  'key_teachings': string
  'latest': string
  'listen_to': string
  'location': string
  'login': string
  'logout': string
  'lyrics': string
  'media': string
  'message': string
  'no_results': string
  'page_not_found': string
  'password': string
  'passwords_mismatch': string
  'please_login': string
  'please_login_download': string
  'popular_articles': string
  'preview': string
  'published_in': string
  'read_by': string
  'read_more_from': string
  'read_more_on_instagram': string
  'read_more_on_this_topic': string
  'read_more': string
  'recommendations': string
  'related_ebooks': string
  'register': string
  'remember_me': string
  'required_username_or_email': string
  'required_password': string
  'reset_password': string
  'reset_password_text': string
  'reset_password_sent': string
  'reset_password_fail': string
  'scripture_copyright': string
  'search_for': string
  'search': string
  'send': string
  'share_on': string
  'show_all': string
  'show_more_posts': string
  'show_more': string
  'sidebar': string
  'send_email': string
  'site_title': string
  'skip_to_content': string
  'slug_about': string
  'slug_ac_author': string
  'slug_ac_banner': string
  'slug_ac_ebook': string
  'slug_ac_essential': string
  'slug_ac_landing_page': string
  'slug_ac_media_category': string
  'slug_ac_media': string
  'slug_attachment': string
  'slug_author': string
  'slug_blog': string
  'slug_category': string
  'slug_contact': string
  'slug_glossary': string
  'slug_post_tag': string
  'slug_search': string
  'slug_topic': string
  'speaker': string
  'sssf': string
  'statement_of_faith': string
  'subscribe_to_our_feed': string
  'subject': string
  'submit': string
  'tagline': string
  'top_menu': string
  'topics': string
  'username': string
  'username_or_email': string
  'visit_our_facebook_page': string
  'visit_our_instagram_profile': string
  'visit_our_twitter_profile': string
  'vocals': string
  'watch': string
  'with': string
  'written_by': string
  'consent_general_main': string
  'consent_general_link': string
  'consent_general_accept': string
  'consent_contact': string
  'consent_register': string
  'consent_read_policy': string
  'consent_cookie_policy': string
  'consent_privacy_policy': string
  'language': string
}

const language_strings: IStrings = require(`./${process.env.LOCALE}`);

export default language_strings as IStrings