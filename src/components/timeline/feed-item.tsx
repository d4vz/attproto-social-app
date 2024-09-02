import { Avatar, ListItem, ListItemTitle, Text, View } from 'tamagui';
import { FeedItem as FeedItemType } from '../../interfaces/feed';

interface FeedItemProps {
  author?: FeedItemType['post']['author'];
  text: FeedItemType['post']['record']['text'];
  embed?: FeedItemType['post']['embed'];
  isEmbedded?: boolean;
}

export const FeedItem: React.FC<FeedItemProps> = ({
  author,
  text,
  embed,
  isEmbedded
}) => {
  // app.bsky.embed.record#view
  const hasReply =
    !!embed?.record &&
    embed?.record?.$type === 'app.bsky.embed.record#viewRecord';

  if (hasReply) {
    console.log(embed?.record);
  }

  return (
    <>
      <ListItem
        borderTopWidth={hasReply ? '1px' : '0'}
        borderTopColor={hasReply ? '$accentColor' : 'transparent'}
        borderBottomColor={isEmbedded ? '$accentColor' : 'transparent'}
        borderBottomWidth={isEmbedded ? '1px' : '0'}
        hoverTheme
        pressTheme
        icon={
          <Avatar circular size="$3">
            <Avatar.Image src={author?.avatar} />
          </Avatar>
        }
        title={
          <ListItemTitle>
            <View
              display="flex"
              gap="$2"
              flexDirection="row"
              alignItems="center"
            >
              <Text fontWeight="bold">{author?.displayName}</Text>
              <Text color="$accentColor" fontSize="$1" opacity={0.6}>
                @{author?.handle}
              </Text>
            </View>
          </ListItemTitle>
        }
        subTitle={text}
      />
      {hasReply && (
        <FeedItem
          author={embed?.record?.author}
          text={embed?.record?.value?.text}
          isEmbedded
        />
      )}
    </>
  );
};
