import React, {useState} from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import { locationService, getTemplateSrv } from '@grafana/runtime';
import { Select } from "@grafana/ui";

interface Props extends PanelProps<SimpleOptions> {}

export const SimplePanel: React.FC<Props> = ({ options }) => {

  const selectedTemplateVariable = options.controlledVariable;
  const [value, setValue] = useState(getDefaultValue()); 

  const opts = getValuesForSelectedTempVariable().flatMap(variableValue => [{label: variableValue.text, value: variableValue.value}]);

  const SelectComponent = (options: any) => {
    return(
            <Select
                options={options}
                onChange={(newValue: any) => {
                  setValue(newValue);
                  locationService.partial({[`var-${selectedTemplateVariable}`]: newValue.value}, true);
                          }}
                placeholder={selectedTemplateVariable}
                value={value}
          />)
  }

  return (SelectComponent(opts));

  
  function getTemplateVariables()
  {
    return getTemplateSrv().getVariables();
  }
  

  function getValuesForSelectedTempVariable()
  {
    return getTemplateVariables()
          .filter((variable: any) => variable.name === selectedTemplateVariable)
          .flatMap((matchingVariable: any) => matchingVariable.options);
  }


  function getDefaultValue()
  {
    return getValuesForSelectedTempVariable()
          .filter((value: any) => value.selected)
          .flatMap((value: any) => [{label: value.text, value: value.value}]);
  }

  }

