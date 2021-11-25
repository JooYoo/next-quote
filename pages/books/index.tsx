import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { InferGetStaticPropsType } from 'next';
import Image from 'next/image';

const Books = ({ books }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div>
      <h3>Books index page</h3>
      {books.map((book) => (
        <li key={book.slug}>
          {book.frontmatter.readYear}・{book.frontmatter.title}
          <Image
            src={`/img/covers/${book.slug}.jpg`}
            width="120"
            height="160"
          />
        </li>
      ))}
    </div>
  );
};

export default Books;

export async function getStaticProps() {
  // get md data
  const files = fs.readdirSync(path.join('data/books'));

  // get file name without extension
  const books = files.map((fileName) => {
    //create slug
    const slug = fileName.replace('.md', '');

    // get md: everything
    const mdWithMeta = fs.readFileSync(
      path.join('data/books', fileName),
      'utf-8'
    );

    // get md: frontmatter + content
    const { data: frontmatter, content } = matter(mdWithMeta);

    return {
      slug,
      frontmatter,
      content,
    };
  });

  return {
    props: {
      books,
    },
  };
}
