import { useState } from 'react';
import { Button, InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { surveySlice } from './stores/SurveySlice';

export default function CreateSurvey() {
    const { surveyId } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const [options, setOptions] = useState(["", ""]);
    const [question, setQuestion] = useState("");

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
            type: "single"
        };
        dispatch(surveySlice.actions.addQuestion(payload));
        history.push('/create-survey/' + surveyId + '?clear=true');
    };

    const publishQuestion = () => {
        const payload = {
            options,
            question,
            surveyId,
            type: "single"
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
            <InputGroup className="input-grp">
                <Input placeholder="Option 1" value={options[0]} onChange={e => modifyOptions(e.target.value, 0)}/>
                <InputGroupAddon addonType="append">
                    <InputGroupText><b>+</b></InputGroupText>
                    <InputGroupText><b>-</b></InputGroupText>
                </InputGroupAddon>
            </InputGroup>
            <InputGroup className="input-grp">
                <Input placeholder="Option 2" value={options[1]} onChange={e => modifyOptions(e.target.value, 1)}/>
                <InputGroupAddon addonType="append">
                    <InputGroupText><b>+</b></InputGroupText>   
                    <InputGroupText><b>-</b></InputGroupText>
                </InputGroupAddon>
            </InputGroup>
            <br/>
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
        </div>
      );
}