import React, { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface SEOProps {
  titleEs: string;
  titleEn: string;
  descriptionEs: string;
  descriptionEn: string;
  image?: string;
  path: string;
}

export const SEO: React.FC<SEOProps> = ({
  titleEs,
  titleEn,
  descriptionEs,
  descriptionEn,
  image = '/images/logo-casa-mahana.png',
  path
}) => {
  const { language } = useLanguage();

  const title = language === 'es' ? titleEs : titleEn;
  const description = language === 'es' ? descriptionEs : descriptionEn;
  const canonicalUrl = `https://www.casamahana.com${path}`;

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
    setMetaTag('property', 'og:image', image.startsWith('http') ? image : `https://www.casamahana.com${image}`);
    setMetaTag('property', 'og:type', 'website');

    // 5. Update Twitter tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', image.startsWith('http') ? image : `https://www.casamahana.com${image}`);

    // 6. Update Canonical link
    let canonicalLink = document.head.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

  }, [title, description, canonicalUrl, image]);

  return null;
};
