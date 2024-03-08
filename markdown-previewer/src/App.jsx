import { useState } from "react";
import "./App.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // Import remarkGfm

const defaultMarkdown = `
# My Awesome Markdown Previewer!

## Let's Dive In...
### Here's Some Exciting Content:

Here's a simple code snippet: \`<span>Hello World!</span>\`, wrapped in backticks.

\`\`\`javascript
// Here's a multi-line code example:

function greetUser(name) {
  return \`Hello, \${name}!\`;
}

console.log(greetUser('Alice'));
\`\`\`

You can also make text **bold**... Amazing!
Or _italic_.
Or... **_both!_**

There's also a [link](https://www.example.com), and
> Block Quotes are Cool!

![Coding Image](https://cdn.freecodecamp.org/curriculum/cat-photo-app/relaxing-cat.jpg)

- And of course, there are lists.
  - Some are bulleted.
      - With different levels of indentation.
        - Like this one.

That concludes our journey into Markdown formatting. Happy coding!
`;

function App() {
  const [markdownText, setMarkdownText] = useState(defaultMarkdown);

  return (
    <>
      <div className="container">
        <h1>Markdown Previewer</h1>
        <textarea
          name="editor"
          id="editor"
          value={markdownText}
          onChange={(e) => setMarkdownText(e.target.value)}
          cols="60"
          rows="20"
        ></textarea>
        <div id="preview">
          <ReactMarkdown
            children={markdownText}
            remarkPlugins={[remarkGfm]} // Add remarkGfm as a plugin
          />
        </div>
      </div>
    </>
  );
}

export default App;
