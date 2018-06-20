import SandboxSection from 'sandbox/components/sandbox-section';

export default class SandboxButtons extends React.Component {
  render() {
    return (
      <div>
        <h1>Кнопки</h1>
        <SandboxSection id="demo" title="Демонстрация">
          <p>Здесь будет демо кнопок.</p>
        </SandboxSection>
      </div>
    );
  }
}
