import PatientDashboard from '../../../components/dashboard/PatientDashboard'

export default function DashboardPage() {
  const mockData = {
    patient: 'Jane Smith',
    provider: 'Elias Hartman',
    appointments: {
      date: ['2025-07-25'],
      time: ['2:00 PM'],
    },
    messages: [
      {
        sender: 'Dr. Elias Hartman',
        user: 'Roosiel',
        message: "Here's your result",
      },
      {
        sender: 'Radiology',
        user: 'Roosiel',
        message: 'Please review the scan',
      },
      { sender: 'Pharmacy', user: 'Roosiel', message: 'Prescription ready' },
    ],
  }

  return <PatientDashboard {...mockData} />
}
