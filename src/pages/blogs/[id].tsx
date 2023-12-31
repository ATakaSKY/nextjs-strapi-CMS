import React from "react";
import fm from "front-matter";
import Head from "next/head";
import { marked } from "marked";
import Image from "next/image";
import styles from "../../styles/Home.module.css";

export const getStaticPaths = async () => {
  let result = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/blogs`);
  result = await result.json();
  return {
    paths: result.data.map((result) => ({
      params: { id: result.id.toString() },
    })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/blogs/${params.id}`
  );
  const markdownWithMeta = await res.json();
  const parsedMarkdown = fm(markdownWithMeta.data.attributes.draft);
  const htmlString = marked(parsedMarkdown.body);
  const image = markdownWithMeta.data.attributes.imageUrl;
  const title = markdownWithMeta.data.attributes.title;
  const description = fm(markdownWithMeta.data.attributes.description).body;

  return {
    props: {
      image,
      htmlString,
      data: parsedMarkdown.attributes,
      title,
      description,
    },
  };
};

export default function Post({ image, htmlString, title, description }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <div className={styles.post}>
        <Image
          src={image ?? "https://place-hold.it/300"}
          alt="blog-post"
          priority={true}
          className="rounded-full"
          width={600}
          height={400}
        />
        <div dangerouslySetInnerHTML={{ __html: htmlString }} />
      </div>
    </>
  );
}
