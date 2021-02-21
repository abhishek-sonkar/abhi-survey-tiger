import React, { useState, useEffect } from 'react';
import MultiSelect from './MultiSelect';
import SingleSelect from './SingleSelect';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default function CreateSurvey() {
    const { surveyId } = useParams();
    const query = useLocation().search;
    const history = useHistory();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownText, setDropdownText] = useState("Select Question Type");

    const toggle = () => setDropdownOpen(prevState => !prevState);

    useEffect(() => {
        if(query === '?clear=true') {
            setDropdownText("Select Question Type");
            history.push('/create-survey/' + surveyId);
        }
    }, [query, history, surveyId]);
    
    return (
        <>
            <p>Survey ID: <b>{surveyId}</b></p>
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle caret>{dropdownText}</DropdownToggle>
                <DropdownMenu>
                    <DropdownItem onClick={() => setDropdownText("Multi Select")}>Multi Select</DropdownItem>
                    <DropdownItem onClick={() => setDropdownText("Single Select")}>Single Select</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            {dropdownText === "Multi Select" ? <MultiSelect/> : null}
            {dropdownText === "Single Select" ? <SingleSelect/> : null}
        </>
  );
}