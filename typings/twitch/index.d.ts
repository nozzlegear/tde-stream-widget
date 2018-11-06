export interface OAuthResponse {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    scope: string;
    token_type: "bearer";
}

export interface TwitchUser {
    id: string;
    login: string;
    display_name: string;
    type: string;
    broadcaster_type: "affiliate" | "partner";
    description: string;
    profile_image_url: string;
    offline_image_url: string;
    view_count: number;
}

export interface GetUserResponse {
    data: TwitchUser[];
}
