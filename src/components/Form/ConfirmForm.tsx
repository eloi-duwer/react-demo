import React from 'react'
import FormStepContainer from './FormStepContainer'
import { Controller, useFormContext } from 'react-hook-form'
import { Box, Button, Checkbox, FormControlLabel, styled } from '@mui/material'
import FormData from '../../types/FormData'

const SubmitButtonWrapper = styled(Box)({
  marginTop: 16,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
})

function ConfirmForm () {

  const { watch } = useFormContext<FormData>()

  const hasAcceptedCGV = watch('acceptCGV')

  return (
    <FormStepContainer>
      <FormControlLabel
        label='I accept to receive Newsletter & commercial offers'
        control={
          <Controller
            name='acceptNewsLetter'
            defaultValue={false}
            render={({ field }) => 
              <Checkbox {...field} checked={field.value} />
            }
          />
        }
      />
      <FormControlLabel
        label='I have read & accept the CGV'
        required
        control={
          <Controller
            name='acceptCGV'
            defaultValue={false}
            rules={{ required: true }}
            render={({ field }) => 
              <Checkbox {...field} checked={field.value} />
            }
          />
        }
      />
      <SubmitButtonWrapper>
        <Button disabled={!hasAcceptedCGV} type='submit' variant='contained'>Submit</Button>
      </SubmitButtonWrapper>
    </FormStepContainer>
  )
}

export default ConfirmForm