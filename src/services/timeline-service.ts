import { Feed } from '../interfaces/feed';
import { Reply } from '../interfaces/reply';
import { UserPreferences } from '../interfaces/user-preferences';
import api from './api';

class TimelineService {
  private preferences: UserPreferences | undefined;

  async getTimeline(cursor: string): Promise<Feed> {
    if (!this.preferences) {
      const userPreferencesResponse = await api.get(
        '/app.bsky.actor.getPreferences'
      );
      this.preferences = userPreferencesResponse.data;
    }

    const foundPrefs = this.preferences?.preferences.find(
      (pref) => pref.$type === 'app.bsky.actor.defs#savedFeedsPrefV2'
    )?.items;

    const feed = foundPrefs?.find((pref) => pref.type === 'feed')?.value;

    console.log('feed', feed);

    const response = await api.get('/app.bsky.feed.getFeed', {
      params: { feed, limit: 30, cursor }
    });

    return response.data as Feed;
  }

  async getThreadParent(parentUri: string): Promise<Reply> {
    const { repo, collection, rkey } = this.parseUri(parentUri);

    const response = await api.get('/com.atproto.repo.getRecord', {
      params: { repo, collection, rkey }
    });

    return response.data as Reply;
  }

  public parseUri(uri: string): {
    repo: string;
    collection: string;
    rkey: string;
  } {
    if (uri.startsWith('at://')) {
      const [_, __, repo, collection, rkey] = uri.split('/');
      return { repo, collection, rkey };
    } else if (uri.startsWith('https://bsky.app/')) {
      let [_, __, ___, repo, collection, rkey] = uri.split('/');
      switch (collection) {
        case 'post':
          collection = 'app.bsky.feed.post';
          break;
        case 'lists':
          collection = 'app.bsky.graph.list';
          break;
        case 'feed':
          collection = 'app.bsky.feed.generator';
          break;
      }
      return { repo, collection, rkey };
    }

    return { repo: '', collection: '', rkey: '' };
  }
}

export default new TimelineService();
