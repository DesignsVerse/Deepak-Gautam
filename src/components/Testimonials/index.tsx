"use client";
import Image from "next/image";
import SectionTitle from "../Common/SectionTitle";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const testimonialData = [
  {
    id: 1,
    name: " राज पटेल",
    content:
      "\"मैंने माँ बगलामुखी मंदिर में शत्रु बाधा निवारण पूजा करवाई और कुछ ही समय में सकारात्मक बदलाव देखने को मिले। जीवन की परेशानियाँ कम हुईं और मानसिक शांति प्राप्त हुई। पंडित नंदकिशोर जोशी जी का मार्गदर्शन बहुत उपयोगी रहा।\"",
    image: "/images/testimonials/testmonial-1.jpg",
  },
  {
    id: 2,
    name: "आनंद किशोर",
    content:
      "\"व्यापार में लगातार नुकसान हो रहा था, लेकिन माँ बगलामुखी की विशेष पूजा के बाद आर्थिक स्थिति में सुधार हुआ। अब व्यवसाय बढ़ रहा है और सभी अड़चनें दूर हो गई हैं। जोशी जी का आभार।\"",
    image: "/images/testimonials/testmonial-2.jpg",
  },
  {
    id: 3,
    name: "राजेश शर्मा",
    content:
      "\"कोर्ट केस में सालों से फंसा था, लेकिन माँ बगलामुखी की पूजा के बाद फैसला मेरे पक्ष में आया। यह सच में एक चमत्कार से कम नहीं था। अब मैं पहले से ज्यादा आत्मविश्वास से भर गया हूँ।\"",
    image: "/images/testimonials/testmonial-3.jpg",
  },
];

const Testimonials = () => {
  const router = useRouter();

  return (
    <section className="text-center py-12 bg-[#F9FAFB] text-gray-800">
      <SectionTitle 
        title="ग्राहक प्रशंसापत्र"
        paragraph="हमारे संतुष्ट ग्राहक अपनी सफलता की कहानियाँ साझा करते हैं!"
        center
      />

      <div className="mt-6 flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-8">
        {testimonialData.map((testimonial) => (
          <motion.div 
            key={testimonial.id} 
            className="max-w-md text-center bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative mx-auto w-[180px] h-[180px] rounded-full overflow-hidden border-4 border-yellow-500">
              <Image src={testimonial.image} alt={`Portrait of ${testimonial.name}`} width={180} height={180} priority />
            </div>
            <p className="mt-4 text-lg text-gray-600 italic">{testimonial.content}</p>
            <p className="mt-4 text-xl font-bold text-gray-800">{testimonial.name}</p>
          </motion.div>
        ))}
      </div>
      
      <div className="container mx-auto px-6 md:px-12 lg:px-20 py-20 flex flex-col md:flex-row items-center gap-10 mt-12">
        <motion.div className="md:w-1/2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <Image
            src="/images/addextra-1.jpeg"
            alt="Close-up of a deity's eyes with intricate decorations"
            width={600}
            height={400}
            className="rounded-lg shadow-lg"
            priority
          />
        </motion.div>
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">
            पवित्रता और श्रद्धा के साथ सभी प्रकार की बगलामुखी पूजा और अनुष्ठान सेवाएं।
          </h1>
          <p className="mt-6 text-gray-700 text-lg leading-relaxed">
            देवी की तपस्या हमारे जीवन का सार है। समाज सेवा की भावना के साथ, हमने बगलामुखी की पूजा के माध्यम से जीवन की लगभग हर समस्या का समाधान खोजने की कोशिश की है।
          </p>
          <motion.button 
            className="mt-8 px-8 py-4 bg-yellow-600 text-white bg-[#d55f26] font-semibold rounded-full shadow-md hover:bg-yellow-700 transition duration-300"
            whileHover={{ scale: 1.1 }}
            onClick={() => router.push("/services")}
          >
            हमारी सेवाएं
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
