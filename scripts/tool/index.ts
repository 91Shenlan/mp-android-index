import * as https from 'https'
import * as fs from 'fs'

import { WxArticleList } from './types'

/*

2018-10-13 公众号Tab
增加微信公众号 Tab，查看公众号文章，支持搜索，。

获取公众号列表
https://wanandroid.com/wxarticle/chapters/json  
方法： GET
查看某个公众号历史数据
https://wanandroid.com/wxarticle/list/408/1/json
方法：GET
参数：
	公众号 ID：拼接在 url 中，eg:405
	公众号页码：拼接在url 中，eg:1
在某个公众号中搜索历史文章
https://wanandroid.com/wxarticle/list/405/1/json?k=Java
方法：GET
参数 ：
	k : 字符串，eg:Java
	公众号 ID：拼接在 url 中，eg:405
  公众号页码：拼接在url 中，eg:1
  
/*

console.log('start tool..')

/*
  { children: [],
      courseId: 13,
      id: 408,
      name: '鸿洋',
      order: 190000,
      parentChapterId: 407,
      userControlSetTop: false,
      visible: 1 },
    { children: [],
      courseId: 13,
      id: 409,
      name: '郭霖',
      order: 190001,
      parentChapterId: 407,
      userControlSetTop: false,
      visible: 1 },
    { children: [],
      courseId: 13,
      id: 410,
      name: '玉刚说',
      order: 190002,
      parentChapterId: 407,
      userControlSet: false,
      visible: 1 },
 */
// https.get('https://wanandroid.com/wxarticle/chapters/json', res => {
//   let data = ''
//   res.on('data', chunk => {
//     data += chunk
//   })
//   res.on('end', () => {
//     console.log('wxarticle/chapters/json', JSON.parse(data))
//   })
// }).on('error', err => {
//   console.error('error: ', err)
// })

function requestWxArticleList(id: number, page: number): Promise<WxArticleList.Data> {
  return new Promise((resolve, reject) => {
    const url = `https://wanandroid.com/wxarticle/list/${id}/${page}/json`
    console.log(`request url: ${url}`)
    https.get(url, res => {
      let data = ''
      res.on('data', chunk => {
        data += chunk
      })
      res.on('end', () => {
        const result = JSON.parse(data) as WxArticleList.Result
        resolve(result.data)
      })
    }).on('error', err => {
      reject(err)
    })
  })
}

function parseArticle(articles: WxArticleList.Article[]): string[] {
  const result: string[] = []
  for (const article of articles) {
    result.push(`* ${article.niceDate.substring(0, 10)} [${article.title}](${article.link})`)
  }
  return result
}

async function generateFile(id: number, name: string) {
  console.log(`GenerateFile for [${id}, ${name}] ..`)

  const firstPage = 1
  let articles: WxArticleList.Article[] = []
  try {
    const firstResult = await requestWxArticleList(id, firstPage)
    articles = [...firstResult.datas]
    console.log(`Size of first-page(${firstPage})  articles : ${articles.length}`)

    for (let nextPage = firstPage + 1; nextPage <= firstResult.pageCount; nextPage++) {
      const nextResult = await requestWxArticleList(id, nextPage)
      articles = [...articles, ...nextResult.datas]
      console.log(`Size of next-page(${nextPage}) articles: ${articles.length}`)
    }
  } catch(e) {
    console.log('Something wrong:', e)
  }
  console.log(`Size of (${id}) articles size: ${articles.length}`)

  const dirName = 'temp'
  if (!fs.existsSync(dirName)) {
    fs.mkdirSync(dirName)
  }
  const articleLinks = parseArticle(articles)
  const fileName = `${dirName}/${id}_${name}.md`
  fs.writeFileSync(fileName, articleLinks.join('\n'), 'utf-8')

  console.log(`GenerateFile for [${id}, ${name}] finished.\n`)
}

async function start() {
  console.log('Tool started ..\n')

  const targets: { id: number, name: string }[] = [
    { id: 408, name: 'HONG_YANG' },
    { id: 409, name: 'GUO_LIN' },
    { id: 410, name: 'YU_GANG_SHUO' },
    { id: 415, name: 'GOOGLE_DEVELOPER' },
    { id: 417, name: 'MEITUAN_TECH' },
    // { id: 411, name: 'CHENG_XIANG_MO_YING' },
    // { id: 413, name: 'QUN_YING_ZHUANG' },
    // ...
  ] 
  for (const target of targets) {
    const { id, name } = target
    await generateFile(id, name)
  }

  console.log('Tool done !\n')
}

start()