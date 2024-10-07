//const backendDomain = "http://localhost:8000"
//const backendDomain = process.env.REACT_APP_BACKEND_URL;
const backendDomain = import.meta.env.VITE_API_BASE_URL

const SummaryApi = {
    signUp : {
        url : `${backendDomain}/api/register`,
        method : 'POST'
    },
    signIn : {
        url : `${backendDomain}/api/login`,
        method : 'POST'
    },
    current_user : {
        url : `${backendDomain}/api/user-details`,
        method : 'GET'
    },
    logout_user : {
        url : `${backendDomain}/api/userLogout`,
        method : 'GET'
    },
    allUsers : {
        url : `${backendDomain}/api/all-users`,
        method : 'GET'
    },
    /**
     * authenticated users request certain pixels and entering extra data,
     * the system stores these data and make its status = pending, until approved by admin
     */
    request_pixels : {
        url : `${backendDomain}/api/request/pixels`,
        method : 'POST'
    },
    //add partial img for a certian pixel
    add_partial_img : {
        url : `${backendDomain}/api/add/partial/img`,
        method : 'POST'
    },
    //add partial img for a certian pixel
    approved_pixels : {
        url : `${backendDomain}/api/approved/pixels`,
        method : 'GET'
    }
}

export default SummaryApi