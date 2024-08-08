const API_URL = process.env.API_URL;

export const fetchStudent = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch student data');
    return response.json();
};

export const updateStudent = async (student) => {
    const response = await fetch(API_URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(student)
    });
    if (!response.ok) throw new Error('Failed to update student data');
    return response.json();
};

export const addEducation = async (education) => {
    const response = await fetch(`${API_URL}/education`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(education)
    });
    if (!response.ok) throw new Error('Failed to add education');
    return response.json();
};

export const updateEducation = async (index, data) => {
    const response = await fetch(`${API_URL}/education`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ index, data })
    });
    if (!response.ok) throw new Error('Failed to update education');
    return response.json();
};

export const removeEducation = async (index) => {
    const response = await fetch(`${API_URL}/education`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ index })
    });
    if (!response.ok) throw new Error('Failed to remove education');
    return response.json();
};

export const addCourse = async (course) => {
    const response = await fetch(`${API_URL}/course`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(course)
    });
    if (!response.ok) throw new Error('Failed to add course');
    return response.json();
};

export const updateCourse = async (index, data) => {
    const response = await fetch(`${API_URL}/course`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ index, data })
    });
    if (!response.ok) throw new Error('Failed to update course');
    return response.json();
};

export const removeCourse = async (index) => {
    const response = await fetch(`${API_URL}/course`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ index })
    });
    if (!response.ok) throw new Error('Failed to remove course');
    return response.json();
};
