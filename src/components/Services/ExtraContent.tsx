import extraData from "@/data/extraContent.json";

export default function ExtraContent({ serviceId }) {
  const extraContent = extraData.find((item) => item.id === serviceId);

  if (!extraContent) return null;

  return (
    <section className="mt-10 p-6 border rounded-lg shadow-md">
      <h1 className="text-3xl font-bold">{extraContent.title}</h1>
      <p className="mt-2">{extraContent.content}</p>
    </section>
  );
}
