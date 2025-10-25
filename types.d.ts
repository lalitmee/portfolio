declare module 'react-typist' {
  import * as React from 'react';

  interface TypistProps {
    startDelay?: number;
    children: React.ReactNode;
  }

  interface DelayProps {
    ms: number;
  }

  interface BackSpaceProps {
    count: number;
  }

  class Typist extends React.Component<TypistProps> {}
  class Delay extends React.Component<DelayProps> {}
  class Backspace extends React.Component<BackSpaceProps> {}

  namespace Typist {
    export { Delay, Backspace };
  }

  export default Typist;
}

declare module 'react-typist-loop' {
  import * as React from 'react';

  interface TypistLoopProps {
    interval?: number;
    children: React.ReactNode;
  }

  const TypistLoop: React.ComponentType<TypistLoopProps>;
  export default TypistLoop;
}
