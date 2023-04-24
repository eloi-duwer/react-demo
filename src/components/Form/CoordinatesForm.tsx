import React from 'react'
import FormStepContainer from './FormStepContainer'
import { Box, FormControl, TextField, styled } from '@mui/material'
import { Controller } from 'react-hook-form'

const Inlined = styled(Box)({
  display: 'flex',
  gap: 16,
  marginTop: 16
})

function CoordinatesForm () {

  return (
    <FormStepContainer>
      <Inlined>
        <FormControl fullWidth>
          <Controller
            name='society'
            defaultValue={''}
            render={({ field }) => (
              <TextField {...field} label='Society' />
            )}
          />
        </FormControl>
      </Inlined>

      <Inlined>
        <FormControl fullWidth>
          <Controller
            rules={{ required: true }}
            name='address'
            defaultValue={''}
            render={({ field }) => (
              <TextField {...field} required label='Address' />
            )}
          />
        </FormControl>
      </Inlined>

      <Inlined>
        <FormControl fullWidth>
          <Controller
            rules={{ required: true }}
            name='postalCode'
            defaultValue={''}
            render={({ field }) => (
              <TextField {...field} type='number' required label='Postal Code' />
            )}
          />
        </FormControl>
        <FormControl fullWidth>
          <Controller
            rules={{ required: true }}
            name='town'
            defaultValue={''}
            render={({ field }) => (
              <TextField {...field} required label='Town' />
            )}
          />
        </FormControl>
      </Inlined>

      <Inlined>
        <FormControl fullWidth>
          <Controller
            rules={{ required: true }}
            name='country'
            defaultValue={''}
            render={({ field }) => (
              <TextField {...field} required label='Country' />
            )}
          />
        </FormControl>
        <FormControl fullWidth>
          <Controller
            rules={{ required: true }}
            name='phone'
            defaultValue={''}
            render={({ field }) => (
              <TextField {...field} required label='Phone' />
            )}
          />
        </FormControl>
      </Inlined>
    </FormStepContainer>
  )
}

export default CoordinatesForm