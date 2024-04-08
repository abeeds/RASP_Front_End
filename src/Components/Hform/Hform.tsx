import { useState, ChangeEvent, FormEvent } from 'react';
import PropTypes from 'prop-types';

/* This is an array that contains a list of fields in the form. It's hardcoded
 * here for demonstration purposes, but you can get it from the backend too.
 * 
 * Each item has 2 properties here, though you could add more.
 * fieldName:   unique ID for each input. This is mandatory.
 * type:        not required - HTML will assume an input is text if no type is given.
 *              There's a list of HTML input types here:
 *              https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
 *              Note that some elements (e.g. <select /> and <textarea />) aren't in
 *              that list, and you'll have to handle them separately.
 */

interface Field {
  fieldName: string;
  type?: string;
}

const FORM: Field[] = [
  {
    fieldName: 'username',
    type: 'text',
  },
  {
    fieldName: 'password',
    type: 'password',
  },
];

/* This function just takes an array 'fields' (of the format described above) and
 * creates an object where the keys are the fieldName values for each item in 'fields'
 * and the values are the values given by the user. If you don't set an initial value
 * (here it's an empty string ''), when the user enters a value you'll switch from
 * an uncontrolled input (user can do whatever) to a controlled input (value is fixed).
 * Usually, if you're writing a frontend in React, you want all inputs to be
 * controlled.
 */
function fieldsToAnswers(fields: Field[]): Record<string, string> {
  const answers: Record<string, string> = {};
  fields.forEach(({ fieldName }) => {
    answers[fieldName] = '';
  });
  return answers;
}

interface FormProps {
  fields: Field[];
  handleSubmit: (answers: Record<string, string>) => void;
}

function Form({ fields, handleSubmit }: FormProps): JSX.Element {
  /* This line creates two things: an object (answers) which stores the user's input
   * and a function (setAnswers) which can update that object. If you simply had the
   * code
   *   function Form() {
   *    ...
   *    const answers = fieldsToAnswers(fields);
   *    ...
   *   }
   * you would run into trouble because it would be reset every render and so user
   * input would not work.
   * 
   * If you had the code
   *   const answers = fieldsToAnswers(fields);
   *   function Form() {
   *    ...
   *   }
   * you would run into trouble because user input would not cause the form to re-
   * render, meaning that a) they would not see that the input was working and
   * b) only one letter of their input would be stored.
   */
  const [answers, setAnswers] = useState<Record<string, string>>(fieldsToAnswers(fields));
  /* This function stores the user's input in the array with a key corresponding to
   * the field which they were editing, and - crucially - calls setAnswers with a
   * shallow copy of answers. If you did not call setAnswers or called
   *   setAnswers(answers);
   * the component would not re-render and the user would not see that their input
   * was working. Also it wouldn't quite work anyway - as mentioned above it would
   * only store one character.
   */
  const answerQuestion = (fieldName: string, value: string) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [fieldName]: value
    }));
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(answers);
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleFormSubmit}>
        {fields.map(({ fieldName, type }) => (
          <input
            key={fieldName}
            type={type || 'text'}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              answerQuestion(fieldName, e.target.value);
            }}
          />
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

Form.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      fieldName: PropTypes.string.isRequired,
      type: PropTypes.string,
    })
  ).isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

const Hform: React.FC = () => {
  return <Form fields={FORM} handleSubmit={(answers) => console.log(answers)} />;
}

export default Hform;