import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TestResult {
    id: string;
    name: string;
    status: 'passed' | 'failed' | 'skipped';
    duration: number;
}

interface TestState {
    results: TestResult[];
    loading: boolean;
    error: string | null;
}

const initialState: TestState = {
    results: [],
    loading: false,
    error: null,
};

const testSlice = createSlice({
    name: 'test',
    initialState,
    reducers: {
        fetchTestResultsStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchTestResultsSuccess(state, action: PayloadAction<TestResult[]>) {
            state.loading = false;
            state.results = action.payload;
        },
        fetchTestResultsFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        clearTestResults(state) {
            state.results = [];
        },
    },
});

export const {
    fetchTestResultsStart,
    fetchTestResultsSuccess,
    fetchTestResultsFailure,
    clearTestResults,
} = testSlice.actions;

export default testSlice.reducer;