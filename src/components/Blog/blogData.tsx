import { Blog } from "@/types/blog";

const blogData: Blog[] = [
  {
    id: 1,
    image: "/images/blog/blog-1.jpg",
    title: "मां बगलामुखी मंदिर, नलखेड़ा: चमत्कारी शक्ति और आस्था का केंद्र",
    paragraph: "मध्यप्रदेश के आगर मालवा जिले के नलखेड़ा में स्थित मां बगलामुखी मंदिर शक्ति उपासकों के लिए एक पवित्र स्थल है।",
    tags: ["Spiritual", "Temple"],
    publishDate: "February 12, 2025",
    author: {
      name: "पंडित नंदकिशोर जोशी",
      designation: "Spiritual Writer",
      image: "/images/blog/blog-1.jpg",
    },
  },
  {
    id: 2,
    image: "/images/blog/blog-2.jpg",
    title: "श्मशान में है यह प्रसिद्ध मंदिर, प्रदेश के आगर",
    paragraph: "माता बगलामुखी का यह मंदिर मध्य प्रदेश के आगर मालवा जिले के नलखेड़ा कस्बे में लखुन्दर नदी के किनारे स्थित है।",
    tags: ["Spiritual", "Mythology"],
    publishDate: "December 01, 2024",
    author: {
      name: "पंडित नंदकिशोर जोशी",
      designation: "Spiritual Writer",
      image: "/images/blog/blog-2.jpg",
    },
  },
  {
    id: 3,
    image: "/images/blog/blog-3.jpg",
    title: "हिमाचल के इस मंदिर में होते हैं धर्मशाला, जागरण संवाददाता।",
    paragraph: "धर्मशाला, जागरण संवाददाता। Kangra Famous Temple Baglamukhi Mata...",
    tags: ["Temple", "Himalaya"],
    publishDate: "December 01, 2024",
    author: {
      name: "John Doe",
      designation: "Tech Writer",
      image: "/images/blog/author-01.png",
    },
  },
];

export default blogData;
