import { useState } from 'react';
import Link from 'next/link';
import { trackEvent } from '../utils/analytics';
import { markdownExamples } from '../data/markdownExamples';

type ExampleId = (typeof markdownExamples)[number]['id'];

export default function MarkdownDemo(): React.ReactElement {
  const [selected, setSelected] = useState<ExampleId>('note');

  return (
    <section aria-labelledby="demo-title" className="demo-panel">
      <div className="demo-heading">
        <div>
          <p className="eyebrow">A small, working interaction</p>
          <h2 id="demo-title">Markdown, made tangible.</h2>
        </div>
        <Link
          className="text-link"
          href="/apps/markdown-preview/"
          onClick={() =>
            trackEvent({ event: 'app_launch', app_slug: 'markdown-previewer' })
          }
        >
          Open the full Markdown Previewer <span aria-hidden="true">↗</span>
        </Link>
      </div>
      <div className="demo-grid">
        <div>
          <div className="example-options" aria-label="Choose an example">
            {markdownExamples.map((example) => (
              <button
                key={example.id}
                type="button"
                aria-pressed={selected === example.id}
                onClick={() => setSelected(example.id)}
              >
                {example.label}
              </button>
            ))}
          </div>
          <pre className="example-source">
            <code>
              {markdownExamples.find(({ id }) => id === selected)?.source}
            </code>
          </pre>
        </div>
        <div className="example-preview" aria-live="polite">
          <p className="eyebrow">Example preview</p>
          {selected === 'note' && (
            <>
              <h3>A useful note</h3>
              <p>Small details make tools easier to use.</p>
            </>
          )}
          {selected === 'checklist' && (
            <ul>
              <li>Read the problem</li>
              <li>Make the smallest useful change</li>
              <li>Check the result</li>
            </ul>
          )}
          {selected === 'table' && (
            <table>
              <thead>
                <tr>
                  <th>Tool</th>
                  <th>Purpose</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Markdown Previewer</td>
                  <td>Read local notes</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </div>
      <p className="demo-note">
        Three fixed examples, rendered as semantic HTML—not a general Markdown
        parser.
      </p>
    </section>
  );
}
