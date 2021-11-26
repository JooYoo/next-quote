import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { InferGetStaticPropsType } from 'next';
import Image from 'next/image';

const Books = ({ books }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className="p-10">
      <h3 className="text-4xl font-extralight">Books</h3>

      <div className="mt-10 mb-5">
        <hr className="border-gray-800" />
        <h4 className="mt-5 text-xl font-medium text-left">2021</h4>
      </div>
      <div className="flex justify-left">
        {books.map((book) => (
          <li className="flex flex-col list-none mr-5" key={book.slug}>
            <Image
              src={`/img/covers/${book.slug}.jpg`}
              width="120"
              height="160"
              className="rounded-md"
            />
            {/* {book.frontmatter.readYear}・ */}
            <span className="mt-2 w-28 text-sm font-extralight">
              {book.frontmatter.title}
            </span>
          </li>
        ))}
      </div>
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
