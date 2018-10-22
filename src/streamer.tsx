import * as React from "react";
import { StreamerData } from "app";
import { compute } from "@nozzlegear/railway";

interface Props extends React.Props<any> {
    streamer: StreamerData;
}

export function Streamer({ streamer }: Props): JSX.Element {
    const preview = compute<JSX.Element>(() => {
        if (streamer.live) {
            return <iframe src={`https://player.twitch.tv/?channel=${streamer.username}`} />;
        }

        return <img src={streamer.offlineThumbnail} />;
    });

    return (
        <div>
            {streamer.live ? <h1>{`OMG ${streamer.username} IS LIVE!`}</h1> : null}
            {preview}
            <h3 className="username">{streamer.username}</h3>
        </div>
    );
}
