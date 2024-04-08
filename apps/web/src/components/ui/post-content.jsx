
import React from "react";
import Markdown from "react-markdown";
import remarkGfm from 'remark-gfm'



const PostContent = ({ content }) => {
  return (
    <article className="mdx [&_:is(ol,ul)]:list-disc [&_:a]:text-primary [&_:is(ol,ul)]:pl-4">
      {/* @ts-ignore */}
      <Markdown
      remarkPlugins={[remarkGfm]}
        // eslint-disable-next-line react/no-children-prop
    >
        {content}
    </Markdown>

    </article>
  );
};

export default PostContent;