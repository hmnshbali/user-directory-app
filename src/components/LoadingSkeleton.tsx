import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const UserCardSkeleton = () => {
  return (
    <Card className="p-6 text-center bg-gradient-card shadow-card border-0">
      <div className="flex flex-col items-center space-y-4">
        <Skeleton className="h-20 w-20 rounded-full bg-muted animate-pulse" />
        <div className="space-y-2 w-full">
          <Skeleton className="h-6 w-32 mx-auto bg-muted animate-pulse" />
          <Skeleton className="h-4 w-40 mx-auto bg-muted animate-pulse" />
        </div>
        <Skeleton className="h-8 w-24 bg-muted animate-pulse" />
      </div>
    </Card>
  );
};

export const LoadingGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }, (_, i) => (
        <UserCardSkeleton key={i} />
      ))}
    </div>
  );
};