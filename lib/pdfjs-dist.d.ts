// lib/pdfjs-dist.d.ts

declare module "pdfjs-dist/build/pdf" {
  export interface PDFDocumentProxy {
    numPages: number;
    getPage(pageNumber: number): Promise<PDFPageProxy>;
  }
  export interface PDFPageProxy {
    getTextContent(): Promise<{
      items: { str: string }[];
    }>;
  }
  export interface GlobalWorkerOptionsType {
    workerSrc: string;
  }
  export let GlobalWorkerOptions: GlobalWorkerOptionsType;
  export function getDocument(params: { data: ArrayBuffer }): {
    promise: Promise<PDFDocumentProxy>;
  };
}
