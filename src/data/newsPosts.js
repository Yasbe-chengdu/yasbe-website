import coverImage from '../assets/images/blog/blog-cover-motocross.png'
import sibosFutureMarkdown from './blogMarkdown/sibos-2026-future.md?raw'
import yasbeCircleMarkdown from './blogMarkdown/yasbe-circle-stablecoin-ai.md?raw'
import yasbeSibosMarkdown from './blogMarkdown/yasbe-sibos-miami-2026.md?raw'

const newsSources = [
  {
    slug: 'sibos-2026-digital-finance-future',
    date: '06 Jun 2026',
    markdown: sibosFutureMarkdown,
  },
  {
    slug: 'yasbe-circle-ai-stablecoin',
    date: '06 Jun 2026',
    markdown: yasbeCircleMarkdown,
  },
  {
    slug: 'yasbe-sibos-miami-2026',
    date: '06 Jun 2026',
    markdown: yasbeSibosMarkdown,
  },
]

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
  const rawTitle = lines.find((line) => line.trim().startsWith('# ')) ?? '# News'
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

  const excerpt = blocks
    .filter((block) => block.type === 'paragraph')
    .slice(0, 3)
    .map((block) => cleanMarkdownText(block.text))
    .join(' ')

  return {
    title,
    excerpt,
    blocks,
  }
}

export const newsPosts = newsSources.map((source, index) => {
  const parsed = parseMarkdown(source.markdown)

  return {
    id: index + 1,
    slug: source.slug,
    date: source.date,
    title: parsed.title,
    excerpt: parsed.excerpt,
    blocks: parsed.blocks,
    image: coverImage,
    hasImage: index === 2,
  }
})

export function getNewsPost(slug) {
  return newsPosts.find((post) => post.slug === slug) ?? newsPosts[0]
}
