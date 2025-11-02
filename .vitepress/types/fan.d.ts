export interface Right {
    allow_review: number
    allow_preview: number
    is_selection: number
    selection_style: number
    demand_end_time: unknown
    is_rcmd: number
}

export interface Stat {
    follow: number
    view: number
    danmaku: number
    reply: number
    coin: number
    series_follow: number
    series_view: number
    likes: number
    favorite: number
}

export interface New_ep {
    id: number
    index_show: string
    cover: string
    title: string
    long_title: string
    pub_time: string
    duration: number
}

export interface Rating {
    score: number
    count: number
}

export interface Area {
    id: number
    name: string
}

export interface Sery {
    series_id: number
    title: string
    season_count: number
    new_season_id: number
    series_ord: number
}

export interface Publish {
    pub_time: string
    pub_time_show: string
    release_date: string
    release_date_show: string
}

export interface Section {
    section_id: number
    season_id: number
    limit_group: number
    watch_platform: number
    copyright: string
    ban_area_show: number
    episode_ids: number[]
}

export interface Multi_img {
    color: string
    medium_remind: string
}

export interface Badge_info {
    text: string
    bg_color: string
    bg_color_night: string
    img: string
    multi_img: Multi_img
}

export interface First_ep_info {
    id: number
    cover: string
    title: string
    long_title: string
    pub_time: string
    duration: number
}

export interface Vip_or_pay {
    text: string
    bg_color: string
    bg_color_night: string
    img: string
    multi_img: Multi_img
}

export interface Badge_infos {
    vip_or_pay: Vip_or_pay
}

export interface Producer {
    mid: number
    type: number
    is_contribute: number
    title: string
}

export interface List {
    season_id: number
    media_id: number
    season_type: number
    season_type_name: string
    title: string
    cover: string
    total_count: number
    is_finish: number
    is_started: number
    is_play: number
    badge: string
    badge_type: number
    rights: Right
    stat: Stat
    new_ep: New_ep
    rating: Rating
    square_cover: string
    season_status: number
    season_title: string
    badge_ep: string
    media_attr: number
    season_attr: number
    evaluate: string
    areas: Area[]
    subtitle: string
    first_ep: number
    can_watch: number
    series: Sery
    publish: Publish
    mode: number
    section: Section[]
    url: string
    badge_info: Badge_info
    renewal_time: string
    first_ep_info: First_ep_info
    formal_ep_count: number
    short_url: string
    badge_infos: Badge_infos
    season_version: string
    viewable_crowd_type: number
    producers: Producer[]
    summary: string
    styles: string[]
    follow_status: number
    is_new: number
    progress: string
    both_follow: boolean
}

export interface Data {
    list: List[]
    pn: number
    ps: number
    total: number
}

export interface RootObject {
    code: number
    message: string
    ttl: number
    data: Data
}
