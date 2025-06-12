import Script from 'next/script';

interface StructuredDataProps {
  type?: 'website' | 'webapp' | 'article';
  name?: string;
  description?: string;
  url?: string;
}

export default function StructuredData({ 
  type = 'website',
  name = 'FinancialQuery',
  description = '上場企業の財務諸表データの分布分析を財務諸表別に可視化する分析プラットフォーム',
  url = 'https://financial-query.vercel.app'
}: StructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": type === 'webapp' ? 'WebApplication' : 'WebSite',
    "name": name,
    "description": description,
    "url": url,
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web",
    "inLanguage": "ja-JP",
    "author": {
      "@type": "Organization",
      "name": "FinancialQuery Team"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "JPY"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${url}/factbook?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}