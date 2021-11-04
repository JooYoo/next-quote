import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Home.module.scss';

export default function Home({
  books,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Home page</h1>
        {/* TODO: remove: check gray-matter */}
        <div className="mt-4 text-blue-400">{books[0].frontmatter.title}</div>
        <div>{books[0].slug}</div>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  // get data
  const files = fs.readdirSync(path.join('data/books'));

  // get file names without extension
  const books = files.map((fileName) => {
    // create slug
    const slug = fileName.replace('.md', '');

    // get frontmatter
    const markdownWithMeta = fs.readFileSync(
      path.join('data/books', fileName),
      'utf-8'
    );

    // get md
    const { data: frontmatter, content } = matter(markdownWithMeta);

    return {
      slug,
      frontmatter,
      content,
    };
  });

  /* -------------------------------------------------------------------------- */
  /*                                  get quote                                 */
  /* -------------------------------------------------------------------------- */

  // 🚩 get chapters & highlights
  const getChaptersHighlights = (content: string) => {
    // split by `\n`; remove empty elements;
    const txts = content.split('\n').filter((n) => n);

    // get chapters & highlights
    const chapters: string[] = [];
    const highlights: any[] = [];
    let i = -1;

    txts.forEach((txt) => {
      if (txt[0] === '*') {
        // chapters: remove *
        const pureTxt = txt.split('*').join('');
        chapters.push(pureTxt);
        // highlights
        i++;
        highlights.push([] as any);
      } else {
        highlights[i].push(txt);
      }
    });

    return [chapters, highlights];
  };

  // 🚩 combine chapter and highlights; get obj via chapters
  const getQuotes = (title: string, content: string) => {
    // get chapters and highlights
    const chaptersHighlights = getChaptersHighlights(content);
    const chapters = chaptersHighlights[0];
    const highlights = chaptersHighlights[1];

    // chapters & highlights => quotes
    const res = [];
    for (let i = 0; i < chapters.length; i++) {
      const newObj = {
        book: title,
        chapter: chapters[i],
        highlights: highlights[i],
      };
      res.push(newObj);
    }

    return res;
  };

  /* -------------------------------------------------------------------------- */
  /*                                random quote                                */
  /* -------------------------------------------------------------------------- */

  // get random book index
  function getRdmInt(max: number) {
    return Math.floor(Math.random() * max);
  }
  const booksLength: number = books.length;
  const rdmBookInx: number = getRdmInt(booksLength);

  // get rdmBook quotes
  const quotes: any = getQuotes(
    books[rdmBookInx].frontmatter.title,
    books[rdmBookInx].content
  );

  // TODO: get rdmChapterQuote

  // TODO: get rdmHighlight
  console.log(quotes.length);
  console.log(quotes[1]);

  return {
    props: {
      books,
    },
  };
}
