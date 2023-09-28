import { createSlice } from "@reduxjs/toolkit";

export interface ITask {
  name?: string;
  id?: string
  createAt?: string;
  authorEmail?: string;
  country?: string
}

const taskSlice = createSlice({
  name: "task",
  initialState: {
    tasks: [] as ITask[]
  }, 
  reducers: {
    addTask(state, action: { payload: ITask }) {
      state.tasks = [...state.tasks, action.payload]
    },
    deleteTask(state, action: {payload: string}) {
      state.tasks = state.tasks.filter(task => task.id !== action.payload)
    }
}});

const { actions, reducer } = taskSlice;

export default taskSlice.reducer;
export const { addTask, deleteTask } = actions;
