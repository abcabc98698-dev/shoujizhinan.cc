import fs from 'node:fs'
import path from 'node:path'

export interface HeadConfig {
  tag: string
  attrs?: Record<string, string>
  children?: string
}

const SECTION_NAMES: Record<string, string> = {
  'shouji-fanqiang': '手机翻墙',
  'android': '安卓科学上网',
  'ios': '苹果科学上网',
  'proxy-apps': '手机代理App',
  'tizi-tuijian': '梯子推荐',
  'jichang-tuijian': '机场推荐',
  'mianfei-jichang': '免费机场',
  'wangluo-paizhang': '手机网络排障',
  'about': '关于我们',
  'methodology': '评测方法论',
  'privacy': '隐私保护政策',
  'disclosure': '推广披露与免责'
}

/**
 * Extract genuine Q&A items from the markdown content
 * Returns null if no genuine FAQ section exists.
 */
export function extractFaqSchema(filePath: string) {
  try {
    if (!fs.existsSync(filePath)) return null
    const content = fs.readFileSync(filePath, 'utf8')
    if (!content.includes('faq-question')) return null

    const questions: { question: string; answer: string }[] = []
    const summaryRegex = /<summary class=["']faq-question["']>([\s\S]*?)<\/summary>/gi
    const answerRegex = /<div class=["']faq-answer["']>([\s\S]*?)<\/div>/gi

    const qMatches = [...content.matchAll(summaryRegex)]
    const aMatches = [...content.matchAll(answerRegex)]

    for (let i = 0; i < Math.min(qMatches.length, aMatches.length); i++) {
      const q = qMatches[i][1].replace(/<[^>]+>/g, '').trim()
      const a = aMatches[i][1].replace(/<[^>]+>/g, '').trim()
      if (q && a) {
        questions.push({ question: q, answer: a })
      }
    }

    if (questions.length === 0) return null

    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': questions.map(item => ({
        '@type': 'Question',
        'name': item.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': item.answer
        }
      }))
    }
  } catch {
    return null
  }
}

/**
 * Generate BreadcrumbList Schema
 */
export function generateBreadcrumbSchema(rawPath: string, title: string, canonicalUrl: string) {
  const items = [
    {
      '@type': 'ListItem',
      'position': 1,
      'name': '首页',
      'item': 'https://shoujizhinan.cc'
    }
  ]

  const segments = rawPath ? rawPath.split('/') : []
  if (segments.length > 0) {
    const sectionSlug = segments[0]
    const sectionName = SECTION_NAMES[sectionSlug] || sectionSlug
    items.push({
      '@type': 'ListItem',
      'position': 2,
      'name': sectionName,
      'item': `https://shoujizhinan.cc/${sectionSlug}`
    })

    if (segments.length > 1) {
      items.push({
        '@type': 'ListItem',
        'position': 3,
        'name': title || '当前页面',
        'item': canonicalUrl
      })
    }
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items
  }
}
