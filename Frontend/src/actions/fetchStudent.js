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
  STUDENT_REGISTER,
  COMPANY_REGISTER,
  FETCH_COMPANY_PROFILE
} from "./types";
import axios from "axios";
import { backend } from "../webConfig";

export const studentRegister = data => dispatch => {
  console.log("before signup");
  return axios
    .post(backend + "/register", data, {
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
    .post(backend + "/companyregister", data, {
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
  console.log("before login");
  return axios
    .post(backend + "/login/", data, {
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

export function fetchStudent(payload) {
  console.log("dispatching the action");
  return function(dispatch) {
    axios.get(backend + "/profilestudent/" + payload).then(response =>
      dispatch({
        type: FETCH_STUDENT,
        payload: response.data
      })
    );
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

export function addEducation(payload) {
  console.log("dispatching the action");
  return function(dispatch) {
    axios.post(backend + "/addEduDetails", payload).then(response =>
      dispatch({
        type: ADD_EDU,
        payload: response.data
      })
    );
  };
}

export function addWork(payload) {
  console.log("dispatching the action");
  return function(dispatch) {
    axios.post(backend + "/addWorkDetails", payload).then(response =>
      dispatch({
        type: ADD_WORK,
        payload: response.data
      })
    );
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

export function removeMyEdu(payload) {
  console.log("dispatching the action");
  return function(dispatch) {
    axios.post(backend + "/deleteEduDetails", payload).then(response =>
      dispatch({
        REMOVE_MYEDU,
        type: REMOVE_MYEDU,
        payload: response.data
      })
    );
  };
}
export function removeMywork(payload) {
  console.log("dispatching the action");
  return function(dispatch) {
    axios.post(backend + "/deleteWorkDetails", payload).then(response =>
      dispatch({
        type: REMOVE_MYWORK,
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
