export const BASE_URL = "https://nicofreundt.ddns.net:3001";

export const getTasksByTopic = async (topic) => {
    return await fetch(`${BASE_URL}/tasks/${topic}`)
            .then(res => res.json());
}

export const getTaskStatusByUser = async () => {
    return await fetch(`${BASE_URL}/status/get/${localStorage.getItem('userID')}`)
                .then(res => res.json());
}

export const getImagesForTask = async (taskID) => {
    return await fetch(`${BASE_URL}/images/paths/${taskID}`)
                .then(res => res.json());
}

export const getSpecificTaskStatus = async (userID, taskID, status) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ taskID, userID, status })
    }

    return await fetch(`${BASE_URL}/status/get`, requestOptions).then(res => res.json());
}

export const newTask = async (fileName, fileContent, level, thema, imageNames) => {
    const options = {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ Titel: fileName, Text: fileContent, Level: level, Thema: thema, Images: imageNames })
    }

    return await fetch(`${BASE_URL}/tasks/new`, options).then(res => res.json());
}

export const uploadImages = async (images) => {
    const options = {
        method: 'POST',
        body: images
    };

    return await fetch(`${BASE_URL}/images/upload`, options);
}

export const setStatusForTask = async (taskID, userID, status) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ taskID, userID, status })
    }

    return await fetch(`${BASE_URL}/status/set`, requestOptions).then(res => res.json());
}

export const getSchuelerList = async () => {
    return await fetch(`${BASE_URL}/users/getSchueler`).then(res => res.json());
}