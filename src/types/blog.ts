type Author = {
  name: string;
  image: string;
  designation: string;
};

export type Blog = {
  id: string;
  title: string;
  paragraph: string;
  image: string;
  // video:string,
  author: Author;
  tags: string[];
  publishDate: string;
  readTime:number;
  category:string;
  sections:{
   
  };

};
