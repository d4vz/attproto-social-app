import { useInfiniteQuery } from '@tanstack/react-query';
import timelineService from '../../services/timeline-service';

export default function useInfiniteTimeline() {
  return useInfiniteQuery({
    initialPageParam: '',
    queryKey: ['timeline'],
    queryFn: async ({ pageParam }) => {
      return timelineService.getTimeline(pageParam);
    },
    getNextPageParam: (lastPage) => lastPage.cursor
  });
}
