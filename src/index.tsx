import * as React from "react";
import { render } from "react-dom";
import { StreamerData } from "app";
import { Streamer } from "./streamer";

// import stylust file
require("./index.styl");

const offlineThumbnail = "https://placekitten.com/g/400/100";

const fakeData: StreamerData[] = [
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

(async function() {
    const contenthost = document.getElementById("contenthost");

    if (!contenthost) {
        console.warn("Element #contenthost was not found.");

        return;
    }

    const streamers = fakeData.sort(i => (i.live ? -1 : 1));

    const app = (
        <div id="stream-list">
            {streamers.map((streamer, index) => (
                <div key={index}>
                    <Streamer streamer={streamer} />
                </div>
            ))}
        </div>
    );

    render(app, contenthost);
})();
