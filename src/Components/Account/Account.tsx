import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

import { FETCH_FORM, UPDATE_PASS } from '../../constants';
import './Account.css';

interface Field {
  fieldName: string;
  type?: string;
  label?: string;
}

interface EpFormProps {
  formName: string;
  endpoint: string;
  setError: (error: string) => void;
}

interface AccountProps {
  handleSubmit: (answers: Record<string, string>) => void;
}

function fieldsToAnswers(fields: Field[]): Record<string, string> {
  const answers: Record<string, string> = {};
  fields.forEach(({ fieldName }) => {
    answers[fieldName] = '';
  });
  return answers;
}

function EpForm({formName, endpoint, setError}:EpFormProps) {
  const [fields, setFields] = useState<Field[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});

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
    axios.put(endpoint, answers)
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

  useEffect(() => {
    axios.get(`${FETCH_FORM}/${formName}`)
    .then(response => {
      console.log('response data', response.data)
      setFields(response.data);
      setAnswers(fieldsToAnswers(response.data));
    })
    .catch(error => {
      console.error('Error fetching form fields:', error);
    });
  }, []);

  return <form className='AcctForm' onSubmit={handleFormSubmit}>
            {fields.map(({ fieldName, type, label }) => (
              <div key={fieldName}>
                <label htmlFor={fieldName}>{label}</label> <br></br>
                <input
                  className='AcctFormInputs'
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
}

function Account({ handleSubmit }: AccountProps): JSX.Element {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  return (
    <div className="wrapper">
      {error && (
        <div className="error-message">
        {error}
        </div>
      )}
      <h1>Change Password</h1>
      <EpForm 
        formName='UpdatePass' 
        endpoint={UPDATE_PASS} 
        setError={setError}
      />
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
  const handleSubmit = (answers: Record<string, string>) => {
      // Log individual elements of answers
      Object.entries(answers).forEach(([key, value]) => {
        console.log(`${key}: ${value}`);
      });
    };

  return <Account handleSubmit={handleSubmit} />;
}

export default Account;
