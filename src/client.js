import axios from 'axios';

export function createAppointmentClient({ baseURL = '', defaultHeaders = {},resourcePath = '/Resource', 
  appointmentPath = '/Appointment' } = {}) {
  const instance = axios.create({ baseURL, headers: defaultHeaders });

  async function getResources() {
    const res = await instance.get(resourcePath);
    return res.data;
  }

  async function createAppointment(payload) {
    const res = await instance.post(appointmentPath, payload);
    return res.data;
  }

  return { getResources, createAppointment, axiosInstance: instance };
}
