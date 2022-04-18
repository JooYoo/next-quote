import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.scss';
import Quote from '../components/Quote';
import { displayRdm } from '../util/utils';
import { useEffect, useState } from 'react';
import ThemeToggle from '../components/ThemeToggle';
import useGlobalShortcut from '../hooks/useGlobalShortcut';

export default function Home({
  books,
  rdmQuote,
  rdmHighlight,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [rQuote, setRQuote] = useState(rdmQuote);
  const [rHighlight, setRHighlight] = useState(rdmHighlight);

  useEffect(() => {
    // get init rdm
    updateRdm();
  }, []);

  // press Space to update Quote
  useGlobalShortcut({
    keyup(ev: any) {
      if (ev.key === ' ') {
        updateRdm();
      }
    },
  });

  // update state: rdmHighlight
  const updateRdm = () => {
    // get target book
    let targetBook = displayRdm(books)

    // get rdm-quote
    setRQuote(targetBook.rdmQuote);
    setRHighlight(targetBook.rdmHighlight);
  };

  return (
    <div className="flex justify-center items-center flex-grow ">
      <Head>
        <title>Quote</title>
        <meta
          name="description"
          content="A web app to present quotes randomly from the books, which I have read."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="mx-10">
          <Quote rdmHighlight={rHighlight} rdmQuote={rQuote} />
        </div>

        <button
          className="absolute right-10 bottom-6 text-6xl transform transition-all duration-300 hover:scale-95 active:rotate-270"
          onClick={updateRdm}
        >
          🎲
        </button>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  // get md-fileName and extensions
  // ["booka.md", "bookb.md"]
  const files = fs.readdirSync(path.join('data/books'));

  // get file names without extension
  const books = files.map((fileName) => {
    // create slug: file-name without extension
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

  // get target, only create one instance for rdmQuote and rdmHighlight
  let targetBook = displayRdm(books)

  return {
    props: {
      books,
      rdmQuote: targetBook.rdmQuote,
      rdmHighlight: targetBook.rdmHighlight,
    },
  };
}
