export interface MediaItem {
  id: string;
  type: "press-release" | "story" | "insight" | "video" | "product-catalog";
  title: string;
  date: string;
  image: string;
  content: string;
  category?: string;
  tags?: string[]; // For insights
  downloadUrl?: string; // For product catalogs
}

const content: string = `
<p>Ut quis vulputate nulla dictum erat accumsan ipsum tortor proin. Pharetra eget eros varius sapien. Dui ultrices tempor ut nullam nibh. Dignissim eget mauris viverra integer. Accumsan amet fringilla elementum tellus sagittis in odio. Neque massa pulvinar phasellus consectetur urna libero tristique blandit turpis. Porta arcu viverra etiam velit morbi urna amet id sit. Porta imperdiet tincidunt at consectetur massa adipiscing quis risus non. Egestas aliquam nulla consectetur nibh neque. Sit purus sagittis ultrices mauris magnis in arcu fusce malesuada. Eget nulla sapien augue vestibulum. Eu arcu eleifend eleifend morbi eget cras. In faucibus nunc odio sed molestie netus pellentesque vulputate erat.</p>

<p>Ut egestas erat facilisi fringilla integer faucibus sodales nulla auctor. Proin nunc mauris in sed adipiscing praesent sit. Ullamcorper pulvinar tincidunt porttitor nullam. In praesent rhoncus enim dui. Velit fringilla eget amet massa. Consectetur ac tincidunt blandit lacus. Neque viverra sagittis et nec sit urna et. Quis sed magna felis odio. Est elit in arcu egestas ipsum natoque arcu. Enim id pulvinar aenean in hac porttitor pretium at. Pellentesque id non amet platea augue et habitasse et neque. In in scelerisque ultricies quam egestas. Sollicitudin pretium convallis ut consequat sed maecenas montes. Cras quis in quam eu proin sed at risus.</p>

<p>Fusce erat urna curabitur orci ornare accumsan vel. Proin neque ac ultricies mollis id mattis egestas elementum facilisis. Quis in at eu auctor sit enim. Aliquam pellentesque morbi sed mi. Tortor egestas purus ante a. Eget integer arcu posuere ut pulvinar felis morbi vel. Aenean fusce odio cursus pretium vulputate. Viverra erat egestas nunc neque sed arcu aenean tellus. Vel amet sed eget non duis blandit accumsan felis. Viverra platea consectetur urna elit eleifend sed praesent amet eget. Amet mi tellus cursus ultricies. Diam consectetur risus ultrices arcu nunc mus ultricies.</p>

<p>Suspendisse lectus at nisi lacus adipiscing augue facilisi egestas. Volutpat tempus faucibus felis enim sit arcu. Mollis magna euismod elementum vitae tristique imperdiet. Risus egestas phasellus proin risus sit neque velit faucibus. Consectetur elit semper orci dignissim at tristique. Amet vivamus suspendisse purus eget in. Quisque amet mollis leo ut duis. Nibh euismod vulputate augue amet. Proin erat sit praesent sit sed placerat libero neque. Et congue aliquet tellus eget cursus mauris molestie.</p>

<p>Ipsum posuere a bibendum ultricies tristique. Elit cras nam porttitor sit eget volutpat tincidunt. Arcu facilisi id mi ut tortor senectus arcu. Tortor eu in commodo at nunc maecenas est. Ac natoque purus ornare lectus ut sem varius. Porttitor pellentesque nunc pretium nunc aliquam diam in quis. Ac adipiscing ullamcorper quis sem amet augue sed.</p>

<p>A malesuada id turpis sit eget pellentesque. Vestibulum integer risus feugiat nisl nisl donec. Mattis sit elit eu sit sed donec eu enim varius. Morbi commodo morbi a in pretium feugiat. Sem enim nulla mauris cursus mi felis mi elit pellentesque. Consectetur nulla egestas ante ultrices. Faucibus sed auctor nunc cursus sed. Ac nunc eget ac habitant fermentum amet. Elit ut eu gravida tincidunt. Volutpat ut euismod nunc lobortis commodo duis tempus fames ornare. Donec sed urna aliquam pellentesque. Pretium.</p>
`;

// Dummy data for Press Release and Stories
export const mediaData: MediaItem[] = [
  {
    id: "1",
    type: "press-release",
    title:
      "Indesso 2025 Sustainability Report Signals New Phase in ESG and Climate Strategy",
    date: "30 January 2025",
    image: "/media/featured-pr.png",
    content: content,
    category: "ESG",
  },
  {
    id: "2",
    type: "press-release",
    title:
      "Indesso 2025 Sustainability Report Signals New Phase in ESG and Climate Strategy",
    date: "30 January 2025",
    image: "/media/press-release-1.png",
    content: content,
    category: "Innovation",
  },
  {
    id: "3",
    type: "press-release",
    title:
      "Indesso 2025 Sustainability Report Signals New Phase in ESG and Climate Strategy",
    date: "30 January 2025",
    image: "/media/press-release-2.png",
    content: content,
    category: "Sustainability",
  },
  {
    id: "4",
    type: "press-release",
    title:
      "Indesso 2025 Sustainability Report Signals New Phase in ESG and Climate Strategy",
    date: "30 January 2025",
    image: "/media/press-release-3.png",
    content: content,
    category: "ESG",
  },
  {
    id: "5",
    type: "press-release",
    title:
      "Indesso 2025 Sustainability Report Signals New Phase in ESG and Climate Strategy",
    date: "30 January 2025",
    image: "/media/press-release-4.png",
    content: content,
    category: "Innovation",
  },
  {
    id: "6",
    type: "press-release",
    title:
      "Indesso 2025 Sustainability Report Signals New Phase in ESG and Climate Strategy",
    date: "30 January 2025",
    image: "/media/press-release-1.png",
    content: content,
    category: "Sustainability",
  },
  {
    id: "7",
    type: "story",
    title:
      "Indesso 2025 Sustainability Report Signals New Phase in ESG and Climate Strategy",
    date: "30 January 2025",
    image: "/media/featured-stories.png",
    content: content,
    category: "Company Story",
  },
  {
    id: "8",
    type: "story",
    title:
      "Indesso 2025 Sustainability Report Signals New Phase in ESG and Climate Strategy",
    date: "30 January 2025",
    image: "/media/stories-1.png",
    content: content,
    category: "People",
  },
  {
    id: "9",
    type: "story",
    title:
      "Indesso 2025 Sustainability Report Signals New Phase in ESG and Climate Strategy",
    date: "30 January 2025",
    image: "/media/stories-2.png",
    content: content,
    category: "Community",
  },
  {
    id: "10",
    type: "story",
    title:
      "Indesso 2025 Sustainability Report Signals New Phase in ESG and Climate Strategy",
    date: "30 January 2025",
    image: "/media/stories-3.png",
    content: content,
    category: "Innovation",
  },
  {
    id: "27",
    type: "press-release",
    title: "Indesso Expands Global Operations with New Manufacturing Facility",
    date: "28 January 2025",
    image: "/media/press-release-1.png",
    content: content,
    category: "Expansion",
  },
  {
    id: "28",
    type: "press-release",
    title: "Partnership Announcement: Indesso and Global Fragrance Leaders",
    date: "25 January 2025",
    image: "/media/press-release-2.png",
    content: content,
    category: "Partnership",
  },
  {
    id: "29",
    type: "press-release",
    title: "Indesso Achieves Carbon Neutral Certification for Main Facility",
    date: "22 January 2025",
    image: "/media/press-release-3.png",
    content: content,
    category: "ESG",
  },
  {
    id: "30",
    type: "press-release",
    title: "Record Revenue Growth: Indesso Q4 2024 Financial Results",
    date: "18 January 2025",
    image: "/media/press-release-4.png",
    content: content,
    category: "Finance",
  },
  {
    id: "31",
    type: "press-release",
    title: "New Natural Ingredients Sourcing Initiative Launched",
    date: "15 January 2025",
    image: "/media/press-release-1.png",
    content: content,
    category: "Sustainability",
  },
  {
    id: "32",
    type: "press-release",
    title: "Indesso Wins Industry Excellence Award for Innovation",
    date: "12 January 2025",
    image: "/media/press-release-2.png",
    content: content,
    category: "Awards",
  },
  {
    id: "33",
    type: "press-release",
    title: "Digital Transformation Initiative: AI and IoT Integration",
    date: "10 January 2025",
    image: "/media/press-release-3.png",
    content: content,
    category: "Technology",
  },
  {
    id: "34",
    type: "press-release",
    title: "Community Investment Program: Education and Skills Development",
    date: "8 January 2025",
    image: "/media/press-release-4.png",
    content: content,
    category: "Community",
  },
  {
    id: "35",
    type: "story",
    title: "Behind the Scenes: A Day in Indesso's Innovation Lab",
    date: "26 January 2025",
    image: "/media/stories-1.png",
    content: content,
    category: "Innovation",
  },
  {
    id: "36",
    type: "story",
    title: "Farmer Spotlight: Supporting Sustainable Agriculture",
    date: "20 January 2025",
    image: "/media/stories-2.png",
    content: content,
    category: "Community",
  },
  {
    id: "37",
    type: "story",
    title: "Employee Stories: Career Growth at Indesso",
    date: "15 January 2025",
    image: "/media/stories-3.png",
    content: content,
    category: "People",
  },
  {
    id: "38",
    type: "story",
    title: "Sustainability Champions: Making a Difference Daily",
    date: "10 January 2025",
    image: "/media/stories-1.png",
    content: content,
    category: "Sustainability",
  },
  {
    id: "39",
    type: "story",
    title: "Innovation Stories: From Concept to Market",
    date: "5 January 2025",
    image: "/media/stories-2.png",
    content: content,
    category: "Innovation",
  },
  {
    id: "11",
    type: "insight",
    title:
      "Indesso 2025 Sustainability Report Signals New Phase in ESG and Climate Strategy",
    date: "30 January 2025",
    image: "/media/insight-featured-big.png",
    content: content,
    category: "ESG",
    tags: ["Bakery", "Snack", "Food Service"],
  },
  {
    id: "12",
    type: "insight",
    title:
      "Indesso 2025 Sustainability Report Signals New Phase in ESG and Climate Strategy",
    date: "30 January 2025",
    image: "/media/insights-old-1.png",
    content: content,
    category: "Innovation",
    tags: ["Bakery", "Snack", "Food Service"],
  },
  {
    id: "13",
    type: "insight",
    title:
      "Indesso 2025 Sustainability Report Signals New Phase in ESG and Climate Strategy",
    date: "30 January 2025",
    image: "/media/insights-old-2.png",
    content: content,
    category: "Sustainability",
    tags: ["Bakery", "Snack", "Food Service"],
  },
  {
    id: "14",
    type: "insight",
    title:
      "Indesso 2025 Sustainability Report Signals New Phase in ESG and Climate Strategy",
    date: "30 January 2025",
    image: "/media/insights-old-3.png",
    content: content,
    category: "Research",
    tags: ["Beverage", "Dairy"],
  },
  {
    id: "15",
    type: "insight",
    title:
      "Indesso 2025 Sustainability Report Signals New Phase in ESG and Climate Strategy",
    date: "30 January 2025",
    image: "/media/insights-old-4.png",
    content: content,
    category: "Innovation",
    tags: ["Essential Oil", "Flavor & Fragrance"],
  },
  {
    id: "16",
    type: "insight",
    title:
      "Indesso 2025 Sustainability Report Signals New Phase in ESG and Climate Strategy",
    date: "30 January 2025",
    image: "/media/insights-old-5.png",
    content: content,
    category: "ESG",
    tags: ["Pharmaceutical", "Skin Care"],
  },
  {
    id: "17",
    type: "insight",
    title:
      "Natural Ingredients Revolution: The Future of Sustainable Aroma Production",
    date: "25 January 2025",
    image: "/media/insight-featured-1.png",
    content: `
      <p>The global shift towards natural ingredients is reshaping the aroma chemicals industry. Indesso leads this transformation with innovative extraction methods and sustainable sourcing practices.</p>

      <p>Our commitment to environmental stewardship drives continuous innovation in natural ingredient processing. Through advanced biotechnology and green chemistry, we're developing next-generation aroma compounds that meet both performance and sustainability criteria.</p>

      <p>Partnerships with local communities ensure fair trade practices while preserving traditional harvesting methods. This approach not only supports biodiversity but also maintains the authentic character of natural ingredients.</p>
    `,
    category: "Innovation",
    tags: ["Perfumery", "Flavor & Fragrance"],
  },
  {
    id: "18",
    type: "insight",
    title:
      "Climate Action Framework: Reducing Carbon Footprint Across Supply Chain",
    date: "20 January 2025",
    image: "/media/insight-featured-2.png",
    content: `
      <p>Indesso announces comprehensive climate action framework targeting 50% reduction in carbon emissions by 2030. This ambitious goal encompasses the entire value chain from raw material sourcing to final product delivery.</p>

      <p>Key initiatives include renewable energy adoption, supply chain optimization, and circular economy principles. Investment in solar power infrastructure at manufacturing facilities represents a significant step toward carbon neutrality.</p>

      <p>Collaboration with suppliers and logistics partners ensures holistic approach to emissions reduction. Technology integration enables real-time monitoring and continuous improvement of environmental performance metrics.</p>
    `,
    category: "ESG",
    tags: ["Bakery", "Snack"],
  },
  {
    id: "19",
    type: "insight",
    title:
      "Biotechnology Breakthrough: Sustainable Production of Rare Aroma Compounds",
    date: "18 January 2025",
    image: "/media/insights-old-1.png",
    content: `
      <p>Revolutionary biotechnology platform enables sustainable production of previously rare aroma compounds. This breakthrough reduces dependency on endangered plant species while maintaining superior quality standards.</p>

      <p>Fermentation technology combined with precision enzymology creates identical molecular structures to natural compounds. Environmental impact decreases dramatically compared to traditional extraction methods.</p>

      <p>Research collaboration with leading universities accelerates development of bio-based alternatives. Commercial-scale implementation demonstrates viability of sustainable biotechnology solutions for the fragrance industry.</p>
    `,
    category: "Research",
    tags: ["Essential Oil", "Pharmaceutical"],
  },
  {
    id: "20",
    type: "insight",
    title: "Circular Economy in Practice: Zero Waste Manufacturing Initiative",
    date: "15 January 2025",
    image: "/media/insights-old-2.png",
    content: `
      <p>Indesso achieves milestone in circular economy implementation with zero waste certification for flagship manufacturing facility. Comprehensive waste valorization programs transform production byproducts into valuable resources.</p>

      <p>Advanced processing technologies recover and repurpose materials previously considered waste. Energy generation from organic residues reduces external power requirements while creating closed-loop systems.</p>

      <p>Industry partnerships facilitate material exchange networks and shared resource optimization. This collaborative approach multiplies environmental benefits beyond individual company operations.</p>
    `,
    category: "Sustainability",
    tags: ["Food Service", "Beverage"],
  },
  {
    id: "21",
    type: "insight",
    title: "Digital Transformation: AI-Powered Quality Control Systems",
    date: "12 January 2025",
    image: "/media/insights-old-3.png",
    content: `
      <p>Artificial intelligence revolutionizes quality control processes across Indesso production facilities. Machine learning algorithms detect subtle variations ensuring consistent product excellence and safety standards.</p>

      <p>Real-time data analytics optimize production parameters while minimizing resource consumption. Predictive maintenance powered by IoT sensors prevents equipment failures and reduces downtime significantly.</p>

      <p>Digital twin technology enables virtual testing and process optimization before physical implementation. This approach accelerates innovation cycles while reducing experimental waste and costs.</p>
    `,
    category: "Technology",
    tags: ["Dairy", "Snack"],
  },
  {
    id: "22",
    type: "insight",
    title: "Community Impact Report: Supporting Local Farmers and Biodiversity",
    date: "10 January 2025",
    image: "/media/insights-old-4.png",
    content: `
      <p>Annual community impact assessment reveals significant positive outcomes for farming communities partnering with Indesso. Fair trade practices and technical training programs improve livelihoods while preserving traditional agricultural knowledge.</p>

      <p>Biodiversity conservation initiatives protect endangered plant species and natural habitats. Agroforestry programs combine commercial crops with ecosystem restoration creating sustainable income sources.</p>

      <p>Educational partnerships empower next generation of sustainable agriculture practitioners. Investment in local infrastructure strengthens community resilience and economic development.</p>
    `,
    category: "Community",
    tags: ["Skin Care", "Perfumery"],
  },
  {
    id: "23",
    type: "insight",
    title: "Water Stewardship Excellence: Reducing Consumption by 40%",
    date: "8 January 2025",
    image: "/media/insights-old-5.png",
    content: `
      <p>Water conservation program achieves 40% reduction in consumption across global operations. Advanced water recycling systems and process optimization contribute to industry-leading efficiency metrics.</p>

      <p>Investment in cutting-edge treatment technologies ensures zero wastewater discharge to natural water bodies. Rainwater harvesting and closed-loop cooling systems maximize resource utilization.</p>

      <p>Watershed protection initiatives extend beyond factory boundaries supporting regional water security. Collaboration with local authorities ensures sustainable water management for entire communities.</p>
    `,
    category: "Environment",
    tags: ["Beverage", "Food Service"],
  },
  {
    id: "24",
    type: "insight",
    title:
      "Supply Chain Transparency: Blockchain Implementation for Traceability",
    date: "5 January 2025",
    image: "/media/insight-featured-big.png",
    content: `
      <p>Blockchain technology implementation provides unprecedented supply chain transparency and traceability. Every ingredient journey from source to final product becomes visible and verifiable for stakeholders.</p>

      <p>Smart contracts automate compliance verification and quality assurance processes. Digital provenance records build consumer trust while facilitating regulatory compliance across multiple markets.</p>

      <p>Industry-wide collaboration on open standards promotes adoption of transparency technologies. Shared platforms reduce implementation costs while maximizing supply chain integrity benefits.</p>
    `,
    category: "Innovation",
    tags: ["Bakery", "Dairy"],
  },
  {
    id: "25",
    type: "insight",
    title: "Renewable Energy Milestone: 75% Solar Powered Operations",
    date: "3 January 2025",
    image: "/media/insights-old-1.png",
    content: `
      <p>Solar energy now powers 75% of Indesso manufacturing operations marking major renewable energy milestone. Extensive photovoltaic installations combined with energy storage systems ensure reliable clean power supply.</p>

      <p>Power purchase agreements for wind energy complement solar capacity addressing seasonal variations. Grid independence increases operational resilience while reducing carbon footprint significantly.</p>

      <p>Employee engagement programs promote energy consciousness throughout organization. Behavioral changes combined with technological solutions accelerate transition to 100% renewable operations.</p>
    `,
    category: "ESG",
    tags: ["Pharmaceutical", "Essential Oil"],
  },
  {
    id: "26",
    type: "insight",
    title: "Next-Generation Packaging: Biodegradable Solutions at Scale",
    date: "1 January 2025",
    image: "/media/insights-old-2.png",
    content: `
      <p>Launch of fully biodegradable packaging solutions represents breakthrough in sustainable product delivery. Plant-based materials decompose completely within 90 days without releasing harmful substances.</p>

      <p>Performance testing confirms packaging maintains product integrity throughout distribution lifecycle. Cost optimization through scale makes sustainable packaging economically viable for mass market applications.</p>

      <p>Collaboration with waste management infrastructure ensures proper end-of-life handling. Consumer education programs facilitate correct disposal supporting circular economy principles.</p>
    `,
    category: "Innovation",
    tags: ["Snack", "Food Service"],
  },
  // Product Catalog items
  {
    id: "pc-1",
    type: "product-catalog",
    title: "Sustainability Report 2024",
    date: "2024",
    image: "/media/media-product-catalog.png",
    content: "",
    downloadUrl: "/downloads/sustainability-report-2024.pdf",
  },
  {
    id: "pc-2",
    type: "product-catalog",
    title: "Sustainability Report 2024",
    date: "2024",
    image: "/media/media-product-catalog.png",
    content: "",
    downloadUrl: "/downloads/sustainability-report-2024.pdf",
  },
  {
    id: "pc-3",
    type: "product-catalog",
    title: "Sustainability Report 2024",
    date: "2024",
    image: "/media/media-product-catalog.png",
    content: "",
    downloadUrl: "/downloads/sustainability-report-2024.pdf",
  },
  {
    id: "pc-4",
    type: "product-catalog",
    title: "Sustainability Report 2024",
    date: "2024",
    image: "/media/media-product-catalog.png",
    content: "",
    downloadUrl: "/downloads/sustainability-report-2024.pdf",
  },
  {
    id: "pc-5",
    type: "product-catalog",
    title: "Sustainability Report 2024",
    date: "2024",
    image: "/media/media-product-catalog.png",
    content: "",
    downloadUrl: "/downloads/sustainability-report-2024.pdf",
  },
  {
    id: "pc-6",
    type: "product-catalog",
    title: "Sustainability Report 2024",
    date: "2024",
    image: "/media/media-product-catalog.png",
    content: "",
    downloadUrl: "/downloads/sustainability-report-2024.pdf",
  },
  {
    id: "pc-7",
    type: "product-catalog",
    title: "Sustainability Report 2024",
    date: "2024",
    image: "/media/media-product-catalog.png",
    content: "",
    downloadUrl: "/downloads/sustainability-report-2024.pdf",
  },
  {
    id: "pc-8",
    type: "product-catalog",
    title: "Sustainability Report 2024",
    date: "2024",
    image: "/media/media-product-catalog.png",
    content: "",
    downloadUrl: "/downloads/sustainability-report-2024.pdf",
  },
  {
    id: "pc-9",
    type: "product-catalog",
    title: "Sustainability Report 2024",
    date: "2024",
    image: "/media/media-product-catalog.png",
    content: "",
    downloadUrl: "/downloads/sustainability-report-2024.pdf",
  },
  {
    id: "pc-10",
    type: "product-catalog",
    title: "Sustainability Report 2024",
    date: "2024",
    image: "/media/media-product-catalog.png",
    content: "",
    downloadUrl: "/downloads/sustainability-report-2024.pdf",
  },
];

// Helper function to get media by type
export function getMediaByType(type: MediaItem["type"]): MediaItem[] {
  return mediaData.filter((item) => item.type === type);
}

// Helper function to get media by ID
export function getMediaById(id: string): MediaItem | undefined {
  return mediaData.find((item) => item.id === id);
}

// Helper function to get related media (same type, different ID)
export function getRelatedMedia(
  id: string,
  type: MediaItem["type"],
  limit: number = 3
): MediaItem[] {
  return mediaData
    .filter((item) => item.type === type && item.id !== id)
    .slice(0, limit);
}
