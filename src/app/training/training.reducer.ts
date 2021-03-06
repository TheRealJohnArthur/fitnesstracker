import { TrainingActions, SET_AVAILABLE_TRAININGS, SET_FINISHED_TRAININGS, START_TRAINING, STOP_TRAINING } from './training.actions';
import { Exercise } from './exercise.model';
import * as fromRoot from '../app.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Action } from '@ngrx/store';

export interface TrainingState {
  availableExercises: Exercise[];
  finishedExercises: Exercise[];
  currentExercise: Exercise;
}

export interface State extends fromRoot.State {
  training: TrainingState;
}


const initialState: TrainingState = {
  availableExercises: [],
  finishedExercises: [],
  currentExercise: null
};

export function trainingReducer(state = initialState, action: TrainingActions) {
  switch (action.type) {
    case SET_AVAILABLE_TRAININGS:
      return {
        ...state,
        availableExercises: action.payload
      };
    case SET_FINISHED_TRAININGS:
      return {
        ...state,
        finishedExercises: action.payload
      };
    case START_TRAINING:
      return {
        ...state,
        currentExercise: { ...state.availableExercises.find(ex => ex.id === action.payload) }
        
      };
    case STOP_TRAINING:
      return {
        ...state,
        currentExercise: null
      };
    default: {
      return state;
    }
  }
}

export const getTrainingState = createFeatureSelector<TrainingState>('training');

export const getAvailableExercises = createSelector(getTrainingState, (state: TrainingState) => state.availableExercises);
export const getFinishedExercises = createSelector(getTrainingState, (state: TrainingState) => state.finishedExercises);
export const getCurrentExercise = createSelector(getTrainingState, (state: TrainingState) => state.currentExercise);

/* 
getCurrentlyRunning:
TRUE means you are currently running an exercise
FALSE means you are not currently running any exercises
*/
export const getCurrentlyRunning = createSelector(getTrainingState, (state: TrainingState) => state.currentExercise != null);
