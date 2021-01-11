import { ICreated, IVotable } from './listing';

export interface IPost extends IVotable, ICreated {
  approved_at_utc?: Date
  subreddit: string
  selftext: string
  author_fullname: string
  saved: boolean
  mod_reason_title?: string
  gilded: number
  clicked: boolean
  title: string
  link_flair_richtext: string[]
  subreddit_name_prefixed: string
  hidde: boolean
  pwls: number
  link_flair_css_class?: string
  hide_score: boolean
  name: string
  quarantine: boolean
  link_flair_text_color: 'light' | 'dark'
  author_flair_background_color?: string
  subreddit_type: string
  total_awards_received: number
  media_embed: IMedia
  author_flair_template_id?: string
  is_original_content: boolean
  user_reports: any[] // TODO: Type
  secure_media?: any // TODO: Type
  is_reddit_media_domain: boolean
  is_meta: boolean
  category?: string
  secure_media_embed: any // TODO: Type
  link_flair_text?: string
  can_mod_post: boolean
  score: number
  approved_by?: string
  author_premium: boolean
  thumbnail: string
  edited: boolean
  author_flair_css_class?: string
  autor_flair_richtext: string[]
  gildings: any // TODO: Type
  content_categories?: any // TODO: Type
  is_self: false
  mod_note?: string
  link_flair_type: string
  wls: number
  removed_by_category?: string
  banned_by?: string
  author_flair_type: string
  domain: string
  allow_live_comments: boolean
  selftext_html?: string
  suggested_sort?: string
  banned_at_utc?: number
  view_count?: number
  archived: boolean
  no_foolow: boolean
  is_crosspostable: boolean
  pinned: boolean
  over_18: boolean
  all_awardings: any[] // TODO: Type
  awarders: string[]
  media_only: boolean
  can_gild: boolean
  spoiler: boolean
  locked: boolean
  author_flair_text?: string
  treatment_tags: string[]
  visited: boolean
  removed_by?: string
  num_reports?: number
  distinguished?: boolean
  subreddit_id: string
  mod_reason_by?: string
  removal_reason?: string
  link_flair_background_color: string
  id: string
  is_robot_indexable: boolean
  report_reasons?: any[] // TODO: Type
  author: string
  discussion_type?: string
  num_comments: number
  send_replies: boolean
  whitelist_status: string
  contest_mode: boolean
  mod_reports: any[] // TODO: Type
  author_patreon_flair: boolean
  author_flair_text_color?: string
  permalink: string
  parent_whitelist_status: string
  stickied: boolean
  url: string
  subreddit_subscriber: number
  num_crossposts: number
  media?: any // TODO: Type
  is_video: boolean
}

export interface IMedia {
  content: string
  width: number
  height: number
  scrolling: boolean
}

export interface IAbout extends ICreated {
  user_flair_background_color?: string
  submit_text_html?: string
  restrict_posting: boolean
  user_is_banned?: boolean
  free_form_reports: boolean
  wiki_enabled: boolean
  user_is_muted?: boolean
  user_can_flair_in_sr?: boolean
  display_name: string
  header_img?: string
  title: string
  allow_galleries: boolean
  icon_size?: number[]
  primary_color: string
  active_user_count: number
  icon_img: string
  display_name_prefixed: string
  accounts_active: number
  public_traffic: boolean
  subscribers: number
  user_flair_richtext: any // TODO: Type
  videostream_links_count: number
  name: string
  quarantine: boolean
  hide_ads: boolean
  prediction_leaderbord_entry_type: string
  emojis_enabled: boolean
  advertiser_category: string
  public_description: string
  comment_score_hide_mins: number
  allow_predictions: boolean
  user_has_favorited?: boolean
  user_flair_template_id?: boolean
  community_icon: string
  banner_background_image: string
  original_content_tag_enabled: boolean
  submit_text: string
  description_html: string
  spoilers_enabled: boolean
  header_title?: string
  header_size?: number[]
  user_flair_position: string
  all_original_content: boolean
  has_menu_widget: boolean
  is_enrolled_in_new_modmail?: boolean
  key_color: string
  can_assign_user_flair: boolean
  wls: number
  show_media_preview: boolean
  submission_type: string
  user_is_subscriber?: boolean
  disable_contributor_requests: boolean
  allow_videogifs: boolean
  user_flair_type: string
  allow_polls: boolean
  collapse_deleted_comments: boolean
  emojis_custom_size?: number[]
  public_description_html?: string
  allow_videos: boolean
  is_crosspostable_subreddit: boolean
  notification_level?: any // TODO: Type
  can_assign_link_flair: boolean
  accounts_active_is_fuzzed: boolean
  submit_text_label?: string
  link_flair_position: string
  user_sr_flair_enabled?: boolean
  user_flair_enabled_in_sr: boolean
  allow_chat_post_creation: boolean
  allow_discovery: boolean
  user_sr_theme_enabled: boolean
  link_flair_enabled: boolean
  subreddit_type: string
  suggested_comment_sort?: any // TODO: Type
  banner_img: string
  user_flair_text?: string
  banner_background_color: string
  show_media: boolean
  id: string
  user_is_moderator?: boolean
  over18: boolean
  description: string
  is_chat_post_feature_enabled: boolean
  submit_link_label?: boolean
  user_flair_text_color?: string
  restrict_commenting: boolean
  user_flair_css_class?: string
  allow_images: boolean
  lang: string
  whitelist_status: string
  url: string
  banner_size?: number[]
  mobile_banner_image: string
  user_is_contributor?: boolean
}
