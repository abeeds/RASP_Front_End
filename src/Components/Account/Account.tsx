import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

import { GET_FORMS, UPDATE_PASS } from '../../constants';


interface Field {
  fieldName: string;
  type?: string;
  label?: string;
}

interface FormProps {
  handleSubmit: (answers: Record<string, string>) => void;
}

function Account({ handleSubmit }: FormProps): JSX.Element {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [fields, setFields] = useState<Field[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    // Fetch form fields from backend
    axios.get(`${GET_FORMS}`)
      .then(response => {
        console.log('response data', response.data)
        setFields(response.data);
        setAnswers(fieldsToAnswers(response.data));
      })
      .catch(error => {
        console.error('Error fetching form fields:', error);
      });
  }, []); // Empty dependency array means this effect runs only once after the initial render

  function fieldsToAnswers(fields: Field[]): Record<string, string> {
    const answers: Record<string, string> = {};
    fields.forEach(({ fieldName }) => {
      answers[fieldName] = '';
    });
    return answers;
  }

  const answerQuestion = (fieldName: string, value: string) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [fieldName]: value
    }));
  };


  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // handleSubmit(answers);
    /*
    Object.entries(answers).forEach(([key, value]) => {
      console.log(`${key}: ${value}`);
    });
    */
    
    // Send answers to backend
    axios.put(`${UPDATE_PASS}`, answers)
      .then(response => {
        console.log('Submission successful:', response.data);
        // If needed, handle success response
        setError(response.data.Status);
      })
      .catch(error => {
        console.error('Error submitting answers:', error);
        // If needed, handle error response
        setError('Error encountered');
      });
    
  };

  return (
    <div className="wrapper">
      {error && (
        <div className="error-message">
        {error}
        </div>
      )}
      <form onSubmit={handleFormSubmit}>
        {fields.map(({ fieldName, type, label }) => (
          <div key={fieldName}>
            <label htmlFor={fieldName}>{label}: </label>
            <input
              key={fieldName}
              type={type || 'text'}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                answerQuestion(fieldName, e.target.value);
              }}
            />
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
      <hr></hr>
      <button onClick={() => {
        localStorage.removeItem('user');
        navigate("/login");
      }}>Logout</button>
    </div>
  );
}

Account.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

const Hform: React.FC = () => {
  return (
    <Account handleSubmit={(answers) => {
      // Log individual elements of answers
      Object.entries(answers).forEach(([key, value]) => {
        console.log(`${key}: ${value}`);
      });
    }} />
  );
}

export default Account;
