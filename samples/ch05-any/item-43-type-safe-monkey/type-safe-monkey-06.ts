interface MonkeyDocument extends Document {
  /** Genus or species of monkey patch */
  monkey: string;
}

(document as MonkeyDocument).monkey = 'Macaque';
