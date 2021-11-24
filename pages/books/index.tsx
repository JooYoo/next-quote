import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { InferGetStaticPropsType } from 'next';

const Books = ({
  hello,
  books,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div>
      <div>Books index page</div>
      <div>{hello}</div>
      {books.map((book) => (
        <li key={book.slug}>{book.frontmatter.title}</li>
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
      hello: 'props from getStaticProps',
    },
  };
}
