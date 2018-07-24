import Introduction from '../components/Introduction.jsx';
import fullName from '../definitions/fullName';
import { address } from '../definitions/address';

import fullNameUI from 'us-forms-system/lib/js/definitions/fullName';
import ssn from 'us-forms-system/lib/js/definitions/ssn';
import { schema as addressSchema, uiSchema as addressUI } from 'us-forms-system/lib/js/definitions/address';

const formConfig = {
  title: 'Request for Transcript of Tax Return',
  subTitle: 'Form 4506-T',
  formId: '',
  urlPrefix: '/',
  trackingPrefix: 'form-',
  transformForSubmit: '',
  submitUrl: '',
  introduction: Introduction,
  confirmation: '',
  defaultDefinitions: {
    fullName
  },
  chapters: {
    firstSection: {
      title: 'Personal Information',
      pages: {
        firstPerson: {
          path: 'personal-information/first-person',
          title: 'First Page',
          uiSchema: {
            firstFullName: Object.assign({}, fullNameUI, {
              'ui:title': 'Enter the name shown on your tax return.'
            }),
            firstSSN: ssn,
            'view:isJointReturn': {
              'ui:title': 'Did you file a joint return?',
              'ui:widget': 'yesNo'
            }
          },
          schema: {
            type: 'object',
            required: ['firstFullName', 'firstSSN'],
            properties: {
              firstFullName: fullName,
              firstSSN: {
                type: 'string',
                pattern: '^[0-9]{9}$'
              },
              'view:isJointReturn': {
                type: 'boolean'
              }
            }
          }
        },
        secondPerson: {
          path: 'personal-information/second-person',
          title: 'Second Person',
          depends: (formData) => formData['view:isJointReturn'],
          uiSchema: {
            secondFullName: Object.assign({}, fullNameUI, {
              'ui:title': 'Enter the second name shown on the joint return.',
            }),
            secondSSN: Object.assign({}, ssn, {
              'ui:title': 'Enter the second Social Security number on the joint return'
            })
          },
          schema: {
            type: 'object',
            properties: {
              secondFullName: fullName,
              secondSSN: {
                type: 'string',
                pattern: '^[0-9]{9}$'
              }
            }
          }
        },
        currentAddress: {
          path: 'personal-information/current-address',
          title: 'Current Address',
          uiSchema: {
            currentAddress: addressUI('Current address'),
          },
          schema: {
            type: 'object',
            properties: {
              currentAddress: addressSchema(address, true)
            }
          }
        },
        previousAddress: {
          path: 'personal-information/previous-address',
          title: 'Previous Address',
          uiSchema: {
            sameAddress: {
              'ui:title': 'Is your current address the same as the address on your last tax return?',
              'ui:widget': 'yesNo'
            },
            'view:previousAddressInformation': {
              'ui:options': {
                expandUnder: 'sameAddress',
                expandUnderCondition: false
              },
              previousAddress: addressUI('Previous address', false, (formData) => formData.sameAddress === false)
            }
          },
          schema: {
            type: 'object',
            properties: {
              sameAddress: {
                type: 'boolean'
              },
              'view:previousAddressInformation': {
                type: 'object',
                properties: {
                  previousAddress: addressSchema(address, true)
                }
              }
            }
          }
        }
      }
    },
    secondSection: {
      title: 'Third Party Information',
      pages: {

      }
    }
  }
};

export default formConfig;
