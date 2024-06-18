import type { MDXComponents } from 'mdx/types';
import { ReactElement, ReactNode } from 'react';

function getId(children: ReactNode): string {
  return typeof children === 'string' ? children.replace(' ', '-').toLowerCase() : getId((children as ReactElement).props.children);
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    h2: props => <h2 id={getId(props.children)} {...props} />,
    h3: props => <h3 id={getId(props.children)} {...props} />,
  };
}
