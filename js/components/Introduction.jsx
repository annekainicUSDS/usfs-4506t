import React from 'react';
import ProgressButton from 'us-forms-system/lib/js/components/ProgressButton';
import FormTitle from 'us-forms-system/lib/js/components/FormTitle';

class Introduction extends React.Component {
  constructor(props) {
    super(props);
    this.startForm = this.startForm.bind(this);
  }

  startForm() {
    const firstPage = this.props.route.pageList[1].path;
    this.props.router.push(firstPage);
  }  

  render() {
    return (
      <div className="schemaform-intro">
        <FormTitle title="Request for Transcript of Tax Return"/>
        <p>
          Use Form 4506-T to order a transcript or other return information free
          of charge. See the product list below. You can quickly request transcripts by
          using our automated self-help service tools. Please visit us at IRS.gov and
          click on “Get a Tax Transcript...” under “Tools” or call 1-800-908-9946. If you 
          need a copy of your return, use <strong>Form 4506, Request for Copy of Tax Return</strong>.
          There is a fee to get a copy of your return.
        </p>
        <ProgressButton
          onButtonClick={this.startForm}
          buttonText="Start Form"
          buttonClass="usa-button-primary schemaform-start-button"
          afterText="»"/>
      </div>
    );
  }
}

export default Introduction;
