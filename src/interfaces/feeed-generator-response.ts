export interface FeedGeneratorResponse {
  feeds: FeedsItem[];
}

interface FeedsItem {
  uri: string;
  cid: string;
  did: string;
  creator: Creator;
  displayName: string;
  description: string;
  avatar: string;
  likeCount: number;
  labels: any[];
  viewer: Viewer;
  indexedAt: string;
}
interface Creator {
  did: string;
  handle: string;
  displayName: string;
  avatar: string;
  associated: Associated;
  viewer: Viewer;
  labels: any[];
  createdAt: string;
  description: string;
  indexedAt: string;
}
interface Associated {
  chat: Chat;
}
interface Chat {
  allowIncoming: string;
}
interface Viewer {
  muted?: boolean;
  blockedBy?: boolean;
}
