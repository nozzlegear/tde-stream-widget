export type Service = "twitch" | "mixer";

export type StreamerData =
    | {
          username: string;
          service: Service;
          live: false;
          offlineThumbnail: string;
      }
    | {
          username: string;
          service: Service;
          live: true;
          streamPreviewThumbnail: string;
      };

export interface ErrorResponse {
    ok: false;
    status: number;
    message: string;
}
