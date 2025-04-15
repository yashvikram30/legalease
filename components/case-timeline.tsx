import { CheckCircle2, Clock, FileText } from "lucide-react"

type CaseData = {
  id: string
  caseNumber: string
  court: string
  type: string
  stage: "Filed" | "Hearing" | "Evidence" | "Arguments" | "Judgment" | "Closed"
  status: "Active" | "Pending" | "Delayed" | "Completed"
  progress: number
  lastUpdated: string
  nextHearing?: string
}

type TimelineEvent = {
  date: string
  title: string
  description: string
  status: "completed" | "current" | "upcoming"
}

export function CaseTimeline({ caseData }: { caseData: CaseData }) {
  // Generate mock timeline events based on case stage
  const generateTimelineEvents = (caseData: CaseData): TimelineEvent[] => {
    const events: TimelineEvent[] = [
      {
        date: "2022-09-15",
        title: "Case Filed",
        description: "Initial petition filed with the court",
        status: "completed",
      },
      {
        date: "2022-10-20",
        title: "First Hearing",
        description: "Preliminary hearing conducted",
        status: "completed",
      },
    ]

    // Add events based on case stage
    if (caseData.stage === "Filed") {
      events.push({
        date: caseData.nextHearing || "Pending",
        title: "Upcoming Hearing",
        description: "Waiting for court to schedule first hearing",
        status: "upcoming",
      })
    } else if (caseData.stage === "Hearing" || caseData.stage === "Evidence") {
      events.push({
        date: "2023-01-10",
        title: "Evidence Submission",
        description: "Parties submitted documentary evidence",
        status: "completed",
      })
      events.push({
        date: caseData.nextHearing || "2023-12-10",
        title: "Next Hearing",
        description: "Examination of witnesses scheduled",
        status: "current",
      })
    } else if (caseData.stage === "Arguments") {
      events.push({
        date: "2023-01-10",
        title: "Evidence Submission",
        description: "Parties submitted documentary evidence",
        status: "completed",
      })
      events.push({
        date: "2023-05-22",
        title: "Witness Examination",
        description: "Examination of witnesses completed",
        status: "completed",
      })
      events.push({
        date: caseData.nextHearing || "2023-11-25",
        title: "Final Arguments",
        description: "Final arguments to be presented",
        status: "current",
      })
    } else if (caseData.stage === "Judgment") {
      events.push({
        date: "2023-01-10",
        title: "Evidence Submission",
        description: "Parties submitted documentary evidence",
        status: "completed",
      })
      events.push({
        date: "2023-05-22",
        title: "Witness Examination",
        description: "Examination of witnesses completed",
        status: "completed",
      })
      events.push({
        date: "2023-09-15",
        title: "Arguments Concluded",
        description: "Final arguments presented by both parties",
        status: "completed",
      })
      events.push({
        date: caseData.nextHearing || "2023-12-20",
        title: "Judgment Reserved",
        description: "Court has reserved judgment",
        status: "current",
      })
    } else if (caseData.stage === "Closed") {
      events.push({
        date: "2023-01-10",
        title: "Evidence Submission",
        description: "Parties submitted documentary evidence",
        status: "completed",
      })
      events.push({
        date: "2023-05-22",
        title: "Witness Examination",
        description: "Examination of witnesses completed",
        status: "completed",
      })
      events.push({
        date: "2023-07-15",
        title: "Arguments Concluded",
        description: "Final arguments presented by both parties",
        status: "completed",
      })
      events.push({
        date: "2023-09-30",
        title: "Judgment Delivered",
        description: "Final judgment delivered by the court",
        status: "completed",
      })
    }

    return events
  }

  const timelineEvents = generateTimelineEvents(caseData)

  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-slate-200" />

      <div className="space-y-8">
        {timelineEvents.map((event, index) => (
          <div key={index} className="relative flex items-start gap-4">
            <div className="absolute left-7 top-7 bottom-0 w-0.5 bg-slate-200" />

            <div className="flex flex-col items-center">
              <div className="w-14 text-xs text-slate-500 text-center">
                {event.date !== "Pending"
                  ? new Date(event.date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                    })
                  : "Pending"}
              </div>
              <div
                className={`mt-1 flex h-7 w-7 items-center justify-center rounded-full border ${
                  event.status === "completed"
                    ? "bg-green-100 border-green-500"
                    : event.status === "current"
                      ? "bg-blue-100 border-blue-500"
                      : "bg-slate-100 border-slate-300"
                }`}
              >
                {event.status === "completed" ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : event.status === "current" ? (
                  <Clock className="h-5 w-5 text-blue-500" />
                ) : (
                  <FileText className="h-5 w-5 text-slate-400" />
                )}
              </div>
            </div>

            <div
              className={`flex-1 rounded-lg border p-4 ${
                event.status === "completed"
                  ? "bg-green-50 border-green-100"
                  : event.status === "current"
                    ? "bg-blue-50 border-blue-100"
                    : "bg-slate-50 border-slate-100"
              }`}
            >
              <h3
                className={`font-medium ${
                  event.status === "completed"
                    ? "text-green-800"
                    : event.status === "current"
                      ? "text-blue-800"
                      : "text-slate-800"
                }`}
              >
                {event.title}
              </h3>
              <p className="text-sm text-slate-600 mt-1">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
