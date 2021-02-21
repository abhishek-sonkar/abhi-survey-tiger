import { useState } from 'react';
import { Button, InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { surveySlice } from './stores/SurveySlice';

export default function CreateSurvey() {
    const { surveyId } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const [options, setOptions] = useState([""]);
    const [question, setQuestion] = useState("");
    
    const addOption = (optionIdx) => {
        if(options.length < 4) {
            options.splice(optionIdx + 1, 0, "");
            setOptions([...options]);
        }
    };

    const removeOption = (optionIdx) => {
        if(options.length > 1) {
            options.splice(optionIdx, 1);
            setOptions([...options]);
        }
    };

    const modifyOptions = (optionValue, optionIdx) => {
        options[optionIdx] = optionValue;
        setOptions([...options]);
    };

    const isAddQuestionPublishDisabled = () =>
        question.trim() === "" || options.find((opt) => opt.trim() === "") !== undefined;

    const addQuestionOnClick = () => {
        const payload = {
            options,
            question,
            surveyId,
            type: "multiple"
        };
        dispatch(surveySlice.actions.addQuestion(payload));
        history.push('/create-survey/' + surveyId + '?clear=true');
    };

    const publishQuestion = () => {
        const payload = {
            options,
            question,
            surveyId,
            type: "multiple"
        };
        dispatch(surveySlice.actions.addQuestion(payload));
        history.push('/confirm-survey/' + surveyId);
    };

    return (
        <div className="question-container">
            <InputGroup className="input-grp">
                <InputGroupAddon addonType="prepend">
                    <InputGroupText><b>?</b></InputGroupText>
                </InputGroupAddon>
                <Input placeholder="Your question"
                onChange={e => setQuestion(e.target.value)}
                value={question}/>
            </InputGroup>
            <p className="options-text">Options</p>
            {
                options.map((option, optionIdx) => (
                    <InputGroup className="input-grp" key={optionIdx}>
                    <Input placeholder={`Option ${optionIdx + 1}`} 
                    value={option} 
                    key={optionIdx} 
                    onChange={(e) => modifyOptions(e.target.value, optionIdx)}/>
                    <InputGroupAddon addonType="append">
                        <Button onClick={() => addOption(optionIdx)} disabled={options.length === 4}><b>+</b></Button>
                        <Button onClick={() => removeOption(optionIdx)} disabled={options.length === 1}><b>-</b></Button>
                    </InputGroupAddon>
                    </InputGroup>
                ))
            }
            <br/>
            {options.length === 4 ? (
                <div>
                    <Button 
                    className="survey-main-btn"
                    disabled={isAddQuestionPublishDisabled()}
                    onClick={addQuestionOnClick}>Add Question</Button>
                    <Button 
                    className="survey-main-btn"
                    disabled={isAddQuestionPublishDisabled()}
                    onClick={publishQuestion}>Publish</Button>
                </div>
            ) : null}
        </div>
      );
}