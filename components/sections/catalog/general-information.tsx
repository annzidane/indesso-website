import type { Product, ProductDetailSectionData } from "@/types/strapi"

interface Specification {
  label: string
  value: string
}

interface GeneralInformationProps {
  info: Product["general_information"]
  labels: ProductDetailSectionData["general_information_label"]
}

export function GeneralInformation({ info, labels }: GeneralInformationProps) {
  const specs: Specification[] = [
    { label: labels?.cas_label, value: info?.cas_number || "-" },
    { label: labels?.certification_label, value: "Halal Kosher" }, // This seems static
    { label: labels?.inci_label, value: info?.inci_name || "-" },
    { label: labels?.moq_label, value: info?.moq || "20 Kg" }, // Assuming Hlg2 is MOQ
    { label: labels?.ec_label, value: info?.ec_number || "-" },
    { label: labels?.shelf_life_label, value: info?.shelf_life || "24 MONTH" },
    {
      label: labels?.fema_label,
      value: info?.fema_number || "-",
    },
    {
      label: labels?.packaging_label,
      value: "20 Kg (HDPE Jerrycan) 180 Kg (Hybrid Drum)", // This seems static
    },
  ]

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-[#004080] to-[#0066B3] rounded-lg p-8 text-white">
            <h2 className="text-2xl font-bold mb-6">{labels?.title}</h2>

            <div className="grid md:grid-cols-2 gap-x-16 gap-y-4">
              {specs.map((spec, index) => (
                <div
                  key={index}
                  className="flex justify-between items-start py-3 border-b border-white/20"
                >
                  <span className="font-semibold text-sm">{spec.label}</span>
                  <span className="text-right text-sm max-w-[60%]">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
