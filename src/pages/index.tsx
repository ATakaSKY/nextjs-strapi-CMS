import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export const getStaticProps = async () => {
  try {
    const resulting = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/blogs`
    );
    console.log("res", resulting);
    const result = await resulting.json();
    return {
      props: {
        result: result.data,
      },
    };
  } catch (error) {
    console.log(error);

    return {
      props: {
        images: null,
        result: [],
      },
    };
  }
};

// export const getStaticProps = async () => {
//   const resulting = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/blogs`);
//   const result = await resulting.json();
//   return {
//     props: {
//       result: result.data,
//     },
//   };
// };

export default function Home({ images, result }) {
  console.log(result);

  return (
    <>
      <Head>
        <title>thisBlog</title>
        <meta title="description" content="This is an example of our blog" />
      </Head>
      <div className={styles.container}>
        <h1>Blog Post Links:</h1>
        <div className={styles.card}>
          {result.map((result) => {
            return (
              <div className={styles.flexing} key={result.id}>
                <Link href={`/blogs/${result.id}`}>
                  <Image
                    src={
                      result?.attributes?.imageUrl ??
                      "https://place-hold.it/300"
                    }
                    alt="blog-post"
                    priority={true}
                    className="rounded-full"
                    width={300}
                    height={300}
                  />
                  <h2>{result.attributes.title}</h2>
                  <div>
                    <p>{result.attributes.description}</p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
