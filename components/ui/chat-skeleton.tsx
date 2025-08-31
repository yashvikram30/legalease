import { Skeleton } from "@/components/ui/skeleton";

export function ChatbotSkeleton() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-between bg-background">
      {/* Top message skeleton just below navbar */}
      <div className="w-full flex justify-center mt-8">
        <div className="rounded-2xl bg-muted px-6 py-5 flex flex-col items-start w-fit max-w-xl">
          <Skeleton className="h-6 w-96 mb-2" />
          <Skeleton className="h-4 w-64" />
        </div>
      </div>
      {/* Lower section */}
      <div className="w-full flex flex-col items-center pb-4">
        <div className="w-full max-w-3xl mx-auto">
          {/* Prompt toggle & location input */}
          <div className="flex items-center justify-between mb-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-10 w-80" />
          </div>
          {/* Prompt buttons */}
          <div className="grid grid-cols-2 md:grid-cols-2 gap-2 mb-2">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
          {/* Model select */}
          <div className="mb-2">
            <Skeleton className="h-10 w-full" />
          </div>
          {/* Input and send button */}
          <div className="flex gap-2">
            <Skeleton className="flex-1 h-12" />
            <Skeleton className="h-12 w-12 rounded-md" />
          </div>
          {/* Disclaimer */}
          <div className="mt-2 flex justify-center">
            <Skeleton className="h-4 w-96" />
          </div>
        </div>
      </div>
    </div>
  );
}
