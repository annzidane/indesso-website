"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface RequestSampleSectionProps {
  productName: string
}

export function RequestSampleSection({ productName }: RequestSampleSectionProps) {
  const [formData, setFormData] = useState({
    yourName: "",
    companyName: "",
    email: "",
    inquiryTopic: "",
    yourNotes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Sample request submitted:", { ...formData, product: productName })
    // Handle form submission
  }

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden">
              <Image
                src="/scientist-in-laboratory-working.jpg"
                alt="Laboratory scientist"
                fill
                className="object-cover"
              />
            </div>

            {/* Form */}
            <div>
              <p className="text-xs font-bold text-[#004080] uppercase mb-2 tracking-wide">CONTACT US</p>
              <h2 className="text-3xl font-bold text-[#1a3353] mb-8">Request a Sample</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Your Name</label>
                    <Input
                      placeholder="First and Last name"
                      value={formData.yourName}
                      onChange={(e) => setFormData({ ...formData, yourName: e.target.value })}
                      className="border-gray-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Email</label>
                    <Input
                      type="email"
                      placeholder="Your email address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="border-gray-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Company Name</label>
                  <Input
                    placeholder="Your company name"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="border-gray-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Inquiry Topics</label>
                  <Select
                    value={formData.inquiryTopic}
                    onValueChange={(value) => setFormData({ ...formData, inquiryTopic: value })}
                  >
                    <SelectTrigger className="border-gray-300">
                      <SelectValue placeholder="Choose your inquiry topics" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sample">Sample Request</SelectItem>
                      <SelectItem value="pricing">Pricing Inquiry</SelectItem>
                      <SelectItem value="technical">Technical Information</SelectItem>
                      <SelectItem value="partnership">Partnership Opportunity</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Your Notes</label>
                  <Textarea
                    placeholder="Tell us more about your needs..."
                    value={formData.yourNotes}
                    onChange={(e) => setFormData({ ...formData, yourNotes: e.target.value })}
                    rows={4}
                    className="border-gray-300 resize-none"
                  />
                </div>

                <Button type="submit" className="bg-[#004080] hover:bg-[#003366] text-white px-8">
                  Submit
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
