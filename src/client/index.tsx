import * as React from "react";
import { render } from "react-dom";
import { Streamer } from "./streamer";
import { FAKE_DATA, offlineThumbnail } from "../shared/fake-data";
import { TwitchUser, GetUserResponse } from "twitch";
import { StreamerData } from "app";

// import stylus file
require("./index.styl");

export interface Props extends React.Props<any> {}

export interface State {
    loading: boolean;
    streamers: StreamerData[];
}

export class App extends React.Component<Props, State> {
    state: State = {
        loading: true,
        streamers: []
    };

    async componentDidMount() {
        const result = await fetch("http://localhost:3000/oauth/tde-streamer-widget");
        const body: GetUserResponse = await result.json();

        this.setState({
            loading: false,
            streamers: body.data.map<StreamerData>(u => ({
                live: false,
                offlineThumbnail: u.offline_image_url || offlineThumbnail,
                service: "twitch",
                username: u.login
            }))
        });
    }

    render() {
        if (this.state.loading) {
            return (
                <>
                    <h1>Loading</h1>
                    <progress />
                </>
            );
        }

        return (
            <div id="stream-list">
                {this.state.streamers.map((streamer, index) => (
                    <div key={index}>
                        <Streamer streamer={streamer} />
                    </div>
                ))}
            </div>
        );
    }
}

(async function() {
    const contenthost = document.getElementById("contenthost");

    if (!contenthost) {
        console.warn("Element #contenthost was not found.");

        return;
    }

    render(<App />, contenthost);
})();
