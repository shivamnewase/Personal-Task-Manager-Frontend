import { showProjectList, findProjectList, createProject , getGraphDetails, getBarGraphDetails} from "../API";
import { ProjectType } from "../type";

export const showAllProjectAction = () => async (dispatch) => {
  try {
    const getProjectResponse = await showProjectList();
   
    dispatch({
      type: ProjectType.GET_ALL_PROJECT,
      payload: getProjectResponse.data.data,
    });
  } catch (error) {
    console.log("error", error);
  }
};


export const findProjectAction = (projectId) => async (dispatch) => {
  try {
    const findResponse = await findProjectList({projectId:projectId});
  
    dispatch({
      type: ProjectType.FIND_PROJECT,
      payload: findResponse.data.data,
    });
  } catch (error) {
    console.log("error", error);
  }
};


export const createProjectAction = (reqBody) => async(dispatch)=>{
  try {
    const createResponse = await createProject(reqBody);
    dispatch({
      type: ProjectType.CREATE_PROJECT,
      payload: createResponse.data.project,
    });
  } catch (error) {
    console.log("error", error);
  }
}


export const getGraphAction = (reqBody) => async(dispatch)=>{
  try {
    const getResponse = await getGraphDetails({projectId:reqBody});
   
    dispatch({
      type: ProjectType.TASK_STATUS_LIST,
      payload: getResponse.data.data,
    });
  } catch (error) {
    console.log("error", error);
  }
}

export const getPriorityGraphAction = (reqBody) => async(dispatch)=>{
  try {
    const getResponse = await getBarGraphDetails({projectId:reqBody});
   
    dispatch({
      type: ProjectType.TASK_PRIORITY_LIST,
      payload: getResponse.data.data,
    });
  } catch (error) {
    console.log("error", error);
  }
}



export const projectLoading = (loading = true) => async(dispatch) =>{
   dispatch({type:ProjectType.LOADING_PROJECT, payload:loading})
}


export const activeProjectAction = (activeProject)=> async(dispatch)=>{

  dispatch({type:ProjectType.ACTIVE_PROJECT,payload:activeProject})
}