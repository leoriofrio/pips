
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Proform } from '../../../app.keys';

export const FIELDS: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'display-flex',
      fieldGroup: [
        {
          className: 'flex-1',
          type: 'input',
          key: Proform.ID.prop,
          templateOptions: {
            label: Proform.ID.name,
            required: true
          }
        },
        {
          className: 'flex-1',
          type: 'input',
          key: Proform.USER_ID.prop,
          templateOptions: {
            label: Proform.USER_ID.name,
            required: true
          }
        }
      ]
    }
  ];
