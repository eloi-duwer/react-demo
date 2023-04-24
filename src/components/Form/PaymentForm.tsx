import React, { useCallback } from 'react'
import FormStepContainer from './FormStepContainer'
import { Controller, useFormContext } from 'react-hook-form'
import FormData, { Plan } from '../../types/FormData'
import { Box, FormControl, FormControlLabel, FormLabel, List, ListItem, Radio, RadioGroup, TextField, styled } from '@mui/material'

const PlansContainer = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  columnGap: 16,
  marginBottom: 16
})

const PlanTile = styled(Box)<{ selected: boolean }>(({ selected }) => ({
  border: `2px solid #${selected ? 'ac1611' : 'b6b6b6'}`,
  padding: 16,
  paddingLeft: 32,
  '&:hover': {
    borderColor: '#ac16117F'
  }
}))

const PlanTitle = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 18,
  fontWeight: 700
})

const BulletedList = styled(List)({
  listStyleType: 'disc'
})

const Item = styled(ListItem)({
  display: 'list-item'
})

const planPricesPerMonth: Record<Plan, number> = {
  [Plan.Digital]: 18,
  [Plan.DigitalPhysical]: 30.5
}

function formatPrice(price?: number) {
  if (price == null || isNaN(price)) {
    return '--'
  }
  return new Intl.NumberFormat('en-EN', { minimumFractionDigits: 2 }).format(price)
}

function PaymentForm () {

  const { setValue, watch } = useFormContext<FormData>()

  const updatePlan = useCallback((plan: Plan) => {
    setValue('plan', plan)
  }, [setValue])

  const selectedPlan = watch('plan')

  return (
    <FormStepContainer>
      <PlansContainer>
        <PlanTile selected={selectedPlan === Plan.Digital} onClick={() => updatePlan(Plan.Digital)}>
          <PlanTitle>Digital</PlanTitle>
          <BulletedList>
            <Item>{formatPrice(planPricesPerMonth.digital)}€ per month</Item>
            <Item>Read it on all your screens</Item>
            <Item>Daily Newsletter</Item>
          </BulletedList>
        </PlanTile>
        <PlanTile selected={selectedPlan === Plan.DigitalPhysical} onClick={() => updatePlan(Plan.DigitalPhysical)}>
          <PlanTitle>Digital + Physical</PlanTitle>
          <BulletedList>
            <Item>{formatPrice(planPricesPerMonth.digitalPhysical)}€ per month</Item>
            <Item>All the Digital Features</Item>
            <Item>Delivered daily from Monday to Friday</Item>
          </BulletedList>
        </PlanTile>
      </PlansContainer>
      
      <FormControl>
        <FormLabel id='paymentMethod'>Payment method</FormLabel>
        <Controller
          rules={{ required: false }}
          name='paymentMethod'
          defaultValue={''}
          render={({ field }) => (
            <RadioGroup {...field} aria-labelledby='paymentMethod'>
              <FormControlLabel value='monthly' control={<Radio />} label={`Monthly - ${formatPrice(planPricesPerMonth[selectedPlan])}€`}></FormControlLabel>
              <FormControlLabel value='annualy' control={<Radio />} label={`Annualy - ${formatPrice(planPricesPerMonth[selectedPlan] * 12)}€`}></FormControlLabel>
            </RadioGroup>
          )}
        />
      </FormControl>

      <FormControl fullWidth>
        <Controller
          rules={{ required: true }}
          name='paymentDetails'
          defaultValue={''}
          render={({ field }) => (
            <TextField {...field} required label='Payment details' />
          )}
        />
      </FormControl>
    </FormStepContainer>
  )
}

export default PaymentForm