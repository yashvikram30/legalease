import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function RightsVisualizerSkeleton() {
  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Skeleton className="h-12 w-96 mx-auto mb-2" />
          <Skeleton className="h-6 w-96 mx-auto" />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton
              key={index}
              className={`h-12 w-48 rounded-xl ${
                index === 0 ? "bg-white border-2 border-muted-foreground" : ""
              }`}
            />
          ))}
        </div>

        {/* Main Card (Accordion Skeleton) */}
        <Card className="rounded-2xl border mx-auto">
          <CardHeader className="pb-0">
            <Skeleton className="h-8 w-56 mb-2" />
            <Skeleton className="h-5 w-80" />
          </CardHeader>
          <CardContent className="pt-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="border-b last:border-b-0 py-6 flex items-center justify-between"
              >
                <Skeleton className="h-6 w-2/3" />
                <Skeleton className="h-6 w-6 rounded-full" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
