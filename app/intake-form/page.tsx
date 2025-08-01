import PatientIntakeForm from '@/components/ui/patient/patient_intake/PatientIntakeForm'

export default function IntakeFormPage() {
  return (
    <div className="flex flex-col items-center mx-auto w-1/2 bg-gray-200 rounded-md space-y-5 m-5">
      <h4 className="font-bold text-3xl mt-4">Patient Intake Form </h4>
      <PatientIntakeForm />
    </div>
  )
}
