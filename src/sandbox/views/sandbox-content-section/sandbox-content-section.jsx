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

import resource from 'app/mocks/resource';
import group from 'app/mocks/resource-group';
import hrefVariables from 'app/mocks/hrefVariables';

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
        <h1>Типографика</h1>

        <SandboxSection id="raw-content" title="Контентная область">
          <SandboxParagraph>
            Стили контентной области — стили на простую html-разметку, локализованные внутри контейнера контентной
            области, чтобы избежать конфликтов со стилями интерфейса.
          </SandboxParagraph>

          <SandboxDemo mods={{ for: 'typography' }}>
            <RawContent>
              <h1>Пример заголовка уровня 1 / API Title</h1>

              <h2>Заголовок h2 / Subtitle</h2>

              <h3>Заголовок h3 / Heading level 3</h3>

              <p>Простой параграф с текстом.</p>
              <p>Еще один параграф.</p>

              <p><a href="#nowhere">Ссылка</a></p>

              <p><em>Наклонный шрифт текста</em></p>

              <p><strong>Жирный шрифт текста</strong></p>

              <ul>
                <li>Элементы</li>
                <li>неупорядоченного</li>
                <li>списка</li>
              </ul>

              <ol>
                <li>Элементы</li>
                <li>упорядоченного</li>
                <li>списка</li>
              </ol>

              <blockquote>
                <p>Здесь могла быть ваша цитата</p>
              </blockquote>

              <p>Инлайн-код: <code>_session_id: 5262d64b892e8d4341000001</code></p>

              <p>Блок кода:</p>
              <pre>
                <code>Foo bar baz</code>
              </pre>

              <p>Простая таблица:</p>
              <table>
                <thead>
                  <tr>
                    <th>Заголовок 1</th>
                    <th>Заголовок 2</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Значение 1</td>
                    <td>Значение 2</td>
                  </tr>
                  <tr>
                    <td>Значение 3</td>
                    <td>Значение 4</td>
                  </tr>
                  <tr>
                    <td>Значение 5</td>
                    <td>Значение 6</td>
                  </tr>
                </tbody>
              </table>

            </RawContent>
          </SandboxDemo>
        </SandboxSection>

        <h1>Контент</h1>

        <SandboxSection id="resource-group-section" title="Блок Resource group">
          <SandboxDemo>
            <ResourceGroupSection group={group[0]}/>
          </SandboxDemo>
        </SandboxSection>

        <SandboxSection id="main-content" title="Блок основного контента страницы">
          <SandboxDemo>
            <Page>
              <MainContent
                title="API Blueprint"
                description={
                  <p>Документация API проекта «Новый проект»</p>
                }
              >
                <ResourceGroupSection group={group[0]}/>
              </MainContent>
            </Page>
          </SandboxDemo>
        </SandboxSection>

        <SandboxSection id="resource" title="Блок Resource">
          <SandboxDemo>
            <Resource resource={resource} />
          </SandboxDemo>
        </SandboxSection>

        <SandboxSection id="parameters" title="Блок параметров">
          <SandboxDemo>
            <Parameters params={hrefVariables.content} />
          </SandboxDemo>
        </SandboxSection>

        <SandboxSection id="action" title="Блок Action">
          <SandboxDemo
            mods={{ for: 'action-toggle' }}
          >
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
              action={resource.content[0]}
            >
              <Parameters params={hrefVariables.content}/>
            </ActionCard>
          </SandboxDemo>
        </SandboxSection>
      </div>
    );
  }
}
