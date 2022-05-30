import SandboxSection from 'sandbox/components/sandbox-section';
import SandboxDemo from 'sandbox/components/sandbox-demo';
import SideMenu from 'app/components/side-menu';

import group from 'app/mocks/resource-group';

export default class SandboxSideMenu extends React.Component {
  render() {
    return (
      <div>
        <h2>Side menu</h2>

        <SandboxSection id="side-menu">
          <SandboxDemo mods={{ for: 'side-menu' }}>
            <SideMenu data={group}/>
          </SandboxDemo>
        </SandboxSection>
      </div>
    );
  }
}
