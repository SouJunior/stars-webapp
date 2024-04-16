import axiosInstance from '@/services/http.js'

function headers () {
    const token = localStorage.getItem('token');

    return {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
}

async function fetchBy(uuidSquad) {
    try {
        const response = await axiosInstance.get(
            '/squad/' + uuidSquad + '/members', 
            { headers: headers() }
        );

        const data = response.data;

        if (data.error) {
            alert(data.error)
            return;
        } else {
            return data
        }
    }
    catch (error) {
        alert(error)
    }
}

async function fetchByEmail(email) {
    try {
        const response = await axiosInstance.get(
            '/volunteer/' + email, 
            { headers: headers() }
        );

        const data = response.data;

        if (data.error) {
            alert(data.error)
            return;
        } else {
            return data
        }
    }
    catch (error) {
        alert(error)
    }
}

async function create(volunteer) {
    console.log('volunteer :', volunteer);
    try {
        const response = await axiosInstance.post(
            '/volunteer', 
            volunteer,
            { headers: headers() }
        );

        const data = response.data;

        if (data.error) {
            alert(data.error)
            return;
        } else {
            return data
        }
    }
    catch (error) {
        alert(error)
    }
}

async function update(member) {
    try {
        const response = await axiosInstance.put(
            '/squad/' + member.squad_uuid + '/member/' + member.uuid, 
            member,
            { headers: headers() }
        );

        const data = response.data;

        if (data.error) {
            alert(data.error)
            return;
        } else {
            return data
        }
    }
    catch (error) {
        alert(error)
    }
}

async function del(uuidSquad, uuidMember) {
    try {
        const response = await axiosInstance.delete(
            '/squad/' + uuidSquad + '/member/' + uuidMember, 
            { headers: headers() }
        );

        const data = response.data;

        if (data.error) {
            alert(data.error)
            return;
        } else {
            return data
        }
    }
    catch (error) {
        alert(error)
    }
}

export default {
    fetchBy,
    del,
    create, 
    update,
    fetchByEmail
};
