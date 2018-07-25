import Introduction from '../components/Introduction.jsx';
import fullName from '../definitions/fullName';
import { address } from '../definitions/address';
import { dateSchema } from '../definitions/date';
import { ssnSchema } from '../definitions/ssn';
import { phoneSchema } from '../definitions/phone';

import fullNameUI from 'us-forms-system/lib/js/definitions/fullName';
import ssn from 'us-forms-system/lib/js/definitions/ssn';
import { schema as addressSchema, uiSchema as addressUI } from 'us-forms-system/lib/js/definitions/address';
import phoneUI from 'us-forms-system/lib/js/definitions/phone';
import dateUI from 'us-forms-system/lib/js/definitions/date';

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
              firstSSN: ssnSchema,
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
            required: ['secondFullName', 'secondSSN'],
            properties: {
              secondFullName: fullName,
              secondSSN: ssnSchema
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
        sendingInformation: {
          path: 'third-party-information/sending-information',
          title: 'Are you sending information to a third party?',
          uiSchema: {
            sendingToThirdParty: {
              'ui:title': 'Is the transcript or tax information being sent to a third party?',
              'ui:description': 'Sometimes you may need to send your tax information to a third party, such as a mortgage company.',
              'ui:widget': 'yesNo'
            },
            'view:infoForThirdParty': {
              'ui:options': {
                expandUnder: 'sendingToThirdParty'
              },
              thirdPartyName: {
                'ui:title': 'Name of third party'
              },
              thirdPartyAddress: addressUI('Third party address', false, (formData) => formData.sendingToThirdParty === true),
              thirdPartyPhone: phoneUI('Third party phone number')
            }
          },
          schema: {
            type: 'object',
            properties: {
              sendingToThirdParty: {
                type: 'boolean'
              },
              'view:infoForThirdParty': {
                type: 'object',
                properties: {
                  thirdPartyName: {
                    type: 'string'
                  },
                  thirdPartyAddress: addressSchema(address, true),
                  thirdPartyPhone: phoneSchema
                }
              }
            }
          }
        },
        transcriptInformation: {
          path: 'third-party-information/transcript-information',
          title: 'Transcript information',
          uiSchema: {
            'ui:description': 'Once the IRS discloses your tax transcript to the third party, the IRS has no control over what the third party does with the information. If you would like to limit the third party’s authority to disclose your transcript information, you can specify this limitation in your written agreement with the third party.',
            taxFormNumber: {
              'ui:title': 'Enter the tax form number of the transcript you are requesting'
            },
            transcriptType: {
              'ui:title': 'Select the type of transcript you are requesting',
              'ui:widget': 'radio',
              'ui:options': {
                labels: {
                  returnTranscript: 'Return Transcript',
                  accountTranscript: 'Account Transcript',
                  recordOfAccount: 'Record of Account',
                  verificationOfNonfilling: 'Verification of Nonfilling',
                  otherFormSeriesTranscript: 'Form W-2, Form 1099 series, Form 1098 series, or Form 5498 series transcript'
                }
              }
            },
            requestingQuarterlyReturns: {
              'ui:title': 'Are you requesting a transcript related to quarterly tax returns (such as Form 941)?',
              'ui:widget': 'yesNo'
            },
            dateOfReturn: Object.assign({}, dateUI('End date of return'), {
              'ui:options': {
                expandUnder: 'requestingQuarterlyReturns',
                expandUnderCondition: false
              }
            }),
            quarterlyDatesOfReturn: {
              'ui:title': 'End dates of each quarter of the period of return',
              'ui:options': {
                expandUnder: 'requestingQuarterlyReturns'
              },
              firstQuarterDateOfReturn: Object.assign({}, dateUI('First quarter date of return')),
              secondQuarterDateOfReturn: Object.assign({}, dateUI('Second quarter date of return')),
              thirdQuarterDateOfReturn: Object.assign({}, dateUI('Third quarter date of return')),
              fourthQuarterDateOfReturn: Object.assign({}, dateUI('Fourth quarter date of return'))
            }
          },
          schema: {
            type: 'object',
            properties: {
              taxFormNumber: {
                type: 'string'
              },
              transcriptType: {
                type: 'string',
                enum: ['returnTranscript', 'accountTranscript', 'recordOfAccount', 'verificationOfNonfilling', 'otherFormSeriesTranscript']
              },
              requestingQuarterlyReturns: {
                type: 'boolean'
              },
              dateOfReturn: dateSchema,
              quarterlyDatesOfReturn: {
                type: 'object',
                properties: {
                  firstQuarterDateOfReturn: dateSchema,
                  secondQuarterDateOfReturn: dateSchema,
                  thirdQuarterDateOfReturn: dateSchema,
                  fourthQuarterDateOfReturn: dateSchema
                }
              }
            }
          }
        }
      }
    }
  }
};

export default formConfig;
