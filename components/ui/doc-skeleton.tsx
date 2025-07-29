import { Skeleton, SkeletonText } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function DocumentSimplifierSkeleton() {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <Skeleton className="h-9 w-80 mx-auto" />
        <Skeleton className="h-6 w-96 mx-auto" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Processing Status */}
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-36" />
          </CardHeader>
          <CardContent className="space-y-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex items-center gap-3">
                <Skeleton className="h-6 w-6 rounded-full" />
                <div className="space-y-1 flex-1">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="border-2 border-dashed rounded-lg p-8 text-center space-y-4">
          <Skeleton className="h-16 w-16 mx-auto rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-48 mx-auto" />
            <Skeleton className="h-4 w-64 mx-auto" />
          </div>
          <Skeleton className="h-10 w-32 mx-auto rounded-md" />
        </div>
      </div>
      <Card>
        <CardHeader className="flex items-center justify-between">
          <Skeleton className="h-4 w-32" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2 flex flex-col items-center">
            <Skeleton className="h-2 w-full rounded-full" />
            <Skeleton className="h-6 w-48" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function DocumentUploadSkeleton() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="border-2 border-dashed rounded-lg p-8 text-center space-y-4">
          <Skeleton className="h-16 w-16 mx-auto rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-48 mx-auto" />
            <Skeleton className="h-4 w-64 mx-auto" />
          </div>
          <Skeleton className="h-10 w-32 mx-auto rounded-md" />
        </div>
      </CardContent>
    </Card>
  );
}
