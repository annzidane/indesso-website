"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getStrapiMedia } from "@/lib/strapi/client"

export function ContactUsSection({ data }: { data: any }) {
  const imageUrl = getStrapiMedia(data?.image?.url)
  console.log("ContactUsSection data:", data)
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-xs md:text-sm font-semibold tracking-widest text-[#0066CC] uppercase">
            {data?.eyebrow}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#003366] mt-4">{data?.title}</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Image */}
          <div className="relative aspect-4/3">
            <Image
              src={imageUrl || "/scientist-in-laboratory-working.jpg"}
              alt={data?.title || "Contact Indesso"}
              fill
              className="object-cover rounded-lg"
            />
          </div>

          {/* Right: Form */}
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {data?.field_company_name?.title}
                </label>
                <Input placeholder={data?.field_company_name?.placeholder} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {data?.field_email?.title}
                </label>
                <Input type="email" placeholder={data?.field_email?.placeholder} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {data?.field_topic?.title}
              </label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder={data?.field_topic?.placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {(Array.isArray(data?.field_topic?.option) ? data.field_topic.option : []).map(
                    (option: any) => (
                      <SelectItem
                        key={option.id ?? option.value ?? option.size}
                        value={option.size ?? option.value ?? option.id}
                      >
                        {option.size ?? option.label ?? option.value}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {data?.field_note?.title}
              </label>
              <Textarea
                placeholder={data?.field_note?.placeholder}
                rows={6}
                className="resize-none"
              />
            </div>

            <Button className="w-full md:w-auto bg-[#0066CC] hover:bg-[#0052A3] text-white px-8">
              {data?.button}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
