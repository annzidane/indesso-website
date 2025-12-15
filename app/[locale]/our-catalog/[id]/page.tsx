import type { Locale } from "@/lib/i18n/config";
import { getFooterData, getHeaderData } from "@/lib/strapi/api";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ProductHeroSection } from "@/components/sections/catalog/product-hero-section";
import { GeneralInformationSection } from "@/components/sections/catalog/general-information-section";
import { CompatibilitySection } from "@/components/sections/catalog/compatibility-section";
import { RequestSampleSection } from "@/components/sections/catalog/request-sample-section";
import { RelatedProductsSection } from "@/components/sections/catalog/related-products-section";
import { notFound } from "next/navigation";

interface ProductDetailPageProps {
  params: Promise<{ locale: Locale; id: string }>;
}

// Static product data - replace with API call when ready
const getProductData = (id: string) => {
  const products = {
    "1": {
      id: "1",
      category: "Aroma Chemicals",
      title: "Alpha-Caryophyllene 55%",
      botanicalOrigin: "Clove",
      organoleptic:
        "Woody, spicy, clove, oceanic watery, slightly green, resinous, balsamic soft, mineral fresh, metallic airy, subtle herbal, light earthy",
      productFormat: "Liquid",
      image: "/our-catalog/our-catalog-detail-featured.png",
      generalInfo: {
        casNumber: "6753-98-6",
        inciName: "-",
        ecNumber: "229-816-7",
        femaNumber: "-",
        certification: "Halal\nKosher",
        moq: "20 Kg",
        shelfLife: "24 Months",
        packagingSize: "20 kg (HDPE Jerrycan)\n180 kg (Metal Drum)",
      },
      applications: [
        {
          title: "Flavor & Fragrance",
          icon: "/our-catalog/icon-fregrance.png",
        },
        {
          title: "Agriculture",
          icon: "/our-catalog/icon-agriculture.png",
        },
        {
          title: "Food & Beverages",
          icon: "/our-catalog/icon-fnb.png",
        },
        {
          title: "Aquaculture",
          icon: "/our-catalog/icon-aquaculture.png",
        },
        {
          title: "Personal Care",
          icon: "/our-catalog/icon-personal-care.png",
        },
        {
          title: "Polymer",
          icon: "/our-catalog/icon-polymer.png",
        },
        {
          title: "Pharmacy",
          icon: "/our-catalog/icon-pharmacy.png",
        },
      ],
    },
    "2": {
      id: "1",
      category: "Aroma Chemicals",
      title: "Alpha-Caryophyllene 55%",
      botanicalOrigin: "Clove",
      organoleptic:
        "Woody, spicy, clove, oceanic watery, slightly green, resinous, balsamic soft, mineral fresh, metallic airy, subtle herbal, light earthy",
      productFormat: "Liquid",
      image: "/our-catalog/our-catalog-detail-featured.png",
      generalInfo: {
        casNumber: "6753-98-6",
        inciName: "-",
        ecNumber: "229-816-7",
        femaNumber: "-",
        certification: "Halal\nKosher",
        moq: "20 Kg",
        shelfLife: "24 Months",
        packagingSize: "20 kg (HDPE Jerrycan)\n180 kg (Metal Drum)",
      },
      applications: [
        {
          title: "Flavor & Fragrance",
          icon: "/our-catalog/icon-fregrance.png",
        },
        {
          title: "Agriculture",
          icon: "/our-catalog/icon-agriculture.png",
        },
        {
          title: "Food & Beverages",
          icon: "/our-catalog/icon-fnb.png",
        },
        {
          title: "Aquaculture",
          icon: "/our-catalog/icon-aquaculture.png",
        },
        {
          title: "Personal Care",
          icon: "/our-catalog/icon-personal-care.png",
        },
        {
          title: "Polymer",
          icon: "/our-catalog/icon-polymer.png",
        },
        {
          title: "Pharmacy",
          icon: "/our-catalog/icon-pharmacy.png",
        },
      ],
    },
    "3": {
      id: "1",
      category: "Aroma Chemicals",
      title: "Alpha-Caryophyllene 55%",
      botanicalOrigin: "Clove",
      organoleptic:
        "Woody, spicy, clove, oceanic watery, slightly green, resinous, balsamic soft, mineral fresh, metallic airy, subtle herbal, light earthy",
      productFormat: "Liquid",
      image: "/our-catalog/our-catalog-detail-featured.png",
      generalInfo: {
        casNumber: "6753-98-6",
        inciName: "-",
        ecNumber: "229-816-7",
        femaNumber: "-",
        certification: "Halal\nKosher",
        moq: "20 Kg",
        shelfLife: "24 Months",
        packagingSize: "20 kg (HDPE Jerrycan)\n180 kg (Metal Drum)",
      },
      applications: [
        {
          title: "Flavor & Fragrance",
          icon: "/our-catalog/icon-fregrance.png",
        },
        {
          title: "Agriculture",
          icon: "/our-catalog/icon-agriculture.png",
        },
        {
          title: "Food & Beverages",
          icon: "/our-catalog/icon-fnb.png",
        },
        {
          title: "Aquaculture",
          icon: "/our-catalog/icon-aquaculture.png",
        },
        {
          title: "Personal Care",
          icon: "/our-catalog/icon-personal-care.png",
        },
        {
          title: "Polymer",
          icon: "/our-catalog/icon-polymer.png",
        },
        {
          title: "Pharmacy",
          icon: "/our-catalog/icon-pharmacy.png",
        },
      ],
    },
    "4": {
      id: "1",
      category: "Aroma Chemicals",
      title: "Alpha-Caryophyllene 55%",
      botanicalOrigin: "Clove",
      organoleptic:
        "Woody, spicy, clove, oceanic watery, slightly green, resinous, balsamic soft, mineral fresh, metallic airy, subtle herbal, light earthy",
      productFormat: "Liquid",
      image: "/our-catalog/our-catalog-detail-featured.png",
      generalInfo: {
        casNumber: "6753-98-6",
        inciName: "-",
        ecNumber: "229-816-7",
        femaNumber: "-",
        certification: "Halal\nKosher",
        moq: "20 Kg",
        shelfLife: "24 Months",
        packagingSize: "20 kg (HDPE Jerrycan)\n180 kg (Metal Drum)",
      },
      applications: [
        {
          title: "Flavor & Fragrance",
          icon: "/our-catalog/icon-fregrance.png",
        },
        {
          title: "Agriculture",
          icon: "/our-catalog/icon-agriculture.png",
        },
        {
          title: "Food & Beverages",
          icon: "/our-catalog/icon-fnb.png",
        },
        {
          title: "Aquaculture",
          icon: "/our-catalog/icon-aquaculture.png",
        },
        {
          title: "Personal Care",
          icon: "/our-catalog/icon-personal-care.png",
        },
        {
          title: "Polymer",
          icon: "/our-catalog/icon-polymer.png",
        },
        {
          title: "Pharmacy",
          icon: "/our-catalog/icon-pharmacy.png",
        },
      ],
    },
    "5": {
      id: "1",
      category: "Aroma Chemicals",
      title: "Alpha-Caryophyllene 55%",
      botanicalOrigin: "Clove",
      organoleptic:
        "Woody, spicy, clove, oceanic watery, slightly green, resinous, balsamic soft, mineral fresh, metallic airy, subtle herbal, light earthy",
      productFormat: "Liquid",
      image: "/our-catalog/our-catalog-detail-featured.png",
      generalInfo: {
        casNumber: "6753-98-6",
        inciName: "-",
        ecNumber: "229-816-7",
        femaNumber: "-",
        certification: "Halal\nKosher",
        moq: "20 Kg",
        shelfLife: "24 Months",
        packagingSize: "20 kg (HDPE Jerrycan)\n180 kg (Metal Drum)",
      },
      applications: [
        {
          title: "Flavor & Fragrance",
          icon: "/our-catalog/icon-fregrance.png",
        },
        {
          title: "Agriculture",
          icon: "/our-catalog/icon-agriculture.png",
        },
        {
          title: "Food & Beverages",
          icon: "/our-catalog/icon-fnb.png",
        },
        {
          title: "Aquaculture",
          icon: "/our-catalog/icon-aquaculture.png",
        },
        {
          title: "Personal Care",
          icon: "/our-catalog/icon-personal-care.png",
        },
        {
          title: "Polymer",
          icon: "/our-catalog/icon-polymer.png",
        },
        {
          title: "Pharmacy",
          icon: "/our-catalog/icon-pharmacy.png",
        },
      ],
    },
    "6": {
      id: "1",
      category: "Aroma Chemicals",
      title: "Alpha-Caryophyllene 55%",
      botanicalOrigin: "Clove",
      organoleptic:
        "Woody, spicy, clove, oceanic watery, slightly green, resinous, balsamic soft, mineral fresh, metallic airy, subtle herbal, light earthy",
      productFormat: "Liquid",
      image: "/our-catalog/our-catalog-detail-featured.png",
      generalInfo: {
        casNumber: "6753-98-6",
        inciName: "-",
        ecNumber: "229-816-7",
        femaNumber: "-",
        certification: "Halal\nKosher",
        moq: "20 Kg",
        shelfLife: "24 Months",
        packagingSize: "20 kg (HDPE Jerrycan)\n180 kg (Metal Drum)",
      },
      applications: [
        {
          title: "Flavor & Fragrance",
          icon: "/our-catalog/icon-fregrance.png",
        },
        {
          title: "Agriculture",
          icon: "/our-catalog/icon-agriculture.png",
        },
        {
          title: "Food & Beverages",
          icon: "/our-catalog/icon-fnb.png",
        },
        {
          title: "Aquaculture",
          icon: "/our-catalog/icon-aquaculture.png",
        },
        {
          title: "Personal Care",
          icon: "/our-catalog/icon-personal-care.png",
        },
        {
          title: "Polymer",
          icon: "/our-catalog/icon-polymer.png",
        },
        {
          title: "Pharmacy",
          icon: "/our-catalog/icon-pharmacy.png",
        },
      ],
    },
    "7": {
      id: "1",
      category: "Aroma Chemicals",
      title: "Alpha-Caryophyllene 55%",
      botanicalOrigin: "Clove",
      organoleptic:
        "Woody, spicy, clove, oceanic watery, slightly green, resinous, balsamic soft, mineral fresh, metallic airy, subtle herbal, light earthy",
      productFormat: "Liquid",
      image: "/our-catalog/our-catalog-detail-featured.png",
      generalInfo: {
        casNumber: "6753-98-6",
        inciName: "-",
        ecNumber: "229-816-7",
        femaNumber: "-",
        certification: "Halal\nKosher",
        moq: "20 Kg",
        shelfLife: "24 Months",
        packagingSize: "20 kg (HDPE Jerrycan)\n180 kg (Metal Drum)",
      },
      applications: [
        {
          title: "Flavor & Fragrance",
          icon: "/our-catalog/icon-fregrance.png",
        },
        {
          title: "Agriculture",
          icon: "/our-catalog/icon-agriculture.png",
        },
        {
          title: "Food & Beverages",
          icon: "/our-catalog/icon-fnb.png",
        },
        {
          title: "Aquaculture",
          icon: "/our-catalog/icon-aquaculture.png",
        },
        {
          title: "Personal Care",
          icon: "/our-catalog/icon-personal-care.png",
        },
        {
          title: "Polymer",
          icon: "/our-catalog/icon-polymer.png",
        },
        {
          title: "Pharmacy",
          icon: "/our-catalog/icon-pharmacy.png",
        },
      ],
    },
    "8": {
      id: "1",
      category: "Aroma Chemicals",
      title: "Alpha-Caryophyllene 55%",
      botanicalOrigin: "Clove",
      organoleptic:
        "Woody, spicy, clove, oceanic watery, slightly green, resinous, balsamic soft, mineral fresh, metallic airy, subtle herbal, light earthy",
      productFormat: "Liquid",
      image: "/our-catalog/our-catalog-detail-featured.png",
      generalInfo: {
        casNumber: "6753-98-6",
        inciName: "-",
        ecNumber: "229-816-7",
        femaNumber: "-",
        certification: "Halal\nKosher",
        moq: "20 Kg",
        shelfLife: "24 Months",
        packagingSize: "20 kg (HDPE Jerrycan)\n180 kg (Metal Drum)",
      },
      applications: [
        {
          title: "Flavor & Fragrance",
          icon: "/our-catalog/icon-fregrance.png",
        },
        {
          title: "Agriculture",
          icon: "/our-catalog/icon-agriculture.png",
        },
        {
          title: "Food & Beverages",
          icon: "/our-catalog/icon-fnb.png",
        },
        {
          title: "Aquaculture",
          icon: "/our-catalog/icon-aquaculture.png",
        },
        {
          title: "Personal Care",
          icon: "/our-catalog/icon-personal-care.png",
        },
        {
          title: "Polymer",
          icon: "/our-catalog/icon-polymer.png",
        },
        {
          title: "Pharmacy",
          icon: "/our-catalog/icon-pharmacy.png",
        },
      ],
    },
    "9": {
      id: "1",
      category: "Aroma Chemicals",
      title: "Alpha-Caryophyllene 55%",
      botanicalOrigin: "Clove",
      organoleptic:
        "Woody, spicy, clove, oceanic watery, slightly green, resinous, balsamic soft, mineral fresh, metallic airy, subtle herbal, light earthy",
      productFormat: "Liquid",
      image: "/our-catalog/our-catalog-detail-featured.png",
      generalInfo: {
        casNumber: "6753-98-6",
        inciName: "-",
        ecNumber: "229-816-7",
        femaNumber: "-",
        certification: "Halal\nKosher",
        moq: "20 Kg",
        shelfLife: "24 Months",
        packagingSize: "20 kg (HDPE Jerrycan)\n180 kg (Metal Drum)",
      },
      applications: [
        {
          title: "Flavor & Fragrance",
          icon: "/our-catalog/icon-fregrance.png",
        },
        {
          title: "Agriculture",
          icon: "/our-catalog/icon-agriculture.png",
        },
        {
          title: "Food & Beverages",
          icon: "/our-catalog/icon-fnb.png",
        },
        {
          title: "Aquaculture",
          icon: "/our-catalog/icon-aquaculture.png",
        },
        {
          title: "Personal Care",
          icon: "/our-catalog/icon-personal-care.png",
        },
        {
          title: "Polymer",
          icon: "/our-catalog/icon-polymer.png",
        },
        {
          title: "Pharmacy",
          icon: "/our-catalog/icon-pharmacy.png",
        },
      ],
    },
    "10": {
      id: "1",
      category: "Aroma Chemicals",
      title: "Alpha-Caryophyllene 55%",
      botanicalOrigin: "Clove",
      organoleptic:
        "Woody, spicy, clove, oceanic watery, slightly green, resinous, balsamic soft, mineral fresh, metallic airy, subtle herbal, light earthy",
      productFormat: "Liquid",
      image: "/our-catalog/our-catalog-detail-featured.png",
      generalInfo: {
        casNumber: "6753-98-6",
        inciName: "-",
        ecNumber: "229-816-7",
        femaNumber: "-",
        certification: "Halal\nKosher",
        moq: "20 Kg",
        shelfLife: "24 Months",
        packagingSize: "20 kg (HDPE Jerrycan)\n180 kg (Metal Drum)",
      },
      applications: [
        {
          title: "Flavor & Fragrance",
          icon: "/our-catalog/icon-fregrance.png",
        },
        {
          title: "Agriculture",
          icon: "/our-catalog/icon-agriculture.png",
        },
        {
          title: "Food & Beverages",
          icon: "/our-catalog/icon-fnb.png",
        },
        {
          title: "Aquaculture",
          icon: "/our-catalog/icon-aquaculture.png",
        },
        {
          title: "Personal Care",
          icon: "/our-catalog/icon-personal-care.png",
        },
        {
          title: "Polymer",
          icon: "/our-catalog/icon-polymer.png",
        },
        {
          title: "Pharmacy",
          icon: "/our-catalog/icon-pharmacy.png",
        },
      ],
    },
    "11": {
      id: "1",
      category: "Aroma Chemicals",
      title: "Alpha-Caryophyllene 55%",
      botanicalOrigin: "Clove",
      organoleptic:
        "Woody, spicy, clove, oceanic watery, slightly green, resinous, balsamic soft, mineral fresh, metallic airy, subtle herbal, light earthy",
      productFormat: "Liquid",
      image: "/our-catalog/our-catalog-detail-featured.png",
      generalInfo: {
        casNumber: "6753-98-6",
        inciName: "-",
        ecNumber: "229-816-7",
        femaNumber: "-",
        certification: "Halal\nKosher",
        moq: "20 Kg",
        shelfLife: "24 Months",
        packagingSize: "20 kg (HDPE Jerrycan)\n180 kg (Metal Drum)",
      },
      applications: [
        {
          title: "Flavor & Fragrance",
          icon: "/our-catalog/icon-fregrance.png",
        },
        {
          title: "Agriculture",
          icon: "/our-catalog/icon-agriculture.png",
        },
        {
          title: "Food & Beverages",
          icon: "/our-catalog/icon-fnb.png",
        },
        {
          title: "Aquaculture",
          icon: "/our-catalog/icon-aquaculture.png",
        },
        {
          title: "Personal Care",
          icon: "/our-catalog/icon-personal-care.png",
        },
        {
          title: "Polymer",
          icon: "/our-catalog/icon-polymer.png",
        },
        {
          title: "Pharmacy",
          icon: "/our-catalog/icon-pharmacy.png",
        },
      ],
    },
    "12": {
      id: "1",
      category: "Aroma Chemicals",
      title: "Alpha-Caryophyllene 55%",
      botanicalOrigin: "Clove",
      organoleptic:
        "Woody, spicy, clove, oceanic watery, slightly green, resinous, balsamic soft, mineral fresh, metallic airy, subtle herbal, light earthy",
      productFormat: "Liquid",
      image: "/our-catalog/our-catalog-detail-featured.png",
      generalInfo: {
        casNumber: "6753-98-6",
        inciName: "-",
        ecNumber: "229-816-7",
        femaNumber: "-",
        certification: "Halal\nKosher",
        moq: "20 Kg",
        shelfLife: "24 Months",
        packagingSize: "20 kg (HDPE Jerrycan)\n180 kg (Metal Drum)",
      },
      applications: [
        {
          title: "Flavor & Fragrance",
          icon: "/our-catalog/icon-fregrance.png",
        },
        {
          title: "Agriculture",
          icon: "/our-catalog/icon-agriculture.png",
        },
        {
          title: "Food & Beverages",
          icon: "/our-catalog/icon-fnb.png",
        },
        {
          title: "Aquaculture",
          icon: "/our-catalog/icon-aquaculture.png",
        },
        {
          title: "Personal Care",
          icon: "/our-catalog/icon-personal-care.png",
        },
        {
          title: "Polymer",
          icon: "/our-catalog/icon-polymer.png",
        },
        {
          title: "Pharmacy",
          icon: "/our-catalog/icon-pharmacy.png",
        },
      ],
    },
    "13": {
      id: "1",
      category: "Aroma Chemicals",
      title: "Alpha-Caryophyllene 55%",
      botanicalOrigin: "Clove",
      organoleptic:
        "Woody, spicy, clove, oceanic watery, slightly green, resinous, balsamic soft, mineral fresh, metallic airy, subtle herbal, light earthy",
      productFormat: "Liquid",
      image: "/our-catalog/our-catalog-detail-featured.png",
      generalInfo: {
        casNumber: "6753-98-6",
        inciName: "-",
        ecNumber: "229-816-7",
        femaNumber: "-",
        certification: "Halal\nKosher",
        moq: "20 Kg",
        shelfLife: "24 Months",
        packagingSize: "20 kg (HDPE Jerrycan)\n180 kg (Metal Drum)",
      },
      applications: [
        {
          title: "Flavor & Fragrance",
          icon: "/our-catalog/icon-fregrance.png",
        },
        {
          title: "Agriculture",
          icon: "/our-catalog/icon-agriculture.png",
        },
        {
          title: "Food & Beverages",
          icon: "/our-catalog/icon-fnb.png",
        },
        {
          title: "Aquaculture",
          icon: "/our-catalog/icon-aquaculture.png",
        },
        {
          title: "Personal Care",
          icon: "/our-catalog/icon-personal-care.png",
        },
        {
          title: "Polymer",
          icon: "/our-catalog/icon-polymer.png",
        },
        {
          title: "Pharmacy",
          icon: "/our-catalog/icon-pharmacy.png",
        },
      ],
    },
    "14": {
      id: "1",
      category: "Aroma Chemicals",
      title: "Alpha-Caryophyllene 55%",
      botanicalOrigin: "Clove",
      organoleptic:
        "Woody, spicy, clove, oceanic watery, slightly green, resinous, balsamic soft, mineral fresh, metallic airy, subtle herbal, light earthy",
      productFormat: "Liquid",
      image: "/our-catalog/our-catalog-detail-featured.png",
      generalInfo: {
        casNumber: "6753-98-6",
        inciName: "-",
        ecNumber: "229-816-7",
        femaNumber: "-",
        certification: "Halal\nKosher",
        moq: "20 Kg",
        shelfLife: "24 Months",
        packagingSize: "20 kg (HDPE Jerrycan)\n180 kg (Metal Drum)",
      },
      applications: [
        {
          title: "Flavor & Fragrance",
          icon: "/our-catalog/icon-fregrance.png",
        },
        {
          title: "Agriculture",
          icon: "/our-catalog/icon-agriculture.png",
        },
        {
          title: "Food & Beverages",
          icon: "/our-catalog/icon-fnb.png",
        },
        {
          title: "Aquaculture",
          icon: "/our-catalog/icon-aquaculture.png",
        },
        {
          title: "Personal Care",
          icon: "/our-catalog/icon-personal-care.png",
        },
        {
          title: "Polymer",
          icon: "/our-catalog/icon-polymer.png",
        },
        {
          title: "Pharmacy",
          icon: "/our-catalog/icon-pharmacy.png",
        },
      ],
    },
  };

  return products[id as keyof typeof products] || null;
};

export async function generateMetadata({ params }: ProductDetailPageProps) {
  const { locale, id } = await params;
  const product = getProductData(id);

  if (!product) {
    return {
      title: "Product Not Found - Indesso",
    };
  }

  return {
    title: `${product.title} - ${product.category} - Indesso`,
    description: product.organoleptic,
    keywords: `${product.category}, ${product.botanicalOrigin}, ${product.title}`,
  };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { locale, id } = await params;
  const product = getProductData(id);

  if (!product) {
    notFound();
  }

  const [footerData, headerData] = await Promise.all([
    getFooterData(locale),
    getHeaderData(locale),
  ]);

  return (
    <>
      <Header data={headerData} locale={locale} variant="solid" />
      <main>
        <ProductHeroSection product={product} />
        <GeneralInformationSection data={product.generalInfo} />
        <CompatibilitySection applications={product.applications} />
        <RequestSampleSection productName={product.title} />
        <RelatedProductsSection currentProductId={product.id} />
      </main>
      <Footer data={footerData} locale={locale} />
    </>
  );
}

export async function generateStaticParams() {
  // Generate static paths for all products
  const productIds = ["1"]; // Add more product IDs as needed

  const params = [];
  for (const locale of ["en", "id", "cn"]) {
    for (const id of productIds) {
      params.push({ locale, id });
    }
  }

  return params;
}
