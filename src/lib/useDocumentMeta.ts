import { useEffect } from 'react';

type MetaConfig = {
  title: string;
  description: string;
  path: string;
  jsonLd?: object;
};

const JSON_LD_ID = 'processa-page-jsonld';

function setMeta(name: string, content: string, isProperty = false) {
  const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    if (isProperty) el.setAttribute('property', name);
    else el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export function useDocumentMeta({ title, description, path, jsonLd }: MetaConfig) {
  useEffect(() => {
    const url = `https://sergiogroup.org${path}`;
    document.title = title;
    setMeta('description', description);
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:url', url, true);
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setCanonical(url);

    let script = document.getElementById(JSON_LD_ID) as HTMLScriptElement | null;
    if (jsonLd) {
      if (!script) {
        script = document.createElement('script');
        script.id = JSON_LD_ID;
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(jsonLd);
    } else if (script) {
      script.remove();
    }

    return () => {
      const s = document.getElementById(JSON_LD_ID);
      if (s) s.remove();
    };
  }, [title, description, path, jsonLd]);
}
