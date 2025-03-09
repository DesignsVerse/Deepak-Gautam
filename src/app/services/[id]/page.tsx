'use client';

import Image from 'next/image'
import data from '@/app/kaal-sarp-dosh/data';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default function ServicePage({ params }) {
    const postId = Number(params.id);
    const post = data.find((item) => item.id === postId);

    if (!post) {
        return notFound();
    }

    return (
        <section className="container mx-auto p-4 md:p-8 flex flex-col md:flex-row gap-8">
            {/* Main Content */}
            <article className="md:w-3/4">
                <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
                <Image
                    src={post.image}
                    alt={post.title}
                    width={800}
                    height={400}
                    className="rounded-lg"
                />
                <p className="mt-4 text-lg">{post.paragraph}</p>

                {/* Dynamic Sections */}
                {Array.isArray(post.sections) && post.sections.length > 0 && (
                    <div className="mt-6">
                        {post.sections.map((section, index) => (
                            <div key={index} className="mb-6">
                                <h2 className="text-2xl font-semibold mb-2">{section.heading}</h2>
                                <p>{section.content}</p>
                            </div>
                        ))}
                    </div>
                )}
            </article>

            {/* Sidebar */}
            <aside className="md:w-1/4 bg-gray-100 p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Other Services</h3>
                <ul>
                    {data.map((demo) => (
                        <li key={demo.id} className="mb-2">
                            <Link href={`/kaal-sarp-dosh/${demo.id}`} className="text-blue-600 hover:underline">
                                {demo.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </aside>
        </section>
    );
}
