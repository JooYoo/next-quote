import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { InferGetStaticPropsType } from 'next';
import Image from 'next/image';

const Books = ({
  books,
  groupedBooks,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className="p-10">
      <h3 className="text-4xl font-extralight">Books</h3>

      <div>
        {groupedBooks.map((group, i) => (
          <div key={i}>
            <div className="mt-10 mb-5">
              <hr className="border-gray-800" />
              <h4 className="mt-5 text-xl font-medium text-left">
                {group[0].readYear}
              </h4>
            </div>

            <div className="flex justify-left">
              {group.map((bookInfo: any) => (
                <li
                  className="flex flex-col list-none mr-5"
                  key={bookInfo.title}
                >
                  <Image
                    src={`/img/covers/${bookInfo.slug}.jpg`}
                    width="100"
                    height="160"
                    className="rounded-md"
                  />

                  <span className="mt-2 w-28 text-sm font-extralight">
                    {bookInfo.title}
                  </span>
                </li>
              ))}
            </div>
          </div>
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

  /* ------------- group data to key-value-pairs based on readYear ------------ */

  // get only frontmatters
  const rawGroupedBookInfo: any = [];
  books.forEach((book) => {
    rawGroupedBookInfo.push(book.frontmatter);
  });

  // group array by read-year to key-value-pair
  function groupBy(arr: any, property: any) {
    return arr.reduce(function (memo: any, x: any) {
      if (!memo[x[property]]) {
        memo[x[property]] = [];
      }
      memo[x[property]].push(x);
      return memo;
    }, {});
  }
  // convert key-value-pair to array
  const groupedBooks: any[] = Object.values(
    groupBy(rawGroupedBookInfo, 'readYear')
  );

  return {
    props: {
      books,
      groupedBooks,
    },
  };
}
