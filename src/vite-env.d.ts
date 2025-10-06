/// <reference types="vite/client" />

// SVG module declarations
declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.svg?react' {
  import { FunctionComponent, SVGProps } from 'react';
  const content: FunctionComponent<SVGProps<SVGSVGElement>>;
  export default content;
}

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
