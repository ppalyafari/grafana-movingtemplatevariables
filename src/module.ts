import { PanelPlugin } from '@grafana/data';
import { SimpleOptions } from './types';
import { SimplePanel } from './components/SimplePanel';

export const plugin = new PanelPlugin<SimpleOptions>(SimplePanel).setPanelOptions((builder) => {
  return builder
    .addTextInput({
      path: 'controlledVariable',
      name: 'Name of controlled template variable',
      description: 'Accepts only one value.',
      defaultValue: 'Variable name',
    });
});
