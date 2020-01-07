export declare module WxArticleList {

  export interface Tag {
      name: string;
      url: string;
  }

  export interface Article {
      apkLink: string;
      audit: number;
      author: string;
      chapterId: number;
      chapterName: string;
      collect: boolean;
      courseId: number;
      desc: string;
      envelopePic: string;
      fresh: boolean;
      id: number;
      link: string;
      niceDate: string;
      niceShareDate: string;
      origin: string;
      prefix: string;
      projectLink: string;
      publishTime: any;
      selfVisible: number;
      shareDate: any;
      shareUser: string;
      superChapterId: number;
      superChapterName: string;
      tags: Tag[];
      title: string;
      type: number;
      userId: number;
      visible: number;
      zan: number;
  }

  export interface Data {
      curPage: number;
      datas: Article[];
      offset: number;
      over: boolean;
      pageCount: number;
      size: number;
      total: number;
  }

  export interface Result {
      data: Data;
      errorCode: number;
      errorMsg: string;
  }
}

