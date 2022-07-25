import { getStrapiURL } from "./api";

export function getStrapiMedia(media) {
  if (!media) return "";
  
  if (media.data) {
    const {url} = media.data.attributes;  
    const imageUrl = url.startsWith("/") ? getStrapiURL(url) : url;
    return imageUrl;  
  }


  const {url} = media.attributes;  
  const imageUrl = url.startsWith("/") ? getStrapiURL(url) : url;
  return imageUrl;  
  
}