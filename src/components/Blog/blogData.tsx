import { Blog } from "@/types/blog";

const blogData: Blog[] = [
  {
    id: 1,
    image: "/images/blog/blog-1.jpg",
    title:"मां बगलामुखी मंदिर, नलखेड़ा: चमत्कारी शक्ति और आस्था का केंद्र",
    paragraph: "मध्यप्रदेश के आगर मालवा जिले के नलखेड़ा में स्थित मां बगलामुखी मंदिर शक्ति उपासकों के लिए एक पवित्र स्थल है। ",
    tags: ["AI"],
    publishDate: "2024-12-01",
    author: {
      name: "",
      designation: "Tech Writer",
      image: "/images/blog/blog-1.jpg",
    },
  
  },
  {
    id: 2,
    image: "/images/blog/blog-2.jpg",
    title:"श्मशान में है यह प्रसिद्ध मंदिर.....",
    paragraph: "माता बगलामुखी का यह मंदिर मध्य प्रदेश के आगर मालवा जिले के नलखेड़ा कस्बे में लखुन्दर नदी के किनारे स्थित है। यह मन्दिर तीन मुखों वाली त्रिशक्ति बगलामुखी देवी को समर्पित है। ",
    tags: ["AI"],
    publishDate: "2024-12-01",
    author: {
      name: "",
      designation: "Tech Writer",
      image: "",
    },
  
  },
  {
    id: 3,
    image: "/images/blog/blig-3.jpg",
    title:"हिमाचल के इस मंदिर में होते हैं.....",
    paragraph: "धर्मशाला, जागरण संवाददाता। Kangra Famous Temple Baglamukhi Mata, घरेलू कलह, अदालती परेशानियों, जमीन जायदात की समस्या और ग्रहों का शांत करने के लिए लोग पंडि‍तों से शांति यज्ञ या सुझाव लेते तो मिल जाते हैं। ",
    tags: ["AI"],
    publishDate: "2024-12-01",
    author: {
      name: "John Doe",
      designation: "Tech Writer",
      image: "",
    },
  
  }
  // {
  //   id: 4,
  //   image: "/moreadd-2.jpg",
  //   title:"hhhhhhhhhhhhhhhhhhh",
  //   paragraph: "Cloud computing has revolutionized data storage... lkdhf hdkfhskdf hdfhlihf lidshfkhsdfl bkjhfhksjdf kkshdfkjsdhfkjdfhkjhsd kjhfdkj",
  //   tags: ["AI"],
  //   publishDate: "2024-12-01",
  //   author: {
  //     name: "John Doe",
  //     designation: "Tech Writer",
  //     image: "/images/blog/author-01.png",
  //   },
  
  // },
  // {
  //   id: 5,
  //   image: "/moreadd-2.jpg",
  //   title:"hhhhhhhhhhhhhhhhhhh",
  //   paragraph: "Cloud computing has revolutionized data storage... lkdhf hdkfhskdf hdfhlihf lidshfkhsdfl bkjhfhksjdf kkshdfkjsdhfkjdfhkjhsd kjhfdkj",
  //   tags: ["AI"],
  //   publishDate: "2024-12-01",
  //   author: {
  //     name: "John Doe",
  //     designation: "Tech Writer",
  //     image: "/images/blog/author-01.png",
  //   },
  
  // },
  // {
  //   id: 6,
  //   image: "/moreadd-2.jpg",
  //   title:"hhhhhhhhhhhhhhhhhhh",
  //   paragraph: "Cloud computing has revolutionized data storage... lkdhf hdkfhskdf hdfhlihf lidshfkhsdfl bkjhfhksjdf kkshdfkjsdhfkjdfhkjhsd kjhfdkj",
  //   tags: ["AI"],
  //   publishDate: "2024-12-01",
  //   author: {
  //     name: "John Doe",
  //     designation: "Tech Writer",
  //     image: "/images/blog/author-01.png",
  //   },
  
  // },
  // {
  //   id: 7,
  //   image: "/moreadd-2.jpg",
  //   title:"hhhhhhhhhhhhhhhhhhh",
  //   paragraph: "Cloud computing has revolutionized data storage... lkdhf hdkfhskdf hdfhlihf lidshfkhsdfl bkjhfhksjdf kkshdfkjsdhfkjdfhkjhsd kjhfdkj",
  //   tags: ["AI"],
  //   publishDate: "2024-12-01",
  //   author: {
  //     name: "John Doe",
  //     designation: "Tech Writer",
  //     image: "/images/blog/author-01.png",
  //   },
  
  // },
  // {
  //   id: 8,
  //   image: "/moreadd-2.jpg",
  //   title:"hhhhhhhhhhhhhhhhhhh",
  //   paragraph: "Cloud computing has revolutionized data storage... lkdhf hdkfhskdf hdfhlihf lidshfkhsdfl bkjhfhksjdf kkshdfkjsdhfkjdfhkjhsd kjhfdkj",
  //   tags: ["AI"],
  //   publishDate: "2024-12-01",
  //   author: {
  //     name: "John Doe",
  //     designation: "Tech Writer",
  //     image: "/images/blog/author-01.png",
  //   },
  
  // },
  // {
  //   id: 9,
  //   image: "/moreadd-2.jpg",
  //   title:"hhhhhhhhhhhhhhhhhhh",
  //   paragraph: "Cloud computing has revolutionized data storage... lkdhf hdkfhskdf hdfhlihf lidshfkhsdfl bkjhfhksjdf kkshdfkjsdhfkjdfhkjhsd kjhfdkj",
  //   tags: ["AI"],
  //   publishDate: "2024-12-01",
  //   author: {
  //     name: "John Doe",
  //     designation: "Tech Writer",
  //     image: "/images/blog/author-01.png",
  //   },
  
  // },
  // {
  //   id: 10,
  //   image: "/moreadd-2.jpg",
  //   title:"hhhhhhhhhhhhhhhhhhh",
  //   paragraph: "Cloud computing has revolutionized data storage... lkdhf hdkfhskdf hdfhlihf lidshfkhsdfl bkjhfhksjdf kkshdfkjsdhfkjdfhkjhsd kjhfdkj",
  //   tags: ["AI"],
  //   publishDate: "2024-12-01",
  //   author: {
  //     name: "John Doe",
  //     designation: "Tech Writer",
  //     image: "/images/blog/author-01.png",
  //   },
  
  // },
  // {
  //   id: 11,
  //   image: "/moreadd-2.jpg",
  //   title:"hhhhhhhhhhhhhhhhhhh",
  //   paragraph: "Cloud computing has revolutionized data storage... lkdhf hdkfhskdf hdfhlihf lidshfkhsdfl bkjhfhksjdf kkshdfkjsdhfkjdfhkjhsd kjhfdkj",
  //   tags: ["AI"],
  //   publishDate: "2024-12-01",
  //   author: {
  //     name: "John Doe",
  //     designation: "Tech Writer",
  //     image: "/images/blog/author-01.png",
  //   },
  
  // },
  // {
  //   id: 12,
  //   image: "/moreadd-2.jpg",
  //   title:"hhhhhhhhhhhhhhhhhhh",
  //   paragraph: "Cloud computing has revolutionized data storage... lkdhf hdkfhskdf hdfhlihf lidshfkhsdfl bkjhfhksjdf kkshdfkjsdhfkjdfhkjhsd kjhfdkj",
  //   tags: ["AI"],
  //   publishDate: "2024-12-01",
  //   author: {
  //     name: "John Doe",
  //     designation: "Tech Writer",
  //     image: "/images/blog/author-01.png",
  //   },
  
  // },
  // {
  //   id: 13,
  //   image: "/moreadd-2.jpg",
  //   title:"hhhhhhhhhhhhhhhhhhh",
  //   paragraph: "Cloud computing has revolutionized data storage... lkdhf hdkfhskdf hdfhlihf lidshfkhsdfl bkjhfhksjdf kkshdfkjsdhfkjdfhkjhsd kjhfdkj",
  //   tags: ["AI"],
  //   publishDate: "2024-12-01",
  //   author: {
  //     name: "John Doe",
  //     designation: "Tech Writer",
  //     image: "/images/blog/author-01.png",
  //   },
  
  // },
];

export default blogData;
