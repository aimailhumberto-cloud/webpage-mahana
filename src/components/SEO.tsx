import React, { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface SEOProps {
  titleEs: string;
  titleEn: string;
  descriptionEs: string;
  descriptionEn: string;
  image?: string;
  path: string;
  schemaType?: 'LodgingBusiness' | 'Restaurant' | 'TouristAttraction' | 'WebPage';
}

export const SEO: React.FC<SEOProps> = ({
  titleEs,
  titleEn,
  descriptionEs,
  descriptionEn,
  image = '/images/logo-casa-mahana.png',
  path,
  schemaType = 'LodgingBusiness'
}) => {
  const { language } = useLanguage();

  const title = language === 'es' ? titleEs : titleEn;
  const description = language === 'es' ? descriptionEs : descriptionEn;
  const canonicalUrl = `https://www.casamahana.com${path}`;
  const fullImageUrl = image.startsWith('http') ? image : `https://www.casamahana.com${image}`;

  useEffect(() => {
    // 1. Update document title
    document.title = title;

    // 2. Helper to set/create meta tag
    const setMetaTag = (attrName: string, attrVal: string, contentVal: string) => {
      let element = document.head.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrVal);
        document.head.appendChild(element);
      }
      element.setAttribute('content', contentVal);
    };

    // 3. Update standard description
    setMetaTag('name', 'description', description);

    // 4. Update Open Graph (OG) tags
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:image', fullImageUrl);
    setMetaTag('property', 'og:type', 'website');
    setMetaTag('property', 'og:site_name', 'Casa Mahana Lodge & Restaurant');
    setMetaTag('property', 'og:locale', language === 'es' ? 'es_PA' : 'en_US');

    // 5. Update Twitter tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', fullImageUrl);

    // 6. Update Canonical link
    let canonicalLink = document.head.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // 7. Inject / Update Schema.org JSON-LD Structured Data
    const structuredData: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': schemaType === 'Restaurant' ? 'Restaurant' : 'LodgingBusiness',
      name: 'Casa Mahana Lodge & Restaurant',
      alternateName: 'Casa Mahana',
      url: canonicalUrl,
      logo: 'https://www.casamahana.com/images/logo-casa-mahana.png',
      image: fullImageUrl,
      description,
      telephone: '+5073453222',
      priceRange: '$5.50 - $66.00',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Vía Punta Chame, El Mangote',
        addressLocality: 'Chame',
        addressRegion: 'Panamá Oeste',
        addressCountry: 'PA'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 8.5833,
        longitude: -79.8833
      },
      amenityFeature: [
        { '@type': 'LocationFeatureSpecification', name: '3 Swimming Pools', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Wood-Fired Restaurant', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Free High-Speed WiFi', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Pet Friendly', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Free Parking', value: true }
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.2',
        reviewCount: '85'
      }
    };

    let scriptTag = document.head.querySelector('#schema-structured-data');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.setAttribute('type', 'application/ld+json');
      scriptTag.setAttribute('id', 'schema-structured-data');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(structuredData);

  }, [title, description, canonicalUrl, fullImageUrl, language, schemaType]);

  return null;
};
export default SEO;
