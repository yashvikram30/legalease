"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Star, Filter, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type LegalHelp = {
  id: string
  name: string
  type: "NGO" | "Lawyer" | "Clinic" | "Government"
  specialization: string[]
  location: string
  state: string
  languages: string[]
  rating: number
  contact: {
    phone?: string
    email?: string
    website?: string
  }
  availability: string
  image?: string
}

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [stateFilter, setStateFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(false)

  // Mock data for legal help providers
  const legalHelpProviders: LegalHelp[] = [
    {
      id: "1",
      name: "Legal Aid Society",
      type: "NGO",
      specialization: ["Human Rights", "Women's Rights", "Criminal Defense"],
      location: "New Delhi",
      state: "Delhi",
      languages: ["Hindi", "English", "Punjabi"],
      rating: 4.8,
      contact: {
        phone: "+91-11-23456789",
        email: "contact@legalaid.org",
        website: "www.legalaid.org",
      },
      availability: "Mon-Fri, 9 AM - 5 PM",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "2",
      name: "Adv. Priya Sharma",
      type: "Lawyer",
      specialization: ["Family Law", "Divorce", "Child Custody"],
      location: "Mumbai",
      state: "Maharashtra",
      languages: ["Hindi", "English", "Marathi"],
      rating: 4.9,
      contact: {
        phone: "+91-22-87654321",
        email: "priya@sharmalegal.com",
      },
      availability: "By appointment",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "3",
      name: "Community Legal Clinic",
      type: "Clinic",
      specialization: ["Property Disputes", "Consumer Rights", "Employment Law"],
      location: "Bangalore",
      state: "Karnataka",
      languages: ["English", "Kannada", "Tamil"],
      rating: 4.5,
      contact: {
        phone: "+91-80-12345678",
        email: "help@communitylegal.org",
        website: "www.communitylegal.org",
      },
      availability: "Mon-Sat, 10 AM - 6 PM",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "4",
      name: "District Legal Services Authority",
      type: "Government",
      specialization: ["Legal Aid", "Lok Adalat", "Victim Compensation"],
      location: "Chennai",
      state: "Tamil Nadu",
      languages: ["Tamil", "English", "Telugu"],
      rating: 4.2,
      contact: {
        phone: "+91-44-23456789",
        email: "dlsa.chennai@gov.in",
        website: "www.tnslsa.gov.in",
      },
      availability: "Mon-Fri, 10 AM - 5 PM",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "5",
      name: "Adv. Rajesh Kumar",
      type: "Lawyer",
      specialization: ["Criminal Law", "Bail Applications", "Appeals"],
      location: "Kolkata",
      state: "West Bengal",
      languages: ["Bengali", "Hindi", "English"],
      rating: 4.7,
      contact: {
        phone: "+91-33-98765432",
        email: "rajesh@kumarlaw.com",
      },
      availability: "By appointment",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "6",
      name: "Women's Rights Initiative",
      type: "NGO",
      specialization: ["Domestic Violence", "Sexual Harassment", "Gender Discrimination"],
      location: "Hyderabad",
      state: "Telangana",
      languages: ["Telugu", "English", "Hindi"],
      rating: 4.6,
      contact: {
        phone: "+91-40-87654321",
        email: "support@wri.org",
        website: "www.wri.org",
      },
      availability: "24/7 Helpline",
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  // Get unique states for filter
  const states = Array.from(new Set(legalHelpProviders.map((provider) => provider.state)))

  // Filter providers based on search and filters
  const filteredProviders = legalHelpProviders.filter((provider) => {
    const matchesSearch =
      searchQuery === "" ||
      provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.specialization.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      provider.location.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesState = stateFilter === "all" || provider.state === stateFilter
    const matchesType = typeFilter === "all" || provider.type === typeFilter

    return matchesSearch && matchesState && matchesType
  })

  // Function to render star rating
  const renderRating = (rating: number) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < fullStars
                ? "text-yellow-400 fill-yellow-400"
                : i === fullStars && hasHalfStar
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-slate-300"
            }`}
          />
        ))}
        <span className="ml-1 text-sm text-slate-600 dark:text-slate-300">{rating.toFixed(1)}</span>
      </div>
    )
  }

  // Handle search and filter changes
  const handleSearch = () => {
    setIsLoading(true)
    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-navy-900 dark:text-white">Find Legal Help</h1>
          <p className="text-slate-600 dark:text-slate-300 mt-2">Connect with legal aid providers, lawyers, and clinics across India</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500 dark:text-slate-400" />
              <Input
                placeholder="Search by name, specialization, or location..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-slate-500 dark:text-slate-400" />
              <Select value={stateFilter} onValueChange={setStateFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All States</SelectItem>
                  {states.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-slate-500 dark:text-slate-400" />
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="NGO">NGOs</SelectItem>
                  <SelectItem value="Lawyer">Lawyers</SelectItem>
                  <SelectItem value="Clinic">Legal Clinics</SelectItem>
                  <SelectItem value="Government">Government</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {isLoading ? (
            // Loading skeletons
            [...Array(3)].map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-16 w-16 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-5 w-40" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-9 w-28" />
                </CardFooter>
              </Card>
            ))
          ) : filteredProviders.length > 0 ? (
            filteredProviders.map((provider, index) => (
              <motion.div
                key={provider.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={provider.image || "/placeholder.svg"} alt={provider.name} />
                        <AvatarFallback>{provider.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-xl">{provider.name}</CardTitle>
                        <CardDescription>
                          <Badge variant="outline" className="mr-1">
                            {provider.type}
                          </Badge>
                          {renderRating(provider.rating)}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-start">
                          <MapPin className="h-4 w-4 text-slate-500 dark:text-slate-400 mt-0.5 mr-2" />
                          <div>
                            <p className="text-sm text-slate-700 dark:text-slate-300">
                              {provider.location}, {provider.state}
                            </p>
                          </div>
                        </div>

                        {provider.contact.phone && (
                          <div className="flex items-start">
                            <Phone className="h-4 w-4 text-slate-500 dark:text-slate-400 mt-0.5 mr-2" />
                            <p className="text-sm text-slate-700 dark:text-slate-300">{provider.contact.phone}</p>
                          </div>
                        )}

                        {provider.contact.email && (
                          <div className="flex items-start">
                            <Mail className="h-4 w-4 text-slate-500 dark:text-slate-400 mt-0.5 mr-2" />
                            <p className="text-sm text-slate-700 dark:text-slate-300">{provider.contact.email}</p>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <div>
                          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Specialization</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {provider.specialization.map((spec, i) => (
                              <Badge key={i} variant="secondary" className="text-xs">
                                {spec}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Languages</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">{provider.languages.join(", ")}</p>
                        </div>

                        <div>
                          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Availability</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">{provider.availability}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-500 dark:text-slate-400">No legal help providers found matching your criteria.</p>
              <p className="text-slate-500 dark:text-slate-400 mt-2">Try adjusting your search or filters.</p>
            </div>
          )}
        </div>

        {/* Additional Information */}
        <div className="mt-12 bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 dark:shadow-2xl dark:shadow-slate-500/20">
          <h2 className="text-xl font-semibold text-navy-900 dark:text-white mb-4">Need Immediate Legal Assistance?</h2>
          <p className="text-slate-700 dark:text-white mb-4">
            If you're facing an emergency legal situation, you can contact the National Legal Services Authority (NALSA)
            helpline at <span className="font-medium">1516</span> for free legal aid and advice.
          </p>
          <p className="text-slate-700 dark:text-white">
            For women in distress, the Women Helpline number is <span className="font-medium">1091</span> or{" "}
            <span className="font-medium">181</span>.
          </p>
        </div>
      </div>
    </div>
  )
}
