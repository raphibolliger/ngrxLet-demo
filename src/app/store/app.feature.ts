import { createFeature, createReducer } from "@ngrx/store";

type AppState = {
    readonly value1: number;
    readonly value2: number;
}

const initialState: AppState = {
    value1: 0,
    value2: 5,
}

export const appFeature = createFeature({
    name: 'app',
    reducer: createReducer(initialState)
});