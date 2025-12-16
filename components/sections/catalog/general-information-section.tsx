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
  labels?: any
}

export function GeneralInformationSection({ data, labels }: GeneralInformationSectionProps) {
  const title = labels?.title ?? "General Information"

  const tableData = [
    { label: labels?.cas_label ?? "CAS Number", value: data.casNumber },
    { label: labels?.certification_label ?? "Certification", value: data.certification },
    { label: labels?.inci_label ?? "INCI (Name)", value: data.inciName },
    { label: labels?.moq_label ?? "MoQ", value: data.moq },
    { label: labels?.ec_label ?? "EC Number", value: data.ecNumber },
    { label: labels?.shelf_life_label ?? "Shelf Life", value: data.shelfLife },
    { label: labels?.fema_label ?? "FEMA Number", value: data.femaNumber },
    { label: labels?.packaging_label ?? "Packaging Size", value: data.packagingSize },
  ]

  const lineInset =
    "relative after:content-[''] after:absolute after:h-px after:bg-white/20 after:bottom-0 " +
    "after:left-6 after:right-6 md:after:left-8 md:after:right-8"

  const rows = Math.ceil(tableData.length / 2)
  const leftCount = rows
  const rightCount = Math.floor(tableData.length / 2)

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div
          className="rounded-lg overflow-hidden"
          style={{
            backgroundImage: "url('/general-information-bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Header */}
          <div className="p-6 md:p-8 lg:p-10">
            <h2
              className="font-plus-bold text-2xl md:text-3xl lg:text-4xl"
              style={{ color: "#FEFEFE", letterSpacing: "-1px", lineHeight: "40px" }}
            >
              {title}
            </h2>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1">
            {Array.from({ length: Math.ceil(tableData.length / 2) }).map((_, rowIndex) => {
              const left = tableData[rowIndex * 2]
              const right = tableData[rowIndex * 2 + 1]

              const leftCount = Math.ceil(tableData.length / 2)
              const rightCount = Math.floor(tableData.length / 2)

              const isLastLeftRow = rowIndex === leftCount - 1
              const isLastRightRow = rowIndex === rightCount - 1

              return (
                <div key={rowIndex} className="relative">
                  {/* kasih gap tengah yang lebar seperti desain */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-24">
                    {/* Left cell */}
                    <div
                      className={[
                        "p-6 md:p-8 flex justify-between items-start lg:items-center gap-4",
                        !isLastLeftRow ? lineInset : "",
                      ].join(" ")}
                    >
                      <div className="shrink-0">
                        <span
                          className="font-plus-bold text-sm md:text-base"
                          style={{ color: "#FEFEFE", lineHeight: "40px" }}
                        >
                          {left?.label}
                        </span>
                      </div>

                      <div className="text-right">
                        {typeof left?.value === "string" && left.value.includes("\n") ? (
                          <div className="space-y-1">
                            {left.value.split("\n").map((line: string, i: number) => (
                              <p
                                key={i}
                                className="font-manrope-regular text-sm md:text-base"
                                style={{ color: "#FEFEFE", lineHeight: "40px" }}
                              >
                                {line}
                              </p>
                            ))}
                          </div>
                        ) : (
                          <span
                            className="font-manrope-regular text-sm md:text-base"
                            style={{ color: "#FEFEFE", lineHeight: "40px" }}
                          >
                            {left?.value}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Right cell */}
                    <div
                      className={[
                        "p-6 md:p-8 flex justify-between items-start lg:items-center gap-4",
                        right && !isLastRightRow ? lineInset : "",
                      ].join(" ")}
                    >
                      <div className="shrink-0">
                        <span
                          className="font-plus-bold text-sm md:text-base"
                          style={{ color: "#FEFEFE", lineHeight: "40px" }}
                        >
                          {right?.label}
                        </span>
                      </div>

                      <div className="text-right">
                        {typeof right?.value === "string" && right.value.includes("\n") ? (
                          <div className="space-y-1">
                            {right.value.split("\n").map((line: string, i: number) => (
                              <p
                                key={i}
                                className="font-manrope-regular text-sm md:text-base"
                                style={{ color: "#FEFEFE", lineHeight: "40px" }}
                              >
                                {line}
                              </p>
                            ))}
                          </div>
                        ) : (
                          <span
                            className="font-manrope-regular text-sm md:text-base"
                            style={{ color: "#FEFEFE", lineHeight: "40px" }}
                          >
                            {right?.value}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
