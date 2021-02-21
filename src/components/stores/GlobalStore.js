import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { surveySlice } from './SurveySlice';
import { responseSlice } from './ResponseSlice';

const rootReducer = combineReducers({
    surveys: surveySlice.reducer, 
    responses: responseSlice.reducer
});

export const store = configureStore({ reducer: rootReducer });