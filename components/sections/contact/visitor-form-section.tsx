"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronDown } from "lucide-react"
import { SectionLabel } from "@/components/ui/section-label"
import { renderRichTextToReact } from "@/lib/strapi/utils"

const rules = [
	{
		icon: "/contact-us/icon-rule-18+.png",
		text: "Minimum Age is 18+",
	},
	{
		icon: "/contact-us/icon-pants.png",
		text: "Wear closed-toe shoes, no sandals",
	},
	{
		icon: "/contact-us/icon-shoes.png",
		text: "Wear long pants",
	},
	{
		icon: "/contact-us/icon-flag.png",
		text: "Contact tour guide for company",
	},
]

interface VisitorFormProps {
	data?: any
}

function extractTextFromRichText(richText: any): string {
	if (!richText) return ""
	if (typeof richText === "string") return richText
	if (!Array.isArray(richText)) return ""
	return richText
		.map((block: any) => {
			if (typeof block === "string") return block
			if (block.children && Array.isArray(block.children)) {
				return block.children.map((c: any) => c.text || "").join("")
			}
			return ""
		})
		.filter(Boolean)
		.join("\n\n")
}

export function VisitorFormSection({ data }: VisitorFormProps) {
	const [formData, setFormData] = useState({
		yourName: "",
		institution: "",
		dateOfVisit: "",
		visitTime: "",
		numberOfVisitors: "",
		agreeToRules: false,
	})

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		console.log("Form submitted:", formData)
	}

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value, type } = e.target
		setFormData({
			...formData,
			[name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
		})
	}

	return (
		<section className="py-12 md:py-16 lg:py-24 bg-white">
			<div className="container mx-auto px-0">
				{/* Section Header */}
				<div className="text-center mb-8 md:mb-12">
					<SectionLabel variant="bubble" className="mb-4 md:mb-6 mx-auto">
						{data?.eyebrow ?? "VISITOR FORM"}
					</SectionLabel>
					<h2
						className="font-plus-bold text-indesso-dark-blue text-[28px] md:text-[32px] lg:text-[48px] max-w-5xl mx-auto"
					>
						{data?.title ?? "Discover What Awaits You at the Indesso Visitor Center"}
					</h2>
					<p className="font-manrope-regular text-[14px] md:text-[16px] text-indesso-dark-grey leading-[24px] md:leading-relaxed mt-4 max-w-5xl mx-auto">
						{typeof data?.description === "string"
							? data.description
							: extractTextFromRichText(data?.description) ||
							"The Indesso Visitor Center has officially been opened to the public since August 12, 2019. There is no admission fee, but any visitor should make a preferring booking by filling out the below Visitor Form."}
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-20 max-w-8xl mx-auto">
					{/* Left: Image */}
					<div className="relative w-full aspect-[4/3] md:aspect-auto md:w-[560px] md:h-[736px] rounded-lg overflow-hidden">
						<Image
							src={data?.image?.url ?? "/contact-us/form-human-2.png"}
							alt={data?.title ?? "Visitor Center"}
							fill
							className="object-cover"
						/>
					</div>

					{/* Right: Form */}
					<div className="flex flex-col justify-center">
						<form onSubmit={handleSubmit} className="space-y-8">
							{/* Your Name */}
							<div className="relative">
								<input
									type="text"
									id="visitorName"
									name="yourName"
									value={formData.yourName}
									onChange={handleChange}
									placeholder={data?.field_name?.placeholder ?? "Write Your Name"}
									className="w-full h-12 md:h-14 px-4 rounded border font-manrope-regular text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#00548B] transition-all"
									style={{
										borderColor: "#00548B",
										borderWidth: "0.5px",
										backgroundColor: "#FAFDFF",
										color: "#333333",
									}}
									required
								/>
								<label
									htmlFor="visitorName"
									className="absolute left-3 -top-2 px-2 font-plus-bold uppercase pointer-events-none bg-white"
									style={{
										color: "#00548B",
										fontSize: "12px",
										lineHeight: "16px",
										letterSpacing: "2px",
									}}
								>
									{data?.field_name?.title ?? "YOUR NAME"}
								</label>
							</div>

							{/* Institution */}
							<div className="relative">
								<input
									type="text"
									id="institution"
									name="institution"
									value={formData.institution}
									onChange={handleChange}
									placeholder={data?.field_institution?.placeholder ?? "Write your institution"}
									className="w-full h-12 md:h-14 px-4 rounded border font-manrope-regular text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#00548B] transition-all"
									style={{
										borderColor: "#00548B",
										borderWidth: "0.5px",
										backgroundColor: "#FAFDFF",
										color: "#333333",
									}}
									required
								/>
								<label
									htmlFor="institution"
									className="absolute left-3 -top-2 px-2 font-plus-bold uppercase pointer-events-none bg-white"
									style={{
										color: "#00548B",
										fontSize: "12px",
										lineHeight: "16px",
										letterSpacing: "2px",
									}}
								>
									{data?.field_institution?.title ?? "INSTITUTION"}
								</label>
							</div>

							{/* Date and Time - Grid */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
								{/* Date of Visit */}
								<div className="relative">
									<input
										type="date"
										id="dateOfVisit"
										name="dateOfVisit"
										value={formData.dateOfVisit}
										onChange={handleChange}
										className="w-full h-12 md:h-14 px-4 rounded border font-manrope-regular text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#00548B] transition-all"
										style={{
											borderColor: "#00548B",
											borderWidth: "0.5px",
											backgroundColor: "#FAFDFF",
											color: formData.dateOfVisit ? "#333333" : "#A1A1A1",
										}}
										required
									/>
									<label
										htmlFor="dateOfVisit"
										className="absolute left-3 -top-2 px-2 font-plus-bold uppercase pointer-events-none bg-white"
										style={{
											color: "#00548B",
											fontSize: "12px",
											lineHeight: "16px",
											letterSpacing: "2px",
										}}
									>
										{data?.field_date?.title ?? "DATE OF VISIT"}
									</label>
								</div>

								{/* Visit Time */}
								<div className="relative">
									<input
										type="time"
										id="visitTime"
										name="visitTime"
										value={formData.visitTime}
										onChange={handleChange}
										className="w-full h-12 md:h-14 px-4 rounded border font-manrope-regular text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#00548B] transition-all"
										style={{
											borderColor: "#00548B",
											borderWidth: "0.5px",
											backgroundColor: "#FAFDFF",
											color: formData.visitTime ? "#333333" : "#A1A1A1",
										}}
										required
									/>
									<label
										htmlFor="visitTime"
										className="absolute left-3 -top-2 px-2 font-plus-bold uppercase pointer-events-none bg-white"
										style={{
											color: "#00548B",
											fontSize: "12px",
											lineHeight: "16px",
											letterSpacing: "2px",
										}}
									>
										{data?.field_time?.title ?? "VISIT TIME"}
									</label>
								</div>
							</div>

							{/* Number of Visitors (numeric input) */}
							<div className="relative">
								<input
									type="number"
									id="numberOfVisitors"
									name="numberOfVisitors"
									value={formData.numberOfVisitors}
									onChange={handleChange}
									placeholder={data?.field_visitor?.placeholder ?? "Enter number of visitors"}
									min={1}
									className="w-full h-12 md:h-14 px-4 rounded border font-manrope-regular text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#00548B] transition-all"
									style={{
										borderColor: "#00548B",
										borderWidth: "0.5px",
										backgroundColor: "#FAFDFF",
										color: formData.numberOfVisitors ? "#333333" : "#A1A1A1",
									}}
									required
								/>
								<label
									htmlFor="numberOfVisitors"
									className="absolute left-3 -top-2 px-2 font-plus-bold uppercase pointer-events-none bg-white"
									style={{
										color: "#00548B",
										fontSize: "12px",
										lineHeight: "16px",
										letterSpacing: "2px",
									}}
								>
									{data?.field_visitor?.title ?? "NUMBER OF VISITORS"}
								</label>
							</div>

							{/* Rules Section */}
							<div className="py-4">
								<p
									className="font-plus-bold uppercase mb-4"
									style={{
										color: "#00548B",
										fontSize: "12px",
										lineHeight: "16px",
										letterSpacing: "2px",
									}}
								>
									{data?.rules_title ?? "RULES"}
								</p>
												<div className="flex flex-wrap gap-4">
													{(data?.rules_card || []).length > 0 ? (
														(data.rules_card || []).map((rule: any, index: number) => (
															<div
																key={index}
																className="flex items-center gap-4 w-full md:w-[292px] h-16 md:h-[64px] border border-[#E6E6E6] rounded-md p-4 bg-white shadow-sm"
																style={{ alignItems: "center" }}
															>
																<div className="w-10 h-10 relative flex-shrink-0">
																	<Image src={rule.icon?.url ?? rule.icon ?? "/contact-us/icon-rule-18+.png"} alt="" fill className="object-contain" />
																</div>
																<p className="font-manrope-regular text-sm md:text-base text-[#555555] leading-snug">{rule.rules ?? rule.text}</p>
															</div>
														))
													) : (
														rules.map((rule, index) => (
															<div
																key={index}
																className="flex items-center gap-4 w-full md:w-[292px] h-16 md:h-[64px] border border-[#E6E6E6] rounded-md p-4 bg-white shadow-sm"
															>
																<div className="w-10 h-10 relative flex-shrink-0">
																	<Image src={rule.icon} alt="" fill className="object-contain" />
																</div>
																<p className="font-manrope-regular text-sm md:text-base text-[#555555] leading-snug">{rule.text}</p>
															</div>
														))
													)}
												</div>
							</div>

							{/* Checkbox */}
							<div className="flex items-start gap-3">
								<input
									type="checkbox"
									id="agreeToRules"
									name="agreeToRules"
									checked={formData.agreeToRules}
									onChange={handleChange}
									className="mt-1 w-4 h-4 rounded border-[#00548B] text-[#00548B] focus:ring-[#00548B]"
									required
								/>
												<label htmlFor="agreeToRules" className="font-manrope-regular text-sm text-[#555555]">
													{data?.terms_agreement
														? renderRichTextToReact(data?.terms_agreement)
														: (
															<>
																I have read and agree to all{" "}
																<a href="#" className="text-[#00548B] underline">
																	the rules and policies
																</a>
																.
															</>
														)}
												</label>
							</div>

							{/* Submit Button */}
							<div>
								<button
									type="submit"
									className="w-full md:w-auto px-6 py-4 md:py-[18px] md:px-6 rounded font-plus-bold text-sm md:text-base text-white transition-all hover:opacity-90"
									style={{
										background: "linear-gradient(90deg, #00548B 0%, rgba(0, 84, 139, 0.8) 100%)",
										borderRadius: "2px",
										border: "1px solid #00548B",
									}}
								>
									{data?.button ?? "Submit"}
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</section>
	)
}
