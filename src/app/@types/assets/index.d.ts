declare module '*.svg' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  import React, { FC, SVGProps } from 'react';
  const ReactComponent: FC<SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}
declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.json' {
  const content: string;
  export default content;
}
declare module '*.config' {
  const content: string;
  export default content;
}
