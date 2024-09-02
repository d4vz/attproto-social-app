import { Text, View } from 'tamagui';
import useGetThreadParent from '../../hooks/queries/use=get-thread-parent';

interface ReplyProps {
  parentUri?: string;
}

export const Reply: React.FC<ReplyProps> = ({ parentUri }) => {
  const { data, isLoading } = useGetThreadParent(parentUri!);

  if (isLoading) {
    return (
      <View
        backgroundColor="$gray3Dark"
        height="$4"
        my="$4"
        ml="$8"
        borderRadius="$2"
      />
    );
  }

  return (
    <View ml="$8" my="$4" backgroundColor="$gray3Dark" p="$2" borderRadius="$2">
      <Text>{data?.value?.text}</Text>
    </View>
  );
};
