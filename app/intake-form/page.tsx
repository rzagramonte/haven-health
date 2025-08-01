import PatientIntakeForm from '@/components/patient/patient_intake/PatientIntakeForm'

export default function IntakeFormPage() {
  return (
    <div className="flex flex-col items-center mx-auto w-1/2 rounded-md space-y-8 m-8 bg-card-4">
      <h4 className="font-bold text-3xl mt-4">Patient Intake Form </h4>
      <PatientIntakeForm />
    </div>
  )
}
