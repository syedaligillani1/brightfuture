'use client'

import { useState } from 'react'
import InputField from '../reused-Components /inputfield'
import FileUploadField from '../reused-Components /fileupload'
import Selectbox from '../reused-Components /selectbox'
import RadioGroup from '../reused-Components /RadioButton'
import ToggleBtn from '../reused-Components /ToggleBtn'
import TextArea from '../reused-Components /TextArea'
import PrimaryButton from '../reused-Components /PrimaryButton'
import CancelButton from '../reused-Components /CancelButton'
import Modal from '../reused-Components /Modal'

export default function DepartmentForm() {
  const [name, setName] = useState('')
  const [logo, setLogo] = useState<File | null>(null)
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [isActive, setIsActive] = useState(false)
  const [showCancelModal, setShowCancelModal] = useState(false)


  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setLogo(file)
    }
  }

  const handleSubmit = () => {
    alert(`Submitted: ${name}, Logo: ${logo?.name}`)
  }


  const handleCancel = () => {
    setShowCancelModal(true)
  }

  const confirmCancel = () => {
    alert('Cancelled')
    setShowCancelModal(false)
  }


  const [departmentType, setDepartmentType] = useState('')
  const departmentOptions = ['Science', 'Engineering', 'Arts', 'Business']

  const categoryOptions = [
    { label: 'Public', value: 'public' },
    { label: 'Private', value: 'private' },
    { label: 'Government', value: 'semi' }
  ]




  return (
    <div>
      <InputField
        label="Department Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter department name"
        required
        error={false}
        success={true}
      />

      <br />

      <FileUploadField
        label="Logo"
        onChange={handleLogoChange}
        accept="image/*"
        name="logo-upload"

      />


      <br />
      <br />
      <PrimaryButton label="Submit" onClick={handleSubmit} />

      <br />
      <br />

      <Selectbox
        label="Department Type"
        value={departmentType}
        onChange={(e) => setDepartmentType(e.target.value)}
        options={departmentOptions}
      />

      <br />

      <RadioGroup
        label="Department Category"
        name="category"
        options={categoryOptions}
        value={category}
        onChange={(e) => setCategory(e.target.value)} />


      <ToggleBtn label="Toggle" value={isActive} onChange={setIsActive} />


      <br />
      <TextArea

        label='Courses Description'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder='Add Description'
      />

      <br />

      <CancelButton
        label='Cancel'
        onClick={handleCancel}
        className=' bg-red-300'

      />

      <Modal
        open={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        title="Are you sure you want to cancel?"
        description="This will discard all entered information."
        confirmLabel="Yes, Cancel"
        cancelLabel="No, Go Back"
        onConfirm={confirmCancel}
      />

    </div>



  )
}