import coverImage from '../assets/images/blog/blog-cover-motocross.png'
import sibosFutureMarkdown from './blogMarkdown/sibos-2026-future.md?raw'
import yasbeCircleMarkdown from './blogMarkdown/yasbe-circle-stablecoin-ai.md?raw'
import yasbeSibosMarkdown from './blogMarkdown/yasbe-sibos-miami-2026.md?raw'

const articleSources = [
  {
    slug: 'sibos-2026-digital-finance-future',
    topic: 'Digital finance',
    industry: 'Financial infrastructure',
    date: '06 Jun 2026',
    readTime: '8 minutes',
    markdown: sibosFutureMarkdown,
  },
  {
    slug: 'yasbe-circle-ai-stablecoin',
    topic: 'Stablecoin',
    industry: 'Digital assets',
    date: '06 Jun 2026',
    readTime: '6 minutes',
    markdown: yasbeCircleMarkdown,
  },
  {
    slug: 'yasbe-sibos-miami-2026',
    topic: 'Cross-border payments',
    industry: 'Payments',
    date: '06 Jun 2026',
    readTime: '7 minutes',
    markdown: yasbeSibosMarkdown,
  },
]

export const blogTopics = ['Digital finance', 'Stablecoin', 'Cross-border payments']
export const blogIndustries = ['Financial infrastructure', 'Digital assets', 'Payments']

const imagePattern = /^!\[[^\]]*]\([^)]+\)$/
const unorderedListPattern = /^(?:•|-|✔)\s*/
const numberedListPattern = /^\d+[.、]\s+/

function cleanMarkdownText(text) {
  return text
    .replace(/\\([+\-*])/g, '$1')
    .replace(/\*\*/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function isHeadingLine(line) {
  return line.startsWith('**') && line.endsWith('**') && line.length <= 80
}

function parseMarkdown(markdown) {
  const lines = markdown.split(/\r?\n/)
  const rawTitle = lines.find((line) => line.trim().startsWith('# ')) ?? '# Blog'
  const title = cleanMarkdownText(rawTitle.replace(/^#\s+/, ''))
  const bodyLines = lines.slice(lines.indexOf(rawTitle) + 1)
  const blocks = []
  let listItems = []

  const flushList = () => {
    if (!listItems.length) return
    blocks.push({ type: 'list', items: listItems })
    listItems = []
  }

  bodyLines.forEach((rawLine) => {
    const line = rawLine.trim()

    if (!line || imagePattern.test(line)) {
      flushList()
      return
    }

    if (line.startsWith('# ')) {
      flushList()
      return
    }

    if (isHeadingLine(line)) {
      flushList()
      blocks.push({ type: 'heading', text: cleanMarkdownText(line) })
      return
    }

    if (numberedListPattern.test(line) && cleanMarkdownText(line).length <= 34) {
      flushList()
      blocks.push({ type: 'subheading', text: cleanMarkdownText(line.replace(numberedListPattern, '')) })
      return
    }

    if (unorderedListPattern.test(line)) {
      listItems.push(cleanMarkdownText(line.replace(unorderedListPattern, '')))
      return
    }

    flushList()
    blocks.push({ type: 'paragraph', text: line })
  })

  flushList()

  const firstParagraphs = blocks
    .filter((block) => block.type === 'paragraph')
    .slice(0, 2)
    .map((block) => cleanMarkdownText(block.text))
    .join(' ')

  return {
    title,
    excerpt: firstParagraphs,
    blocks,
  }
}

export const blogPosts = articleSources.map((source, index) => {
  const parsed = parseMarkdown(source.markdown)

  return {
    id: index + 1,
    slug: source.slug,
    topic: source.topic,
    industry: source.industry,
    cardTitle: parsed.title,
    detailTitle: parsed.title,
    excerpt: parsed.excerpt,
    author: 'YASBe',
    authorRole: 'Editorial Team',
    date: source.date,
    detailDate: source.date,
    readTime: source.readTime,
    image: coverImage,
    blocks: parsed.blocks,
  }
})

export function getBlogPost(slug) {
  return blogPosts.find((post) => post.slug === slug) ?? blogPosts[0]
}
