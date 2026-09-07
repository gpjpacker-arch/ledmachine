/**
 * Helper to handle clicks on configurable button links.
 * If the link is an anchor like '#contato', '#contact', or empty, it executes the fallback action (e.g. opening the contact modal).
 * If the link is a web URL, WhatsApp URL, tel:, or mailto:, it opens in a new tab / external handler.
 */
export function openButtonLink(
  rawUrl: string | undefined | null,
  fallbackAction?: () => void
) {
  const url = rawUrl?.trim();

  // If empty or explicitly targeting the contact modal / page anchor
  if (!url || url === '#contato' || url === '#contact' || url === '#orcamento' || url === '#') {
    if (fallbackAction) {
      fallbackAction();
    }
    return;
  }

  // If it's a section anchor on the page (e.g. #solucoes, #diferenciais, #garantia)
  if (url.startsWith('#')) {
    const targetId = url.replace('#', '');
    const el = document.getElementById(targetId) || document.getElementById(`${targetId}-section`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    if (fallbackAction) {
      fallbackAction();
      return;
    }
  }

  // Handle standard external protocols or normalize URL
  let targetUrl = url;
  if (targetUrl.startsWith('wa.me/')) {
    targetUrl = `https://${targetUrl}`;
  } else if (
    !targetUrl.startsWith('http://') &&
    !targetUrl.startsWith('https://') &&
    !targetUrl.startsWith('mailto:') &&
    !targetUrl.startsWith('tel:')
  ) {
    targetUrl = `https://${targetUrl}`;
  }

  window.open(targetUrl, '_blank', 'noopener,noreferrer');
}
