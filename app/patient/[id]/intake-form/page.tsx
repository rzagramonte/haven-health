import PatientIntakeForm from '@/components/patient/patient_intake/PatientIntakeForm'

export default async function IntakeFormPage({
  params,
}: {
  params: Promise<{ id: number }>
}) {
  const { id } = await params
  return <PatientIntakeForm patientId={id} />
}
