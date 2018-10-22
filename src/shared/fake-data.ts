import { StreamerData } from "app";

export const offlineThumbnail = "https://placekitten.com/g/400/100";

export const FAKE_DATA: StreamerData[] = [
    {
        service: "twitch",
        username: "ripcanti",
        live: false,
        offlineThumbnail: offlineThumbnail
    },
    {
        service: "twitch",
        username: "bobross",
        live: true,
        streamPreviewThumbnail: "https://static-cdn.jtvnw.net/previews-ttv/live_user_bobross-400x200.jpg"
    },
    {
        service: "twitch",
        username: "calyso",
        live: false,
        offlineThumbnail: offlineThumbnail
    },
    {
        service: "twitch",
        username: "menotyou9",
        live: false,
        offlineThumbnail: offlineThumbnail
    },
    {
        service: "twitch",
        username: "tj_slick",
        live: false,
        offlineThumbnail: offlineThumbnail
    },
    {
        service: "twitch",
        username: "gil_tde",
        live: false,
        offlineThumbnail: offlineThumbnail
    },
    {
        service: "twitch",
        username: "nozzlegear",
        live: false,
        offlineThumbnail: offlineThumbnail
    }
];
