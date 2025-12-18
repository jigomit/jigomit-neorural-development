import { onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

const BASE_URL = import.meta.env.VITE_BASE_URL || (typeof window !== 'undefined' ? window.location.origin : 'https://neorural.dev');

// Long-tail keyword variations for different pages
const LONG_TAIL_KEYWORDS = {
  home: [
    'community-led rural development initiatives for sustainable village transformation',
    'water security solutions for rural communities in India',
    'climate-resilient village infrastructure development programs',
    'participatory rural development approach for village transformation',
    'sustainable agriculture development programs in rural villages',
    'rural livelihood improvement programs through community participation',
    'village water management systems for water security',
    'regenerative village development models for sustainable transformation',
    'community-based rural transformation programs',
    'rural digital infrastructure development for village connectivity',
  ],
  about: [
    'how to partner with rural development NGO for village transformation',
    'participatory rural development approach explained',
    'community-led sustainable development methodology',
    'regenerative village development models and frameworks',
    'rural development partners for sustainable village programs',
    'village development programs based on community participation',
    'sustainable village transformation through participatory approach',
  ],
  initiatives: [
    'water security solutions for rural communities implementation',
    'village water management systems design and implementation',
    'sustainable agriculture development programs in villages',
    'rural digital infrastructure development projects',
    'climate smart agriculture programs for rural communities',
    'village digital commons for rural connectivity',
    'resilient water networks for village water security',
    'rural livelihood improvement programs through skill development',
  ],
  impact: [
    'measurable outcomes from community-led rural development programs',
    'village development program impact metrics and results',
    'sustainable rural development impact assessment',
    'rural transformation success stories and case studies',
    'community-led development results and outcomes',
  ],
  stories: [
    'real-world examples of sustainable village transformation',
    'community-led rural development success stories from India',
    'village transformation stories through participatory development',
    'rural development case studies with measurable impact',
    'sustainable village development examples and testimonials',
  ],
  contact: [
    'how to partner with rural development organization',
    'CSR partnerships for sustainable village development programs',
    'funding opportunities for rural development initiatives',
    'collaborate on community-led rural development projects',
    'contact rural development NGO for village programs',
  ],
  blog: [
    'insights on community-led village transformation programs',
    'best practices for sustainable rural development',
    'rural development frameworks and methodologies',
    'village development program implementation guides',
  ],
};

export function useSEO() {
  const route = useRoute();

  const getStructuredData = () => {
    const structuredData = {
      organization: {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'NeoRural Development',
        url: BASE_URL,
        logo: `${BASE_URL}/logo.png`,
        description:
          'NeoRural Development designs and scales community-led rural development initiatives that improve livelihoods, water security, and village infrastructure through sustainable village transformation programs.',
        sameAs: [
          'https://facebook.com/communitydevelopment',
          'https://instagram.com/communitydevelopment',
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+1-415-555-4824',
          contactType: 'Customer Service',
          email: 'hello@community.dev',
          areaServed: 'IN',
          availableLanguage: ['en', 'hi'],
        },
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'IN',
        },
      },
      website: {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'NeoRural Development',
        url: BASE_URL,
        description:
          'Community-led rural development initiatives for sustainable village transformation, water security solutions, and climate-resilient infrastructure development.',
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      },
      breadcrumb: {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: getBreadcrumbItems(),
      },
    };

    return structuredData;
  };

  const getBreadcrumbItems = () => {
    const items = [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: BASE_URL,
      },
    ];

    if (route.name && route.name !== 'home') {
      const routeNames = {
        about: 'About',
        initiatives: 'Initiatives',
        impact: 'Impact',
        stories: 'Stories',
        gallery: 'Gallery',
        contact: 'Contact',
        blog: 'Blog',
      };

      items.push({
        '@type': 'ListItem',
        position: 2,
        name: routeNames[route.name] || route.name,
        item: `${BASE_URL}${route.path}`,
      });
    }

    return items;
  };

  const getFAQSchema = () => {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What are community-led rural development initiatives?',
          acceptedAnswer: {
            '@type': 'Answer',
            text:
              'Community-led rural development initiatives are programs designed and implemented with active participation from local communities. These initiatives focus on sustainable village transformation, water security solutions, and climate-resilient infrastructure development, ensuring that rural communities have ownership and control over their development process.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do water security solutions help rural communities?',
          acceptedAnswer: {
            '@type': 'Answer',
            text:
              'Water security solutions for rural communities include village water management systems, resilient water networks, and sustainable water conservation practices. These programs ensure year-round water availability, improve agricultural productivity, and enhance the quality of life in rural villages through community-managed water resources.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is participatory rural development approach?',
          acceptedAnswer: {
            '@type': 'Answer',
            text:
              'Participatory rural development approach involves engaging local communities in every stage of development - from planning to implementation and monitoring. This approach ensures that development programs are tailored to local needs, respect traditional knowledge, and create sustainable, long-term impact through community ownership.',
          },
        },
        {
          '@type': 'Question',
          name: 'How can organizations partner with NeoRural Development?',
          acceptedAnswer: {
            '@type': 'Answer',
            text:
              'Organizations can partner with NeoRural Development through CSR partnerships, funding opportunities, and collaborative projects. We work with corporations, foundations, and government agencies to implement sustainable village transformation programs, water security solutions, and climate-resilient infrastructure development projects.',
          },
        },
        {
          '@type': 'Question',
          name: 'What makes sustainable village development programs effective?',
          acceptedAnswer: {
            '@type': 'Answer',
            text:
              'Effective sustainable village development programs combine community participation, local knowledge, modern technology, and long-term planning. They focus on water security, sustainable agriculture, digital infrastructure, and livelihood improvement, creating regenerative village development models that ensure lasting transformation.',
          },
        },
      ],
    };
  };

  const injectStructuredData = () => {
    // Remove existing structured data
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
    existingScripts.forEach((script) => script.remove());

    const structuredData = getStructuredData();

    // Inject Organization schema
    const orgScript = document.createElement('script');
    orgScript.type = 'application/ld+json';
    orgScript.textContent = JSON.stringify(structuredData.organization);
    document.head.appendChild(orgScript);

    // Inject WebSite schema
    const websiteScript = document.createElement('script');
    websiteScript.type = 'application/ld+json';
    websiteScript.textContent = JSON.stringify(structuredData.website);
    document.head.appendChild(websiteScript);

    // Inject BreadcrumbList schema
    const breadcrumbScript = document.createElement('script');
    breadcrumbScript.type = 'application/ld+json';
    breadcrumbScript.textContent = JSON.stringify(structuredData.breadcrumb);
    document.head.appendChild(breadcrumbScript);

    // Inject FAQ schema on relevant pages
    if (['home', 'about', 'initiatives', 'contact'].includes(route.name)) {
      const faqScript = document.createElement('script');
      faqScript.type = 'application/ld+json';
      faqScript.textContent = JSON.stringify(getFAQSchema());
      document.head.appendChild(faqScript);
    }
  };

  const getLongTailKeywords = () => {
    return LONG_TAIL_KEYWORDS[route.name] || LONG_TAIL_KEYWORDS.home;
  };

  onMounted(() => {
    injectStructuredData();
  });

  watch(
    () => route.path,
    () => {
      injectStructuredData();
    }
  );

  return {
    getLongTailKeywords,
    injectStructuredData,
  };
}
