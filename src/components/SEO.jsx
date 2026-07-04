import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function SEO({ title, description, type = 'website' }) {
  const location = useLocation();
  const siteUrl = 'https://speedtracktowing.com'; // Change to actual production URL
  const canonicalUrl = `${siteUrl}${location.pathname}`;
  const defaultTitle = 'Speed Track Towing Service | 24/7 Professional Towing & Roadside Assistance Karnataka';
  const displayTitle = title ? `${title} | Speed Track Towing Service` : defaultTitle;
  const defaultDescription = 'Speed Track Towing Service offers 24/7 fast, safe, and professional emergency towing and roadside assistance across Shivamogga and the greater metropolitan area. Call us now!';
  const displayDescription = description || defaultDescription;

  useEffect(() => {
    document.title = displayTitle;

    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', displayDescription);

    // Update OpenGraph tags
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', displayTitle);

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute('content', displayDescription);

    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement('meta');
      ogUrl.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrl);
    }
    ogUrl.setAttribute('content', canonicalUrl);

    // Add/update structured JSON-LD schema
    let scriptSchema = document.getElementById('jsonld-schema');
    if (!scriptSchema) {
      scriptSchema = document.createElement('script');
      scriptSchema.id = 'jsonld-schema';
      scriptSchema.type = 'application/ld+json';
      document.head.appendChild(scriptSchema);
    }

    const localBusinessSchema = {
      '@context': 'https://schema.org',
      '@type': 'EmergencyService',
      'name': 'Speed Track Towing Service',
      'image': 'https://speedtracktowing.com/hero-tow-truck.jpg',
      '@id': 'https://speedtracktowing.com/#organization',
      'url': 'https://speedtracktowing.com',
      'telephone': '+917899916161', // Replace with real company phone
      'priceRange': '$$',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'Mallari Complex, Sagar Road, Sharavathi Nagar, Hosamane',
        'addressLocality': 'Shivamogga',
        'addressRegion': 'Karnataka',
        'postalCode': '577201',
        'addressCountry': 'IN'
      },
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': 13.9299,
        'longitude': 75.5676
      },
      'openingHoursSpecification': {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday'
        ],
        'opens': '00:00',
        'closes': '23:59'
      },
      'sameAs': [
        'https://facebook.com/speedtracktowing',
        'https://instagram.com/speedtracktowing'
      ],
      'areaServed': [
        {
          '@type': 'AdministrativeArea',
          'name': 'Shivamogga'
        },
        {
          '@type': 'AdministrativeArea',
          'name': 'Shivamogga'
        },
        {
          '@type': 'AdministrativeArea',
          'name': 'Mysuru'
        },
        {
          '@type': 'AdministrativeArea',
          'name': 'Karnataka'
        }
      ]
    };

    scriptSchema.textContent = JSON.stringify(localBusinessSchema);

  }, [displayTitle, displayDescription, canonicalUrl]);

  return null;
}
