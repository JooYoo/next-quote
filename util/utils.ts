
   /* -------------------------------- get quote ------------------------------- */
   
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
  export const getQuotes = (title: string, content: string) => {
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

  /* ---------------------------- random highlight ---------------------------- */
  
  // get random book index
  export function getRdmInt(max: number) {
    return Math.floor(Math.random() * max);
  }
