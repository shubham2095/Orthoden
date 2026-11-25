// Public pages and their search-engine priority.
const STATIC_PAGES = [
  { path: '/', priority: '1.0' },
  { path: '/about', priority: '0.8' },
  { path: '/services', priority: '0.8' },
  { path: '/contact', priority: '0.7' },
  { path: '/gallery', priority: '0.5' },
]

const escapeXml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')

// SITE_URL is the public address of the website. A missing https:// and trailing slashes are fixed up.
function siteUrl() {
  const url = (process.env.SITE_URL || 'http://localhost:5000').trim().replace(/\/+$/, '')
  return /^https?:\/\//i.test(url) ? url : `https://${url}`
}

export function getSitemap(req, res) {
  const base = siteUrl()

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...STATIC_PAGES.map(
      (page) => `  <url>\n    <loc>${escapeXml(base + page.path)}</loc>\n    <priority>${page.priority}</priority>\n  </url>`,
    ),
    '</urlset>',
    '',
  ].join('\n')

  res.type('application/xml').send(xml)
}

export function getRobots(req, res) {
  res.type('text/plain').send(`User-agent: *\nAllow: /\n\nSitemap: ${siteUrl()}/sitemap.xml\n`)
}
