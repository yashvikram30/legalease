
import { SearchFiltersSkeleton, SearchResultsSkeleton } from "@/components/ui/search-results-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <Skeleton className="h-10 w-64 mx-auto mb-4" />
        <Skeleton className="h-6 w-96 mx-auto" />
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="flex gap-2">
          <Skeleton className="flex-1 h-12 rounded-lg" />
          <Skeleton className="h-12 w-12 rounded-lg" />
        </div>
      </div>

      {/* Filters */}
      <div className="mb-8">
        <SearchFiltersSkeleton />
      </div>

      {/* Results */}
      <SearchResultsSkeleton />
    </div>
  );
}
