export default interface TimelineResponse {
  feed: FeedItem[];
  cursor: string;
}

export interface FeedItem {
  post: Post;
  reason?: Reason;
  reply?: Reply;
}

interface Post {
  uri: string;
  cid: string;
  author: Author;
  record: RecordType;
  embed?: Embed;
  replyCount: number;
  repostCount: number;
  likeCount: number;
  quoteCount: number;
  indexedAt: string;
  viewer: Viewer;
  labels: any[];
}

interface Author {
  did: string;
  handle: string;
  displayName: string;
  avatar: string;
  associated?: Associated;
  viewer: Viewer;
  labels: LabelsItem[];
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
  followedBy?: string;
}

interface RecordType {
  $type?: string;
  createdAt?: string;
  embed?: Embed;
  facets?: FacetsItem[];
  langs?: string[];
  text?: string;
  record?: RecordType;
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
  reply?: Reply;
}

interface Embed {
  $type: string;
  external?: External;
  media?: Media;
  record?: RecordType;
  images?: ImagesItem[];
}

interface External {
  description: string;
  thumb?: Thumb | string;
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

interface FacetsItem {
  features: FeaturesItem[];
  index: Index;
  $type?: string;
}

interface FeaturesItem {
  $type: string;
  tag?: string;
  uri?: string;
  did?: string;
}

interface Index {
  byteEnd: number;
  byteStart: number;
}

interface Media {
  $type: string;
  images: ImagesItem[];
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
  embed?: Embed;
  langs?: string[];
  text: string;
  facets?: FacetsItem[];
  reply?: Reply;
}
interface EmbedsItem {
  $type: string;
  record?: RecordType;
  images?: ImagesItem[];
  media?: Media;
  external?: External;
}
interface Reason {
  $type: string;
  by: By;
  indexedAt: string;
}
interface By {
  did: string;
  handle: string;
  displayName: string;
  avatar: string;
  associated: Associated;
  viewer: Viewer;
  labels: any[];
  createdAt: string;
}
interface Reply {
  parent: Parent;
  root: Root;
  grandparentAuthor?: GrandparentAuthor;
}
interface Parent {
  cid: string;
  uri: string;
}
interface Root {
  cid: string;
  uri: string;
}

interface GrandparentAuthor {
  did: string;
  handle: string;
  displayName: string;
  avatar: string;
  associated: Associated;
  viewer: Viewer;
  labels: any[];
  createdAt: string;
}
interface LabelsItem {
  src: string;
  uri: string;
  cid: string;
  val: string;
  cts: string;
}
