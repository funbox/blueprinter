import SandboxSection from 'sandbox/components/sandbox-section';
import SandboxDemo from 'sandbox/components/sandbox-demo';
import SandboxParagraph from 'sandbox/components/sandbox-paragraph';
import Button from 'sandbox/components/button';

import RawContent from 'app/components/raw-content';
import Page from 'app/components/page';
import ResourceGroupSection from 'app/components/resource-group-section';

import MainContent from 'app/components/main-content';
import Resource from 'app/components/resource';
import Parameters from 'app/components/parameters';
import ActionCard from 'app/components/action-card';
import MessageCard from 'app/components/message-card';

import resource, { resourceWithNote } from 'app/mocks/resource';
import group from 'app/mocks/resource-group';
import hrefVariables from 'app/mocks/hrefVariables';
import message from 'app/mocks/message';

const httpMethods = ['delete', 'get', 'head', 'options', 'patch', 'post', 'put'];

export default class SandboxContentSection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      actionCardMethod: 'delete',
    };
  }

  render() {
    return (
      <div>
        <h2>Typography</h2>

        <SandboxSection id="raw-content" title="Content area">
          <SandboxParagraph>
            Styles of content area are styles for raw HTML markup localized inside of raw content container
            to prevent conflicts with interface styles.
          </SandboxParagraph>

          <SandboxDemo mods={{ for: 'typography' }}>
            <RawContent>
              <h1>Example of h1 heading / API Title</h1>

              <h2>Title h2 / Subtitle</h2>

              <h3>Title h3 / Heading level 3</h3>

              <p>Simple paragraph.</p>
              <p>Another paragraph.</p>

              <p><a href="#nowhere">Link</a></p>

              <p><em>Cursive font</em></p>

              <p><strong>Bold font</strong></p>

              <ul>
                <li>Elements</li>
                <li>of unordered</li>
                <li>list</li>
              </ul>

              <ol>
                <li>Elements</li>
                <li>of ordered</li>
                <li>list</li>
              </ol>

              <blockquote>
                <p>Place your quote here</p>
              </blockquote>

              <p>Inline code: <code>_session_id: 5262d64b892e8d4341000001</code></p>

              <p>Code block:</p>
              <pre>
                <code>Foo bar baz</code>
              </pre>

              <p>Simple table:</p>
              <table>
                <thead>
                  <tr>
                    <th>Header 1</th>
                    <th>Header 2</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Data 1</td>
                    <td>Data 2</td>
                  </tr>
                  <tr>
                    <td>Data 3</td>
                    <td>Data 4</td>
                  </tr>
                  <tr>
                    <td>Data 5</td>
                    <td>Data 6</td>
                  </tr>
                </tbody>
              </table>

            </RawContent>
          </SandboxDemo>
        </SandboxSection>

        <h1>Content</h1>

        <SandboxSection id="resource-group-section" title="Resource group block">
          <SandboxDemo>
            <ResourceGroupSection
              location={{ pathname: '/group-zony' }}
              group={group[0]}
            />
          </SandboxDemo>
        </SandboxSection>

        <SandboxSection id="main-content" title="Main content block">
          <SandboxDemo>
            <Page>
              <MainContent
                title="API Blueprint"
                description={<p>API documentation for project &quot;New project&quot;</p>}
              >
                <ResourceGroupSection
                  location={{ pathname: '/group-zony' }}
                  group={group[0]}
                />
              </MainContent>
            </Page>
          </SandboxDemo>
        </SandboxSection>

        <SandboxSection id="resource" title="Resource block">
          <SandboxDemo>
            <Resource
              location={{ pathname: '/group-zony' }}
              resource={resource}
              parentHash=""
            />
          </SandboxDemo>
        </SandboxSection>

        <SandboxSection id="parameters" title="Parameters block">
          <SandboxDemo>
            <Parameters params={hrefVariables}/>
          </SandboxDemo>
        </SandboxSection>

        <SandboxSection id="action" title="Action block">
          <SandboxDemo mods={{ for: 'action-toggle' }}>
            {httpMethods.map(method => (
              <Button
                key={`action-button-${method}`}
                mods={{ theme: 'sandbox' }}
                onClick={() => { this.setState({ actionCardMethod: method }); }}
              >
                {method.toUpperCase()}
              </Button>
            ))}
          </SandboxDemo>

          <SandboxDemo>
            <ActionCard
              method={this.state.actionCardMethod}
              action={resource.content[1]}
              location={{ pathname: '/group-zony' }}
              parentHash=""
            />
          </SandboxDemo>
        </SandboxSection>

        <SandboxSection id="message" title="Message block">
          <SandboxDemo>
            <MessageCard
              location={{ pathname: '/group-zony' }}
              parentHash=""
              message={message}
            />
          </SandboxDemo>
        </SandboxSection>

        <SandboxSection id="note-warning-sections" title="Note and Warning sections">
          <SandboxDemo>
            <Resource
              location={{ pathname: '/group-zony' }}
              resource={resourceWithNote}
              parentHash=""
            />
          </SandboxDemo>
        </SandboxSection>
      </div>
    );
  }
}
