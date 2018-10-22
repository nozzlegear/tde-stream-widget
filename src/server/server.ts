import { Server as OvernightServer } from "@overnightjs/core";
import express = require("express");
import { OAuthController } from "./controllers/oauth";
import { envVarRequired, envVar } from "./env";
import * as path from "path";

export class Server extends OvernightServer {
    constructor() {
        super();

        const clientId = envVarRequired("TDE_STREAMER_WIDGET_CLIENT_ID");
        const secretKey = envVarRequired("TDE_STREAMER_WIDGET_CLIENT_SECRET");

        this.app_.use("/dist", express.static(path.join(__dirname, "../../dist")));
        this.app_.use("/", express.static(path.join(__dirname, "../client")));

        super.addControllers_([new OAuthController(clientId, secretKey)]);
    }

    start(port: number) {
        this.app_.listen(port, "0.0.0.0", () => {
            console.log("App is listening on 0.0.0.0:3000");
        });
    }
}
