"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Filter, Search, SortAsc, SortDesc } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CaseTimeline } from "@/components/case-timeline"

type Case = {
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

export default function DashboardPage() {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCase, setSelectedCase] = useState<Case | null>(null)

  // Mock data for cases
  const cases: Case[] = [
    {
      id: "1",
      caseNumber: "CWP-1234/2023",
      court: "Delhi High Court",
      type: "Civil Writ Petition",
      stage: "Hearing",
      status: "Active",
      progress: 40,
      lastUpdated: "2023-11-15",
      nextHearing: "2023-12-10",
    },
    {
      id: "2",
      caseNumber: "CRL-5678/2023",
      court: "District Court, Mumbai",
      type: "Criminal Appeal",
      stage: "Evidence",
      status: "Delayed",
      progress: 30,
      lastUpdated: "2023-10-20",
      nextHearing: "2023-12-15",
    },
    {
      id: "3",
      caseNumber: "CS-9101/2022",
      court: "Civil Court, Bangalore",
      type: "Civil Suit",
      stage: "Arguments",
      status: "Active",
      progress: 70,
      lastUpdated: "2023-11-05",
      nextHearing: "2023-11-25",
    },
    {
      id: "4",
      caseNumber: "ARB-1122/2023",
      court: "Arbitration Tribunal",
      type: "Arbitration",
      stage: "Filed",
      status: "Pending",
      progress: 10,
      lastUpdated: "2023-11-10",
    },
    {
      id: "5",
      caseNumber: "FAM-3344/2022",
      court: "Family Court, Chennai",
      type: "Divorce Petition",
      stage: "Judgment",
      status: "Active",
      progress: 90,
      lastUpdated: "2023-11-18",
    },
    {
      id: "6",
      caseNumber: "TAX-5566/2021",
      court: "Income Tax Appellate Tribunal",
      type: "Tax Appeal",
      stage: "Closed",
      status: "Completed",
      progress: 100,
      lastUpdated: "2023-09-30",
    },
  ]

  // Filter and sort cases
  const filteredCases = cases
    .filter(
      (c) =>
        (filterStatus === "all" || c.status === filterStatus) &&
        (searchQuery === "" ||
          c.caseNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.court.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.type.toLowerCase().includes(searchQuery.toLowerCase())),
    )
    .sort((a, b) => {
      const dateA = new Date(a.lastUpdated).getTime()
      const dateB = new Date(b.lastUpdated).getTime()
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA
    })

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-500"
      case "Pending":
        return "bg-yellow-500"
      case "Delayed":
        return "bg-red-500"
      case "Completed":
        return "bg-blue-500"
      default:
        return "bg-slate-500"
    }
  }

  // Get stage color
  const getStageColor = (stage: string) => {
    switch (stage) {
      case "Filed":
        return "bg-purple-100 text-purple-800"
      case "Hearing":
        return "bg-blue-100 text-blue-800"
      case "Evidence":
        return "bg-yellow-100 text-yellow-800"
      case "Arguments":
        return "bg-orange-100 text-orange-800"
      case "Judgment":
        return "bg-green-100 text-green-800"
      case "Closed":
        return "bg-slate-100 text-slate-800"
      default:
        return "bg-slate-100 text-slate-800"
    }
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-navy-900">Case Tracker Dashboard</h1>
            <p className="text-slate-600">Track and manage your legal cases</p>
          </div>

          <Button className="bg-teal-600 hover:bg-teal-700">+ Add New Case</Button>
        </div>

        {/* Filters and Search */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
            <Input
              placeholder="Search cases..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-slate-500" />
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Delayed">Delayed</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            {sortOrder === "asc" ? (
              <SortAsc className="h-4 w-4 text-slate-500" />
            ) : (
              <SortDesc className="h-4 w-4 text-slate-500" />
            )}
            <Select value={sortOrder} onValueChange={(value) => setSortOrder(value as "asc" | "desc")}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="desc">Newest First</SelectItem>
                <SelectItem value="asc">Oldest First</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Case Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCases.length > 0 ? (
            filteredCases.map((caseItem, index) => (
              <motion.div
                key={caseItem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card
                  className="h-full cursor-pointer transition-all hover:shadow-md"
                  onClick={() => setSelectedCase(caseItem)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{caseItem.caseNumber}</CardTitle>
                        <p className="text-sm text-slate-600">{caseItem.court}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStageColor(caseItem.stage)}`}>
                        {caseItem.stage}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">{caseItem.type}</span>
                        <span className="flex items-center">
                          <span
                            className={`inline-block w-2 h-2 rounded-full mr-1.5 ${getStatusColor(caseItem.status)}`}
                          />
                          {caseItem.status}
                        </span>
                      </div>

                      {/* Progress bar */}
                      <div className="w-full bg-slate-100 rounded-full h-2.5">
                        <div className={`bg-teal-600 h-2.5 rounded-full`} style={{ width: `${caseItem.progress}%` }} />
                      </div>

                      {/* Next hearing date if available */}
                      {caseItem.nextHearing && (
                        <div className="flex items-center text-xs text-slate-600">
                          <Calendar className="h-3 w-3 mr-1" />
                          Next hearing: {caseItem.nextHearing}
                        </div>
                      )}

                      <div className="text-xs text-slate-500">Last updated: {caseItem.lastUpdated}</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-slate-500">No cases found matching your filters.</p>
            </div>
          )}
        </div>

        {/* Case Timeline View */}
        {selectedCase && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Case Timeline: {selectedCase.caseNumber}</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedCase(null)}>
                    Close
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="timeline">
                  <TabsList className="mb-4">
                    <TabsTrigger value="timeline">Timeline</TabsTrigger>
                    <TabsTrigger value="details">Case Details</TabsTrigger>
                    <TabsTrigger value="documents">Documents</TabsTrigger>
                  </TabsList>

                  <TabsContent value="timeline">
                    <CaseTimeline caseData={selectedCase} />
                  </TabsContent>

                  <TabsContent value="details">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h3 className="text-sm font-medium text-slate-500">Case Number</h3>
                          <p>{selectedCase.caseNumber}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-slate-500">Court</h3>
                          <p>{selectedCase.court}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-slate-500">Case Type</h3>
                          <p>{selectedCase.type}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-slate-500">Status</h3>
                          <p>{selectedCase.status}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-slate-500">Current Stage</h3>
                          <p>{selectedCase.stage}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-slate-500">Last Updated</h3>
                          <p>{selectedCase.lastUpdated}</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="documents">
                    <div className="text-center py-8">
                      <p className="text-slate-500">No documents available for this case.</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}
