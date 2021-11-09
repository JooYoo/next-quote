const Quote = ({ rdmQuote, rdmHighlight }: any) => {
  return (
    <div className="text-left p-5 border-2 border-gray-400 rounded-md shadow-md">
      <div className="text-xl mb-3">{rdmHighlight}</div>
      <div className="text-sm text-left text-gray-400">
        ⌈ {rdmQuote.book} ⌋ • {rdmQuote.chapter}
      </div>
    </div>
  );
};

export default Quote;
