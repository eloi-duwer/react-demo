import React from 'react'
import FormStepContainer from './FormStepContainer'
import { Box, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, styled } from '@mui/material'
import { Controller } from 'react-hook-form'
import { Department, Profession } from '../../types/FormData'

const Inlined = styled(Box)({
  display: 'flex',
  gap: 16,
  marginTop: 16
})

const departmentLabels: Record<Department, string> = {
  Finance: 'Finance',
  Administration: 'Administration',
  Commercial: 'Commercial',
  Manufacturing: 'Manufacturing',
  Advertisement: 'Advertisement',
  ComputerScience: 'Computer Science',
  Other: 'Other'
}

const professionLabels: Record<Profession, string> = {
  ExecutiveOfficer: 'Executive Officer',
  Director: 'Director',
  Engineer: 'Engineer',
  Employee: 'Employee',
  OtherActive: 'Other profession',
  Liberal: 'Liberal',
  Trader: 'Trader',
  Teacher: 'Teacher',
  Retired: 'Retired',
  Inactive: 'Inactive'
}

function ProfileForm () {
  return (
    <FormStepContainer>
      <FormControl>
        <FormLabel id='gender'>Gender</FormLabel>
        <Controller
          rules={{ required: false }}
          name='gender'
          defaultValue={''}
          render={({ field }) => (
            <RadioGroup {...field} row aria-labelledby='gender'>
              <FormControlLabel value='female' control={<Radio />} label='Female'></FormControlLabel>
              <FormControlLabel value='male' control={<Radio />} label='Male'></FormControlLabel>
              <FormControlLabel value='other' control={<Radio />} label='Other'></FormControlLabel>
            </RadioGroup>
          )}
        />
      </FormControl>

      <Inlined>
        <FormControl fullWidth>
          <Controller
            rules={{ required: true }}
            name='firstName'
            defaultValue={''}
            render={({ field }) => (
              <TextField {...field} required label='First Name' />
            )}
          />
        </FormControl>
        <FormControl fullWidth>
          <Controller
            rules={{ required: true }}
            name='lastName'
            defaultValue={''}
            render={({ field }) => (
              <TextField {...field} required label='Last Name' />
            )}
          />
        </FormControl>
      </Inlined>

      <Inlined>
        <FormControl fullWidth>
          <InputLabel id="department">Department</InputLabel>
          <Controller
            name='department'
            render={({ field }) => (
                <Select
                  {...field}
                  labelId="department"
                  label="Department"
                >
                  {Object.entries(departmentLabels).map(([ value, label ]) =>
                    <MenuItem key={value} value={value}>{label}</MenuItem>
                  )}
                </Select>
            )}
          />
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="profession">Profession</InputLabel>
          <Controller
            name='profession'
            defaultValue={''}
            render={({ field }) => (
                <Select
                  {...field}
                  labelId="profession"
                  label="Profession"
                >
                  {Object.entries(professionLabels).map(([ value, label ]) =>
                    <MenuItem key={value} value={value}>{label}</MenuItem>
                  )}
                </Select>
            )}
          />
        </FormControl>
      </Inlined>

      <Inlined>
        <FormControl fullWidth>
          <Controller
            rules={{ required: true }}
            name='email'
            defaultValue={''}
            render={({ field }) => (
              <TextField {...field} required label='Email' />
            )}
          />
        </FormControl>
        <FormControl fullWidth>
          <Controller
            rules={{ required: true }}
            name='password'
            defaultValue={''}
            render={({ field }) => (
              <TextField {...field} required type='password' label='Password' />
            )}
          />
        </FormControl>
      </Inlined>
    </FormStepContainer>
  )
}

export default ProfileForm