import React from 'react';
import { createAppointmentClient, AppointmentProvider, AppointmentForm } from '../src'; // or from installed package

const client = createAppointmentClient({
  baseURL: process.env.REACT_APP_BASE_API || 'http://localhost:4000'
});

export default function App() {
  return (
    <AppointmentProvider client={client}>
      <AppointmentForm onSuccess={(res) => console.log('created', res)} />
    </AppointmentProvider>
  );
}
