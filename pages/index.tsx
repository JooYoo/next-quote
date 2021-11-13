import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Home.module.scss';
import Quote from '../components/Quote';
import { getRdmInt, getQuotes } from '../util/utils';
import { useState } from 'react';

export default function Home({
  books,
  rdmQuote,
  rdmHighlight,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [rQuote, setRQuote] = useState(rdmQuote);
  const [rHighlight, setRHighlight] = useState(rdmHighlight);

  const displayRdm = () => {
    // FIXME: refactor
    /* ---------------------------- random highlight ---------------------------- */

    // get random book index
    const rdmBookInx: number = getRdmInt(books.length);

    // get rdmBook quotes
    const quotes: any = getQuotes(
      books[rdmBookInx].frontmatter.title,
      books[rdmBookInx].content
    );

    // get rdmChapterQuote
    const rdmQuoteInx: number = getRdmInt(quotes.length);
    const rdmQuote: any = quotes[rdmQuoteInx];

    // get rdmHighlight
    const rdmHighlightInx: number = getRdmInt(rdmQuote.highlights.length);
    const rdmHighlight: string = rdmQuote.highlights[rdmHighlightInx];

    // update state
    setRQuote(rdmQuote);
    setRHighlight(rdmHighlight);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Quote</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Quote rdmHighlight={rHighlight} rdmQuote={rQuote} />

        <button
          className="absolute right-10 bottom-10 text-6xl transform transition-all duration-300 hover:scale-95 active:rotate-270"
          onClick={displayRdm}
        >
          🎲
        </button>
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

  /* ---------------------------- random highlight ---------------------------- */

  // get random book index
  const rdmBookInx: number = getRdmInt(books.length);

  // get rdmBook quotes
  const quotes: any = getQuotes(
    books[rdmBookInx].frontmatter.title,
    books[rdmBookInx].content
  );

  // get rdmChapterQuote
  const rdmQuoteInx: number = getRdmInt(quotes.length);
  const rdmQuote: any = quotes[rdmQuoteInx];

  // get rdmHighlight
  const rdmHighlightInx: number = getRdmInt(rdmQuote.highlights.length);
  const rdmHighlight: string = rdmQuote.highlights[rdmHighlightInx];

  return {
    props: {
      books,
      rdmQuote,
      rdmHighlight,
    },
  };
}
