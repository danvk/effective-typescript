function parseTaggedText(lines: string[]): string[][] {
  const currPara: readonly string[] = [];
  const paragraphs: string[][] = [];

  const addParagraph = () => {
    if (currPara.length) {
      paragraphs.push(
        currPara
     // ~~~~~~~~ Type 'readonly string[]' is 'readonly' and
     //          cannot be assigned to the mutable type 'string[]'
      );
      currPara.length = 0;  // Clear lines
            // ~~~~~~ Cannot assign to 'length' because it is a read-only 
            // property
    }
  };

  for (const line of lines) {
    if (!line) {
      addParagraph();
    } else {
      currPara.push(line);
            // ~~~~ Property 'push' does not exist on type 'readonly string[]'
    }
  }
  addParagraph();
  return paragraphs;
}
