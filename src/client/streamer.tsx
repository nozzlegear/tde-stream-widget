import * as React from "react";
import { StreamerData } from "app";
import { compute } from "@nozzlegear/railway";

interface Props extends React.Props<any> {
    streamer: StreamerData;
}

export function Streamer({ streamer }: Props): JSX.Element {
    const preview = compute<JSX.Element>(() => {
        if (streamer.live) {
            return <iframe className="iframe" src={`https://player.twitch.tv/?channel=${streamer.username}`} />;
        }

        return <img src={streamer.offlineThumbnail} />;
    });

    return (
        <a href={`https://twitch.tv/${streamer.username}`} target="_blank">
            <div className="streamer">
                {preview}
                <div className="username">
                    <span>{streamer.username}</span>
                </div>
            </div>
        </a>
    );
}
