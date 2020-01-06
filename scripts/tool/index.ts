import * as https from 'https'

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
https.get('https://wanandroid.com/wxarticle/chapters/json', res => {
  let data = ''
  res.on('data', chunk => {
    data += chunk
  })
  res.on('end', () => {
    console.log('wxarticle/chapters/json', JSON.parse(data))
  })
}).on('error', err => {
  console.error('error: ', err)
})