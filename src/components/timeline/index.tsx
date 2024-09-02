import { useQueryClient } from '@tanstack/react-query';
import { FlatList, ListRenderItem } from 'react-native';
import { Spinner, Text, View } from 'tamagui';
import useInfiniteTimeline from '../../hooks/queries/use-infinite-timeline';
import { FeedItem as FeedItemType } from '../../interfaces/feed';
import { FeedItem } from './feed-item';

const renderItem: ListRenderItem<FeedItemType> = ({ item }) => (
  <FeedItem
    author={item.post.author}
    text={item.post.record.text}
    embed={item.post.embed}
  />
);

export const Timeline: React.FC = () => {
  const {
    data,
    fetchNextPage,
    isFetching,
    refetch,
    isFetchingNextPage,
    error
  } = useInfiniteTimeline();

  const queryClient = useQueryClient();

  if (error) {
    return (
      <View p="$4" justifyContent="center">
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <FlatList
      refreshing={isFetching}
      onRefresh={() =>
        queryClient.invalidateQueries({
          queryKey: ['timeline']
        })
      }
      onEndReached={() => fetchNextPage()}
      onEndReachedThreshold={0.3}
      data={data?.pages.map((page) => page.feed).flat()}
      renderItem={renderItem}
      ListFooterComponent={() =>
        isFetchingNextPage && (
          <View p="$4" justifyContent="center">
            <Spinner size="small" />
          </View>
        )
      }
    />
  );
};
