import ProviderDashboard from '../../../components/dashboard/ProviderDashboard'

export default function DashboardPage() {
  const mockData = {
    patient: 'Jane Smith',
    provider: 'Elias Hartman',
    appointments: {
      date: ['2025-07-26'],
      time: ['2:00 PM'],
    },
    messages: [
      {
        sender: 'Dr. Elias Hartman',
        user: 'TBD',
        message: "Here's your result",
      },
      {
        sender: 'Radiology',
        user: 'TBD',
        message: 'Please review the scan',
      },
      { sender: 'Pharmacy', user: 'Roosiel', message: 'Prescription ready' },
    ],
  }

  return <ProviderDashboard {...mockData} />
}
