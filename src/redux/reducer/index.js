import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import { TaskReducer } from "./task.reducer";
import { ProjectReducer } from "./project.reducer";

export default combineReducers({
  auth: authReducer,
  task: TaskReducer,
  project: ProjectReducer,
});
