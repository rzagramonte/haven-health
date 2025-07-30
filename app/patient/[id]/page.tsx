import PatientContactInfoView from '@/components/ui/patient/patientDetails/PatientContactInfoView'
import PatientMedicalRecordView from '@/components/ui/patient/patientDetails/PatientMedicalRecordView'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function PatientDetails() {
  return (
    <main>
      <h1>Welcome to the Patient Details page</h1>
      <Tabs defaultValue="contactInfo">
        <TabsList>
          <TabsTrigger value="contactInfo">Contact Info</TabsTrigger>
          <TabsTrigger value="medicalRecord">Medical Record</TabsTrigger>
        </TabsList>
        <TabsContent value="contactInfo">
          <PatientContactInfoView />
        </TabsContent>
        <TabsContent value="medicalRecord">
          <PatientMedicalRecordView />
        </TabsContent>
      </Tabs>
    </main>
  )
}
