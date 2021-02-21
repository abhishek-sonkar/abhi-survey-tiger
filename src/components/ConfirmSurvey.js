import { useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { Button } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { surveySlice } from './stores/SurveySlice';

export default function ConfirmSurvey() {
    const { surveyId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const survey = useSelector((globalStore) =>
        globalStore.surveys.find((s) => s.surveyId === surveyId)
    );

    const confirmAndPublishSurvey = () => {
        dispatch(surveySlice.actions.markPublished({ surveyId }));
        history.push("/");
    };

    return (
        <>
            {survey.questions.map((q) => (
                <>
                    <table>
                        <thead>
                            <tr>
                                <th><h4>{q.question}</h4></th>
                            </tr>
                        </thead>
                        {q.type === "single" ? (
                        <>
                            <tbody>
                                <tr>
                                    <td>
                                        <label>{q.options[0]}</label>
                                        <input type="radio" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label>{q.options[1]}</label>
                                        <input type="radio" />
                                    </td>
                                </tr>
                            </tbody>
                        </>
                    ) : (
                            <>
                            <tbody>
                            <tr>
                                <td>
                                    <label>{q.options[0]}</label>
                                    <input type="checkbox" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>{q.options[0]}</label>
                                    <input type="checkbox" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>{q.options[1]}</label>
                                    <input type="checkbox" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>{q.options[2]}</label>
                                    <input type="checkbox" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>{q.options[3]}</label>
                                    <input type="checkbox" />
                                </td>
                            </tr>
                            </tbody>
                            </>
                        )}
                    </table>
                </>
            ))}
            <Button className="survey-main-btn" onClick={confirmAndPublishSurvey}>
                Confirm Survey
            </Button>
        </>
    );
}