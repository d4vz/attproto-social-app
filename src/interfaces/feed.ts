export interface Feed {
  feed: FeedItem[];
  cursor: string;
}

export interface FeedItem {
  post: Post;
  feedContext: string;
}

interface Post {
  uri: string;
  cid: string;
  author: Author;
  record: Record;
  replyCount: number;
  repostCount: number;
  likeCount: number;
  quoteCount: number;
  indexedAt: string;
  viewer: Viewer;
  labels: any[];
  threadgate?: Threadgate;
  embed?: Embed;
}
interface Author {
  did: string;
  handle: string;
  displayName: string;
  avatar: string;
  associated?: Associated;
  viewer: Viewer;
  labels: any[];
  createdAt: string;
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
  following?: string;
  threadMuted?: boolean;
  embeddingDisabled?: boolean;
  replyDisabled?: boolean;
  followedBy?: string;
}
interface Record {
  $type?: string;
  createdAt?: string;
  langs?: string[];
  text?: string;
  facets?: FacetsItem[];
  hiddenReplies?: string[];
  post?: string;
  embed?: Embed;
  cid?: string;
  uri?: string;
  author?: Author;
  value?: Value;
  labels?: any[];
  likeCount?: number;
  replyCount?: number;
  repostCount?: number;
  quoteCount?: number;
  indexedAt?: string;
  embeds?: EmbedsItem[];
}
interface FacetsItem {
  features: FeaturesItem[];
  index: Index;
}
interface FeaturesItem {
  $type: string;
  tag: string;
}
interface Index {
  byteEnd: number;
  byteStart: number;
}
interface Threadgate {
  uri: string;
  cid: string;
  record: Record;
  lists: any[];
}
interface Embed {
  $type: string;
  external?: External;
  images?: ImagesItem[];
  record?: Record;
}
interface External {
  description: string;
  thumb: Thumb | string;
  title: string;
  uri: string;
}
interface Thumb {
  $type: string;
  ref: Ref;
  mimeType: string;
  size: number;
}
interface Ref {
  $link: string;
}
interface ImagesItem {
  alt: string;
  aspectRatio: AspectRatio;
  image?: Image;
  thumb?: string;
  fullsize?: string;
}
interface AspectRatio {
  height: number;
  width: number;
}
interface Image {
  $type: string;
  ref: Ref;
  mimeType: string;
  size: number;
}
interface Value {
  $type: string;
  createdAt: string;
  embed: Embed;
  langs: string[];
  text: string;
}
interface EmbedsItem {
  $type: string;
  images: ImagesItem[];
}
