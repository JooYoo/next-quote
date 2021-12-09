import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import styleModule from '../../styles/BookDetail.module.scss';
import React, { useEffect, useState } from 'react';
import { ChevronUpIcon } from '@heroicons/react/outline';

const BookPage = ({ frontmatter, slug, content }: any) => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    // Button is displayed after scrolling for 500 pixels
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <div className="p-10">
      <div className="mb-10">
        <h3 className="text-center font-black text-3xl">{frontmatter.title}</h3>
        <h4 className="text-center font-bold text-lg mb-3">
          {frontmatter.subtitle}
        </h4>
        <div className="text-center">{frontmatter.author}</div>
      </div>
      <hr className="mb-10" />

      <div
        className={styleModule.chapter}
        dangerouslySetInnerHTML={{ __html: marked(content) }}
      ></div>

      {isVisible && (
        <ChevronUpIcon
          className="fixed bottom-5 right-5 cursor-pointer w-10 h-10"
          role="button"
          onClick={scrollToTop}
        />
      )}
    </div>
  );
};

export default BookPage;

export async function getStaticPaths() {
  // get .md file-names with extension
  const files = fs.readdirSync(path.join('data/books'));

  // get slug list
  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace('.md', ''),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }: any) {
  // get everything in a md file
  const mdWithMeta = fs.readFileSync(
    path.join('data/books', slug + '.md'),
    'utf-8'
  );

  // structure md into obj
  const { data: frontmatter, content } = matter(mdWithMeta);

  return {
    props: {
      slug,
      frontmatter,
      content,
    },
  };
}
