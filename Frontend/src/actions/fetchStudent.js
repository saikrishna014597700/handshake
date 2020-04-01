import {
  FETCH_STUDENTDETAILS,
  FETCH_EDUCATION,
  FETCH_WORKEXP,
  FETCH_STUDENT,
  EDIT_MYJOURNEY,
  EDIT_MYSKILLS,
  EDIT_CONTACTDETAILS,
  EDIT_MYEDU,
  ADD_EDU,
  ADD_WORK,
  EDIT_MYWORK,
  REMOVE_MYEDU,
  REMOVE_MYWORK,
  EDIT_PERSONALINFO,
  LOGIN,
  COMPANY_LOGIN,
  STUDENT_REGISTER,
  COMPANY_REGISTER,
  FETCH_COMPANY_PROFILE,
  FETCH_JOB_POSTINGS,
  FETCH_EVENTS,
  REGISTER_STUDENT_EVENT,
  REGISTERED_EVENTS,
  UPCOMING_EVENTS,
  SEARCH_EVENTS,
  EDIT_STUDENT_PROFILE,
  UPDATE_COMPANY_PROFILE,
  FETCH_ALL_STUDENTS,
  STUDENT_SEARCH_COMP,
  JOB_SEARCH_NAME,
  JOB_SEARCH_NAME_AND_CAT,
  FETCH_PARTICULAR_JOB,
  FETCH_PARTICULAR_COMPANY,
  COMPANY_PROFILEPIC_FILEPATH,
  STUDENT_PROFILE_FILEPATH,
  COMPANY_EVENTS,
  COMPANY_JOBS,
  SEARCH_EVENTS_COMPANY,
  EVENT_REGISTERED_STUDENTS,
  POST_EVENT,
  POST_JOB,
  SEARCH_JOBS_COMPANY,
  COMPANY_JOB_SEARCH_NAME_AND_CAT,
  JOB_APPLIED_STUDENTS
  // STUDENT_RESUME_FILEPATH
} from "./types";
import axios from "axios";
import { backend } from "../webConfig";

export const studentRegister = data => dispatch => {
  console.log("before signup");
  return axios
    .post(backend + "/personaLogin/register", data, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      console.log(response);
      return response;
    })
    .then(signupResponse => {
      console.log("student from reducers", signupResponse);
      dispatch({
        type: STUDENT_REGISTER,
        payload: signupResponse
      });
    });
};

export const companyRegister = data => dispatch => {
  console.log("before signup");
  return axios
    .post(backend + "/personaLogin/registerCompany", data, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      console.log(response);
      return response;
    })
    .then(signupResponse => {
      console.log("student from reducers", signupResponse);
      dispatch({
        type: COMPANY_REGISTER,
        payload: signupResponse
      });
    });
};

export const login = data => dispatch => {
  console.log("before login", data);
  return axios
    .post(backend + "/personaLogin/login", data, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      console.log("response from student login axios:", response);
      console.log(
        "response from student login axios status: ",
        response.status
      );
      return response;
    })
    .then(loginResponse => {
      console.log("login resposne from actions", loginResponse);
      dispatch({
        type: LOGIN,
        payload: loginResponse
      });
    });
};

export const loginCompany = data => dispatch => {
  console.log("before login", data);
  return axios
    .post(backend + "/personaLogin/loginCompany", data, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      console.log("response from student login axios:", response);
      console.log(
        "response from student login axios status: ",
        response.status
      );
      return response;
    })
    .then(loginResponse => {
      console.log("login resposne from actions", loginResponse);
      dispatch({
        type: COMPANY_LOGIN,
        payload: loginResponse
      });
    });
};

export function fetchStudent(payload) {
  return async dispatch => {
    function onSuccess(success) {
      dispatch({ type: FETCH_STUDENT, payload: success.data });
      return success;
    }
    function onError(error) {
      dispatch({ type: FETCH_STUDENT, payload: error });
      return error;
    }
    try {
      const success = await axios.get(
        backend + "/student-mongo/getStudent/" + payload
      );
      return onSuccess(success);
    } catch (error) {
      return onError("error");
    }
  };
}

export function fetchCompanyProfile(payload) {
  console.log("dispatching the action");
  return function(dispatch) {
    axios.get(backend + "/profileCompany/" + payload).then(response =>
      dispatch({
        type: FETCH_COMPANY_PROFILE,
        payload: response.data
      })
    );
  };
}

export function fetchStudentDetails(payload) {
  console.log("dispatching the action");
  return function(dispatch) {
    axios.get(backend + "/profilestudentDetails/" + payload).then(response =>
      dispatch({
        type: FETCH_STUDENTDETAILS,
        payload: response.data
      })
    );
  };
}

export function fetchJobPostings() {
  return async dispatch => {
    function onSuccess(success) {
      dispatch({ type: FETCH_JOB_POSTINGS, payload: success.data });
      return success;
    }
    function onError(error) {
      dispatch({ type: FETCH_JOB_POSTINGS, payload: error });
      return error;
    }
    try {
      const success = await axios.get(backend + "/job-mongo/getJobPostings");
      return onSuccess(success);
    } catch (error) {
      return onError("error");
    }
  };
}

export function fetchEvents() {
  return async dispatch => {
    function onSuccess(success) {
      dispatch({ type: FETCH_EVENTS, payload: success.data });
      return success;
    }
    function onError(error) {
      dispatch({ type: FETCH_EVENTS, payload: error });
      return error;
    }
    try {
      const success = await axios.get(backend + "/event-mongo/getEvents");
      return onSuccess(success);
    } catch (error) {
      return onError("error");
    }
  };
}

export function registerStudentToEvent(payload) {
  return async dispatch => {
    function onSuccess(success) {
      dispatch({ type: REGISTER_STUDENT_EVENT, payload: success.data });
      return success;
    }
    function onError(error) {
      dispatch({ type: REGISTER_STUDENT_EVENT, payload: error });
      return error;
    }
    try {
      const success = await axios.post(
        backend + "/event-mongo/registerStudentToEvent/",
        payload
      );
      return onSuccess(success);
    } catch (error) {
      return onError("error");
    }
  };
}

export function registeredEvents(payload) {
  console.log("Reg Eve action", payload);
  return async dispatch => {
    function onSuccess(success) {
      console.log("Register Action Res", success);
      dispatch({ type: REGISTERED_EVENTS, payload: success.data });
      return success;
    }
    function onError(error) {
      dispatch({ type: REGISTERED_EVENTS, payload: error });
      return error;
    }
    try {
      const success = await axios.post(
        backend + "/event-mongo/registeredEvents",
        payload
      );
      return onSuccess(success);
    } catch (error) {
      return onError("error");
    }
  };
}

export function upcomingEvents(payload) {
  return async dispatch => {
    function onSuccess(success) {
      dispatch({ type: UPCOMING_EVENTS, payload: success.data });
      return success;
    }
    function onError(error) {
      dispatch({ type: UPCOMING_EVENTS, payload: error });
      return error;
    }
    try {
      const success = await axios.get(
        backend + "/event-mongo/upcomingEvents/",
        payload
      );
      return onSuccess(success);
    } catch (error) {
      return onError("error");
    }
  };
}

export function eventSearch(payload) {
  return async dispatch => {
    function onSuccess(success) {
      dispatch({ type: SEARCH_EVENTS, payload: success.data });
      return success;
    }
    function onError(error) {
      dispatch({ type: SEARCH_EVENTS, payload: error });
      return error;
    }
    try {
      const success = await axios.get(
        backend + "/event-mongo/eventSearch/" + payload
      );
      return onSuccess(success);
    } catch (error) {
      return onError("error");
    }
  };
}

export function companyEventSearch(payload) {
  return async dispatch => {
    function onSuccess(success) {
      dispatch({ type: SEARCH_EVENTS_COMPANY, payload: success.data });
      return success;
    }
    function onError(error) {
      dispatch({ type: SEARCH_EVENTS_COMPANY, payload: error });
      return error;
    }
    try {
      const success = await axios.post(
        backend + "/event-mongo/companyEventSearch/",
        payload
      );
      return onSuccess(success);
    } catch (error) {
      return onError("error");
    }
  };
}

export function eventRegisteredStudents(payload) {
  console.log("Reg Eve action", payload);
  return async dispatch => {
    function onSuccess(success) {
      console.log("Register Action Res", success);
      dispatch({ type: EVENT_REGISTERED_STUDENTS, payload: success.data });
      return success;
    }
    function onError(error) {
      dispatch({ type: EVENT_REGISTERED_STUDENTS, payload: error });
      return error;
    }
    try {
      const success = await axios.post(
        backend + "/event-mongo/eventRegisteredStudents",
        payload
      );
      return onSuccess(success);
    } catch (error) {
      return onError("error");
    }
  };
}

export function postEvent(payload) {
  console.log("Reg Eve action", payload);
  return async dispatch => {
    function onSuccess(success) {
      console.log("Register Action Res", success);
      dispatch({ type: POST_EVENT, payload: success.data });
      return success;
    }
    function onError(error) {
      dispatch({ type: POST_EVENT, payload: error });
      return error;
    }
    try {
      const success = await axios.post(
        backend + "/event-mongo/postEvent",
        payload
      );
      return onSuccess(success);
    } catch (error) {
      return onError("error");
    }
  };
}

export function postJob(payload) {
  console.log("Reg Eve action", payload);
  return async dispatch => {
    function onSuccess(success) {
      console.log("Register Action Res", success);
      dispatch({ type: POST_JOB, payload: success.data });
      return success;
    }
    function onError(error) {
      dispatch({ type: POST_JOB, payload: error });
      return error;
    }
    try {
      const success = await axios.post(backend + "/job-mongo/postJob", payload);
      return onSuccess(success);
    } catch (error) {
      return onError("error");
    }
  };
}

export function jobAppliedStudents(payload) {
  return async dispatch => {
    function onSuccess(success) {
      console.log("Register Action Res", success);
      dispatch({ type: JOB_APPLIED_STUDENTS, payload: success.data });
      return success;
    }
    function onError(error) {
      dispatch({ type: JOB_APPLIED_STUDENTS, payload: error });
      return error;
    }
    try {
      const success = await axios.post(
        backend + "/job-mongo/jobAppliedStudents",
        payload
      );
      return onSuccess(success);
    } catch (error) {
      return onError("error");
    }
  };
}

export function companyJobSearch(payload) {
  return async dispatch => {
    function onSuccess(success) {
      dispatch({ type: SEARCH_JOBS_COMPANY, payload: success.data });
      return success;
    }
    function onError(error) {
      dispatch({ type: SEARCH_JOBS_COMPANY, payload: error });
      return error;
    }
    try {
      const success = await axios.post(
        backend + "/job-mongo/companyJobSearch/",
        payload
      );
      return onSuccess(success);
    } catch (error) {
      return onError("error");
    }
  };
}

export function submitReduxProfileStudent(payload) {
  return async dispatch => {
    function onSuccess(success) {
      dispatch({ type: EDIT_STUDENT_PROFILE, payload: success.data });
      return success;
    }
    function onError(error) {
      dispatch({ type: EDIT_STUDENT_PROFILE, payload: error });
      return error;
    }
    try {
      const success = await axios.post(
        backend + "/student-mongo/submitReduxProfileStudent/",
        payload
      );
      return onSuccess(success);
    } catch (error) {
      return onError("error");
    }
  };
}

export function updateCompanyProfile(payload) {
  return async dispatch => {
    function onSuccess(success) {
      dispatch({ type: UPDATE_COMPANY_PROFILE, payload: success.data });
      return success;
    }
    function onError(error) {
      dispatch({ type: UPDATE_COMPANY_PROFILE, payload: error });
      return error;
    }
    try {
      const success = await axios.post(
        backend +
          `/company-mongo/updateCompanyProfile/${payload.companyId +
            "/?filePath=" +
            payload.filePath}`,
        payload.company
      );
      return onSuccess(success);
    } catch (error) {
      return onError("error");
    }
  };
}

export function fetchAllStudents(payload) {
  return async dispatch => {
    function onSuccess(success) {
      dispatch({ type: FETCH_ALL_STUDENTS, payload: success.data });
      return success;
    }
    function onError(error) {
      dispatch({ type: FETCH_ALL_STUDENTS, payload: error });
      return error;
    }
    try {
      const success = await axios.get(
        backend + "/student-mongo/fetchAllStudents/"
      );
      return onSuccess(success);
    } catch (error) {
      return onError("error");
    }
  };
}

export function studentSearchComp(payload) {
  console.log("In action search");
  return async dispatch => {
    function onSuccess(success) {
      dispatch({ type: STUDENT_SEARCH_COMP, payload: success.data });
      return success;
    }
    function onError(error) {
      dispatch({ type: STUDENT_SEARCH_COMP, payload: error });
      return error;
    }
    try {
      const success = await axios.get(
        backend + "/student-mongo/studentSearchComp/" + payload
      );
      return onSuccess(success);
    } catch (error) {
      return onError("error");
    }
  };
}

export function jobSearchOnName(payload) {
  console.log("In action search", payload);
  return async dispatch => {
    function onSuccess(success) {
      dispatch({ type: JOB_SEARCH_NAME, payload: success.data });
      return success;
    }
    function onError(error) {
      dispatch({ type: JOB_SEARCH_NAME, payload: error });
      return error;
    }
    try {
      const success = await axios.post(
        backend + "/job-mongo/jobSearchOnName",
        payload
      );
      return onSuccess(success);
    } catch (error) {
      return onError("error");
    }
  };
}

export function jobSearchOnNameAndCat(payload) {
  console.log("In action search");
  return async dispatch => {
    function onSuccess(success) {
      dispatch({ type: JOB_SEARCH_NAME_AND_CAT, payload: success.data });
      return success;
    }
    function onError(error) {
      dispatch({ type: JOB_SEARCH_NAME_AND_CAT, payload: error });
      return error;
    }
    try {
      const success = await axios.post(
        backend + "/job-mongo/jobSearchOnNameAndCat",
        payload
      );
      return onSuccess(success);
    } catch (error) {
      return onError("error");
    }
  };
}

export function companyJobSearchOnNameAndCat(payload) {
  console.log("In action search");
  return async dispatch => {
    function onSuccess(success) {
      dispatch({
        type: COMPANY_JOB_SEARCH_NAME_AND_CAT,
        payload: success.data
      });
      return success;
    }
    function onError(error) {
      dispatch({ type: COMPANY_JOB_SEARCH_NAME_AND_CAT, payload: error });
      return error;
    }
    try {
      const success = await axios.post(
        backend + "/job-mongo/companyJobSearchOnNameAndCat",
        payload
      );
      return onSuccess(success);
    } catch (error) {
      return onError("error");
    }
  };
}

export function fetchParticularJob(payload) {
  console.log("In action search");
  return async dispatch => {
    function onSuccess(success) {
      dispatch({ type: FETCH_PARTICULAR_JOB, payload: success.data });
      return success;
    }
    function onError(error) {
      dispatch({ type: FETCH_PARTICULAR_JOB, payload: error });
      return error;
    }
    try {
      const success = await axios.post(
        backend + "/job-mongo/fetchParticularJob/" + payload
      );
      return onSuccess(success);
    } catch (error) {
      return onError("error");
    }
  };
}

export function fetchParticularCompany(payload) {
  console.log("In action search");
  return async dispatch => {
    function onSuccess(success) {
      dispatch({ type: FETCH_PARTICULAR_COMPANY, payload: success.data });
      return success;
    }
    function onError(error) {
      dispatch({ type: FETCH_PARTICULAR_COMPANY, payload: error });
      return error;
    }
    try {
      const success = await axios.post(
        backend + "/company-mongo/fetchParticularCompany/" + payload
      );
      return onSuccess(success);
    } catch (error) {
      return onError("error");
    }
  };
}

export function getStudentProfilePath(payload) {
  console.log("In action search");
  return async dispatch => {
    function onSuccess(success) {
      dispatch({ type: STUDENT_PROFILE_FILEPATH, payload: success.data });
      return success;
    }
    function onError(error) {
      dispatch({ type: STUDENT_PROFILE_FILEPATH, payload: error });
      return error;
    }
    try {
      const success = await axios.post(
        backend + "/student-mongo/fetchParticularCompany/" + payload
      );
      return onSuccess(success);
    } catch (error) {
      return onError("error");
    }
  };
}

export function getCompanyProfilePicPath(payload) {
  console.log("In action search");
  return async dispatch => {
    function onSuccess(success) {
      dispatch({ type: COMPANY_PROFILEPIC_FILEPATH, payload: success.data });
      return success;
    }
    function onError(error) {
      dispatch({ type: COMPANY_PROFILEPIC_FILEPATH, payload: error });
      return error;
    }
    try {
      const success = await axios.post(
        backend +
          "/company-mongo/uploadFile/?companyId=" +
          payload.companyId +
          "&type=companyProfilePic",
        payload.profilePic
      );
      return onSuccess(success);
    } catch (error) {
      return onError("error");
    }
  };
}

export function companyEvents(payload) {
  console.log("Reg Eve action", payload);
  return async dispatch => {
    function onSuccess(success) {
      console.log("Register Action Res", success);
      dispatch({ type: COMPANY_EVENTS, payload: success.data });
      return success;
    }
    function onError(error) {
      dispatch({ type: COMPANY_EVENTS, payload: error });
      return error;
    }
    try {
      const success = await axios.post(
        backend + "/company-mongo/companyEvents",
        payload
      );
      return onSuccess(success);
    } catch (error) {
      return onError("error");
    }
  };
}

export function companyJobs(payload) {
  console.log("Reg Eve action", payload);
  return async dispatch => {
    function onSuccess(success) {
      console.log("Register Action Res", success);
      dispatch({ type: COMPANY_JOBS, payload: success.data });
      return success;
    }
    function onError(error) {
      dispatch({ type: COMPANY_JOBS, payload: error });
      return error;
    }
    try {
      const success = await axios.post(
        backend + "/company-mongo/companyJobs",
        payload
      );
      return onSuccess(success);
    } catch (error) {
      return onError("error");
    }
  };
}

// export function getStudentResumePath(payload) {
//   console.log("In action search");
//   return async dispatch => {
//     function onSuccess(success) {
//       dispatch({ type: STUDENT_RESUME_FILEPATH, payload: success.data });
//       return success;
//     }
//     function onError(error) {
//       dispatch({ type: STUDENT_RESUME_FILEPATH, payload: error });
//       return error;
//     }
//     try {
//       const success = await axios.post(
//         backend + "/student-mongo/fetchParticularCompany/" + payload
//       );
//       return onSuccess(success);
//     } catch (error) {
//       return onError("error");
//     }
//   };
// }

export function fetchEduDetails(payload) {
  console.log("dispatching the action");
  return function(dispatch) {
    axios.get(backend + "/profileEduDetails/" + payload).then(response =>
      dispatch({
        type: FETCH_EDUCATION,
        payload: response.data
      })
    );
  };
}

export function fetchWorkExpDetails(payload) {
  console.log("dispatching the action");
  return function(dispatch) {
    axios.get(backend + "/profileWorkDetails/" + payload).then(response =>
      dispatch({
        type: FETCH_WORKEXP,
        payload: response.data
      })
    );
  };
}

export function editMyJourney(payload) {
  console.log("dispatching the action");
  return function(dispatch) {
    axios.put(backend + "/myjourney", payload).then(response =>
      dispatch({
        type: EDIT_MYJOURNEY,
        payload: response.data
      })
    );
  };
}

// export function addEducation(payload) {
//   console.log("dispatching the action");
//   return function(dispatch) {
//     axios.post(backend + "/addEduDetails", payload).then(response =>
//       dispatch({
//         type: ADD_EDU,
//         payload: response.data
//       })
//     );
//   };
// }

export function addEducation(payload) {
  return async dispatch => {
    function onSuccess(success) {
      dispatch({ type: ADD_EDU, payload: success.data });
      return success;
    }
    function onError(error) {
      dispatch({ type: ADD_EDU, payload: error });
      return error;
    }
    try {
      const success = await axios.post(
        backend + "/student-mongo/addEduDetails/",
        payload
      );
      return onSuccess(success);
    } catch (error) {
      return onError("error");
    }
  };
}

export function removeMyEdu(payload) {
  return async dispatch => {
    function onSuccess(success) {
      dispatch({ type: REMOVE_MYEDU, payload: success });
      return success;
    }
    function onError(error) {
      dispatch({ type: REMOVE_MYEDU, payload: error });
      return error;
    }
    try {
      const success = await axios.post(
        backend + "/student-mongo/deleteEduDetails",
        payload
      );
      return onSuccess(success);
    } catch (error) {
      return onError("error");
    }
  };
}

export function addWork(payload) {
  return async dispatch => {
    function onSuccess(success) {
      dispatch({ type: ADD_WORK, payload: success.data });
      return success;
    }
    function onError(error) {
      dispatch({ type: ADD_WORK, payload: error });
      return error;
    }
    try {
      const success = await axios.post(
        backend + "/student-mongo/addWorkDetails/",
        payload
      );
      return onSuccess(success);
    } catch (error) {
      return onError("error");
    }
  };
}

export function removeMywork(payload) {
  return async dispatch => {
    function onSuccess(success) {
      dispatch({ type: REMOVE_MYWORK, payload: success });
      return success;
    }
    function onError(error) {
      dispatch({ type: REMOVE_MYWORK, payload: error });
      return error;
    }
    try {
      const success = await axios.post(
        backend + "/student-mongo/deleteWorkDetails",
        payload
      );
      return onSuccess(success);
    } catch (error) {
      return onError("error");
    }
  };
}

export function editMyedu(payload) {
  console.log("dispatching the action");
  return function(dispatch) {
    axios.post(backend + "/updateEduDetails", payload).then(response =>
      dispatch({
        type: EDIT_MYEDU,
        payload: response.data
      })
    );
  };
}
export function editMyWork(payload) {
  console.log("dispatching the editMyWork action");
  return function(dispatch) {
    axios.post(backend + "/updateWorkDetails", payload).then(response =>
      dispatch({
        type: EDIT_MYWORK,
        payload: response.data
      })
    );
  };
}
export function editMyskills(payload) {
  console.log("dispatching the action");
  return function(dispatch) {
    axios.put(backend + "/updateskillSet", payload).then(response =>
      dispatch({
        EDIT_MYSKILLS,
        type: FETCH_STUDENT,
        payload: response.data
      })
    );
  };
}
export function editContactDetails(payload) {
  console.log("dispatching the action");
  return function(dispatch) {
    axios.put(backend + "/updateContactdetails", payload).then(response =>
      dispatch({
        type: EDIT_CONTACTDETAILS,
        payload: response.data
      })
    );
  };
}

export function editPersonalInfo(payload) {
  console.log("dispatching the editPersonalInfo action", payload);

  return async function(dispatch) {
    console.log("fileData::", payload);
    var resumePath;
    await axios
      .post(
        backend +
          "/uploadFile/?studentId=" +
          payload[0].studentId +
          "&type=studentProfilePic",
        payload[0].studentProfilePic
      )
      .then(response => {
        console.log("Status Code : ", response);
        if (response.status === 200) {
          resumePath = response.data.filename;
          payload[0].studentProfilePic = resumePath;
          console.log("payload", payload);
        } else {
          console.log("Error in saving application");
        }
      });
    console.log("path:", resumePath);
    await axios
      .post(
        backend +
          "/updatePersonalInfo/:" +
          payload[0].studentId +
          "/?filePath=" +
          resumePath,
        payload
      )
      .then(response =>
        dispatch({
          type: EDIT_PERSONALINFO,
          payload: response.data
        })
      );
    // dispatch(fetchProfile(payload[0].studentId));
  };

  // return function(dispatch) {
  //   axios
  //     .put(backend+"/updatePersonalInfo", payload)
  //     .then(response =>
  //       dispatch({
  //         type: EDIT_PERSONALINFO,
  //         payload: response.data
  //       })
  //     );
  // };
}
