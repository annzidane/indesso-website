interface GeneralInformationData {
  casNumber: string
  inciName: string
  ecNumber: string
  femaNumber: string
  certification: string
  moq: string
  shelfLife: string
  packagingSize: string
}

interface GeneralInformationSectionProps {
  data: GeneralInformationData
}

export function GeneralInformationSection({ data }: GeneralInformationSectionProps) {
  const tableData = [
    { label: "CAS Number", value: data.casNumber },
    { label: "Certification", value: data.certification },
    { label: "INCI (Name)", value: data.inciName },
    { label: "MoQ", value: data.moq },
    { label: "EC Number", value: data.ecNumber },
    { label: "Shelf Life", value: data.shelfLife },
    { label: "FEMA Number", value: data.femaNumber },
    { label: "Packaging Size", value: data.packagingSize },
  ]

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Card with Gradient Background */}
        <div
          className="rounded-lg overflow-hidden"
          style={{
            background: "linear-gradient(90deg, #00548B 0%, rgba(0, 84, 139, 0.8) 100%)",
          }}
        >
          {/* Header */}
          <div className="p-6 md:p-8 lg:p-10">
            <h2
              className="font-plus-bold text-2xl md:text-3xl lg:text-4xl"
              style={{
                color: "#FEFEFE",
                letterSpacing: "-1px",
                lineHeight: "40px",
              }}
            >
              General Information
            </h2>
          </div>

          {/* Table Grid - 2 columns on desktop, 1 on mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {tableData.map((item, index) => (
              <div
                key={index}
                className="border-t border-white/20 p-6 md:p-8 flex justify-between items-start lg:items-center gap-4"
                style={{
                  borderRight: index % 2 === 0 ? "1px solid rgba(255, 255, 255, 0.2)" : "none",
                }}
              >
                {/* Label */}
                <div className="flex-shrink-0">
                  <span
                    className="font-plus-bold text-sm md:text-base"
                    style={{
                      color: "#FEFEFE",
                      lineHeight: "40px",
                    }}
                  >
                    {item.label}
                  </span>
                </div>

                {/* Value */}
                <div className="text-right">
                  {item.value.includes("\n") ? (
                    <div className="space-y-1">
                      {item.value.split("\n").map((line, i) => (
                        <p
                          key={i}
                          className="font-manrope-regular text-sm md:text-base"
                          style={{
                            color: "#FEFEFE",
                            lineHeight: "40px",
                          }}
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                  ) : (
                    <span
                      className="font-manrope-regular text-sm md:text-base"
                      style={{
                        color: "#FEFEFE",
                        lineHeight: "40px",
                      }}
                    >
                      {item.value}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
