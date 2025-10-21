import { useEffect } from "react";

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export default function SEOHead({
  title = "Lucas Toledo Cortonezi - Desenvolvedor e Estudante de Engenharia de Software",
  description = "Portfólio profissional de Lucas Toledo Cortonezi, desenvolvedor e estudante de Engenharia de Software na FIAP. Conheça meus projetos, certificados e habilidades.",
  image = "/og-image.png",
  url = "https://seu-dominio.com",
}: SEOHeadProps) {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta tags
    const updateMetaTag = (name: string, content: string) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", name);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    const updateOGTag = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("property", property);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    // Standard meta tags
    updateMetaTag("description", description);
    updateMetaTag("keywords", "desenvolvedor, engenharia de software, portfólio, React, Node.js, FIAP");
    updateMetaTag("author", "Lucas Toledo Cortonezi");
    updateMetaTag("viewport", "width=device-width, initial-scale=1.0");

    // Open Graph tags
    updateOGTag("og:title", title);
    updateOGTag("og:description", description);
    updateOGTag("og:image", image);
    updateOGTag("og:url", url);
    updateOGTag("og:type", "website");

    // Twitter Card tags
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:title", title);
    updateMetaTag("twitter:description", description);
    updateMetaTag("twitter:image", image);

    // Additional meta tags
    updateMetaTag("theme-color", "#003366");
    updateMetaTag("robots", "index, follow");
    updateMetaTag("language", "Portuguese");

    // Canonical URL
    let canonical = document.querySelector("link[rel='canonical']");
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url);
  }, [title, description, image, url]);

  return null;
}

