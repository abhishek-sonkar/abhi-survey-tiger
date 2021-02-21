import { useSelector } from 'react-redux';
import { Button } from 'reactstrap';

export default function TakeSurvey() {
    const surveyIds = useSelector((globalStore) => 
        globalStore.surveys.filter((s) => s.isPublished).map((s) => s.surveyId)
    );

    return (
        <>
            { surveyIds.map((surveyId) => (
                <Button className="survey-main-btn" key={surveyId}>Take Survey{surveyId}</Button>))
            }
        </>
  );
}