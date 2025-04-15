declare module 'pdf-parse/lib/pdf-parse.js' {
    const pdfParse: (buffer: Buffer, options?: any) => Promise<{ text: string }>;
    export default pdfParse;
  }