import { ProjectType } from "../type";

const initialState = {
  projectList: [],
  projectTaks: [],
  taskStatusList: [],
  taskPriorityList: [],
  isLoading: false,
  error: undefined,
  message: undefined,
  activeProject:""
};

export const ProjectReducer = (state = initialState, action) => {
  const { type, payload = {} } = action;

  switch (type) {
    case ProjectType.GET_ALL_PROJECT:
      return {
        ...state,
        isLoading: false,
        projectList: payload,
      };
    case ProjectType.FIND_PROJECT:
      return {
        ...state,
        isLoading: false,
        projectTaks: payload,
      };
    case ProjectType.CREATE_PROJECT:
      return {
        ...state,
        isLoading: false,
        projectList: [...state.projectList, payload],
      };
    case ProjectType.TASK_STATUS_LIST:
      return {
        ...state,
        isLoading: false,
        taskStatusList: payload,
      };
    case ProjectType.TASK_PRIORITY_LIST:
      return {
        ...state,
        isLoading: false,
        taskPriorityList: payload,
      };
    case ProjectType.UPDATE_TASK:
      return {
        ...state,
        isLoading: false,
        projectTaks: {
          ...state.projectTaks,
          tasks: state.projectTaks.tasks.map((task) =>
            task._id === payload._id ? { ...task, ...payload } : task
          ),
        },
      };
      case ProjectType.DELETE_TASKS:
        return {
          ...state,
          isLoading: false,
          projectTaks: {
            ...state.projectTaks,
            tasks: payload,
          },
        };
      

    case ProjectType.CREATE_TASK:
      console.log("payload", payload);
      return {
        ...state,
        isLoading: false,
        projectTaks: {
          ...state.projectTaks,
          tasks: [payload, ...state.projectTaks.tasks],
        },
      };
    case ProjectType.LOADING_PROJECT:
      return {
        ...state,
        isLoading: payload,
      };
    case ProjectType.ACTIVE_PROJECT:
      return{
        ...state,
        activeProject:payload
      }
    default: {
      return state;
    }
  }
};
