import { useQuery } from '@tanstack/react-query';
import timelineService from '../../services/timeline-service';

export default function useGetThreadParent(parentId: string) {
  return useQuery({
    queryKey: ['threadParent', parentId],
    queryFn: async () => {
      const response = await timelineService.getThreadParent(parentId);
      return response;
    }
  });
}
