import { Publisher } from "../publisher/publisher";

export interface Stock {
    idBook: number;
    bookName: string;
    idPublisher: Publisher; 
    category: Category | string;
    publicationDate: Date;
    amount: number;
    amountInLibrary: number;
    img: string;
    description?: string; // Nullable property
    price?: number;
    isStar: boolean; // Nullable property
  }
  
  export enum Category {
    PHILOSOPHY,
    PSYCHOANALYSIS,

    philosophy,
    psychology,
    Children,
    Tension,
    Judaism,
    psychoanalyst
  }
  
