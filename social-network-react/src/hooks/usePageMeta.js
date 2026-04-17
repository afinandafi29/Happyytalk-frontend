import { useEffect } from 'react';

/**
 * Hook to update page title and meta tags for SEO
 */
export const usePageMeta = (title, description, url = '') => {
  useEffect(() => {
    // Set title
    document.title = title || 'Happy Talk';

    // Update or create meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = description || 'Connect with friends & speak freely on Happy Talk';

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    if (url) {
      canonical.href = url;
    }

    // Update Open Graph tags
    const ogTags = {
      'og:title': title || 'Happy Talk',
      'og:description': description || 'Connect with friends & speak freely on Happy Talk',
      'og:url': url || window.location.href,
    };

    Object.entries(ogTags).forEach(([property, content]) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.content = content;
    });

  }, [title, description, url]);
};

/**
 * Hook to set meta tags for the moments page
 */
export const useMomentsPageMeta = () => {
  useEffect(() => {
    document.title = 'Moments - Happy Talk | Connect & Discuss';

    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = 'Browse public moments on Happy Talk. Join discussions, share posts, and connect with the community.';

    // Set canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = `${window.location.origin}/moments`;
  }, []);
};
