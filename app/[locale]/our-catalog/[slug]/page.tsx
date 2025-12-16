import type { Locale } from "@/lib/i18n/config";
import { getFooterData, getHeaderData, getStrapiMedia } from "@/lib/strapi/api";
import { getProductBySlug, getProductDetailPage, getProducts } from "@/lib/strapi/catalog-api";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ProductHeroSection } from "@/components/sections/catalog/product-hero-section";
import { GeneralInformationSection } from "@/components/sections/catalog/general-information-section";
import { CompatibilitySection } from "@/components/sections/catalog/compatibility-section";
import { RequestSampleSection } from "@/components/sections/catalog/request-sample-section";
import { RelatedProductsSection } from "@/components/sections/catalog/related-products-section";
import { notFound } from "next/navigation";

interface ProductDetailPageProps {
  params: Promise<{ locale: Locale; slug: string }>;
}

export async function generateMetadata({ params }: ProductDetailPageProps) {
  const { locale, slug } = await params;
  const product = await getProductBySlug(slug, locale);

  if (!product) {
    return {
      title: "Product Not Found - Indesso",
    };
  }

  const desc = (product.organoleptics || []).map((o: any) => o.name).join(", ") || "";
  return {
    title: `${product.name} - ${product.product_category?.name ?? ""} - Indesso`,
    description: desc,
    keywords: `${product.product_category?.name ?? ""}, ${product.botanical?.name ?? ""}, ${product.name}`,
  };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { locale, slug } = await params;
  // Fetch product and page content in parallel
  const [product, pageData, footerData, headerData] = await Promise.all([
    getProductBySlug(slug, locale),
    getProductDetailPage(locale),
    getFooterData(locale),
    getHeaderData(locale),
  ]);

  if (!product) {
    notFound();
  }

  // Map product fields into the props expected by local components
  const heroProduct = {
    category: product.product_category?.name ?? "",
    title: product.name ?? "",
    botanicalOrigin: product.botanical?.name ?? "",
    organoleptic: (product.organoleptics || []).map((o: any) => o.name).join(", ") || "",
    productFormat: product.product_format?.name ?? "",
    image: getStrapiMedia(product.image?.url) || product.image?.url || "/placeholder.png",
  };

  const genRaw = (product as any).general_information || {};
  const generalInfo = {
    casNumber: genRaw?.cas_number ?? "-",
    inciName: genRaw?.inci_name ?? "-",
    ecNumber: genRaw?.ec_number ?? "-",
    femaNumber: genRaw?.fema_number ?? "-",
    certification:
      Array.isArray(genRaw?.certification) && genRaw.certification.length > 0
        ? genRaw.certification.map((c: any) => c.certificate).join("\n")
        : "-",
    moq: genRaw?.moq ?? "",
    shelfLife: genRaw?.shelf_life ?? "",
    packagingSize:
      Array.isArray(genRaw?.packaging_size) && genRaw.packaging_size.length > 0
        ? genRaw.packaging_size.map((p: any) => p.size).join("\n")
        : "-",
  };

  const applications = (product.industry_categories || []).map((c: any) => ({
    title: c.name,
    icon: c.icon?.url || "/our-catalog/icon-fregrance.png",
  }));

  // Extract contact_us_section and list_product_section from pageData
  const pageSections = pageData?.page_sections || [];
  const contactWrapper = pageSections.find((s: any) => s.__component === "our-business.contact-us-section") as any;
  const contactData = contactWrapper?.contact_us_section;
  const listWrapper = pageSections.find((s: any) => s.__component === "our-business.list-product-section") as any;
  // Product detail content (labels, titles, descriptions)
  const productDetailSection = pageSections.find((s: any) => s.__component === "our-business.product-detail-section") as any;

  // Fetch related products by botanical slug (exclude current product)
  let relatedProducts: any[] = [];
  try {
    if (product.botanical?.slug) {
      const relatedResp = await getProducts({ locale, botanicalSlug: product.botanical.slug, page: 1 });
      relatedProducts = (relatedResp?.data || []).filter((p: any) => String(p.id) !== String(product.id));
    }
  } catch (e) {
    relatedProducts = [];
  }

  return (
    <>
      <Header data={headerData} locale={locale} variant="solid" />
      <main>
        <ProductHeroSection product={heroProduct} page={productDetailSection} />
        <GeneralInformationSection data={generalInfo} labels={productDetailSection?.general_information_label} />
        <CompatibilitySection
          applications={applications}
          title={productDetailSection?.title_application}
          description={productDetailSection?.description_application}
          accordionTitle={productDetailSection?.title_accordion}
        />
        <RequestSampleSection productName={product.name ?? ""} data={contactData} />
        <RelatedProductsSection
          title={listWrapper?.title}
          products={relatedProducts}
          button={listWrapper?.button}
          locale={locale}
          currentProductId={String(product.id)}
        />
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
