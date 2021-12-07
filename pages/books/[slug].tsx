import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

const BookPage = ({ frontmatter, slug, content }: any) => {
  return (
    <div>
      <h3>{frontmatter.title}</h3>
      <h4>{frontmatter.subtitle}</h4>
      <div dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
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
