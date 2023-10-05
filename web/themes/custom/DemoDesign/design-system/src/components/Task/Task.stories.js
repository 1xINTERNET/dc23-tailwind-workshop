import { html } from 'lit-html'
import { ifDefined } from 'lit-html/directives/if-defined'

import './DcTask'

const Template = ({
  title,
  completed
}) => html`
  <dc-task title=${ifDefined(title)} ?completed=${ifDefined(completed)}>
  </dc-task>
`

export const Default = Template.bind({})
Default.args = {
  title: 'Task',
  completed: false
}

export const Completed = Template.bind({})
Completed.args = {
  title: 'Task',
  completed: true
}

export default {
  title: 'Atoms/Task',
  component: 'dc-task',
  argTypes: {
    title: {
      name: 'title',
      table: {
        category: 'attributes'
      },
      description: 'Title',
      type: {
        summary: 'string'
      },
      control: {
        type: 'text'
      }
    },
    completed: {
      name: 'completed',
      table: {
        category: 'attributes'
      },
      description: 'Completed',
      type: {
        summary: 'boolean'
      },
      control: {
        type: 'boolean'
      }
    }
  }
}
