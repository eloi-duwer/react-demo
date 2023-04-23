import React, { createContext, useContext } from 'react'
import useStep, { Direction } from '../hooks/useStep'
import { Box, styled } from '@mui/material'
import { FormProvider, useForm } from 'react-hook-form'
import useOverscroll from '../hooks/useOverscroll'
import Timeline from './Timeline'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { Step, stepOrder } from '../types/Step'
import ProfileForm from './Form/ProfileForm'
import CoordinatesForm from './Form/CoordinatesForm'
import PaymentForm from './Form/PaymentForm'
import ConfirmForm from './Form/ConfirmForm'
import FormData from '../types/FormData'

const animationDuration = 700
const DirectionContext = createContext<Direction>(1)

const FormContainer = styled('form')({
  position: 'relative'
})

const TransitionContainer = styled(Box)<{ direction: Direction }>(({ direction }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  transition: `transform ${animationDuration}ms`,
  overflowX: 'hidden',
  '&.enter': {
    transform: `translateX(${direction * 100}%)`
  },
  '&.enter-active': {
    transform: 'translateX(0)',
  },
  '&.exit': {
    transform: 'translateX(0)'
  },
  '&.exit-active': {
    transform: `translateX(${direction * -100}%)`,
  }
}))

function Content ({ step, ...props }: { step: Step }) {
  const nodeRef = React.useRef(null)
  const direction = useContext(DirectionContext)
  return (
    <CSSTransition
      {...props}
      nodeRef={nodeRef}
      timeout={animationDuration}
      >
        <TransitionContainer ref={nodeRef} direction={direction}>
          <>
            {step === Step.PROFILE && <ProfileForm />}
            {step === Step.COORDINATES && <CoordinatesForm />}
            {step === Step.PAYMENT && <PaymentForm />}
            {step === Step.CONFIRM && <ConfirmForm />}
          </>
        </TransitionContainer>
      </CSSTransition>
  )
}

function MultiStepForm () {

  const { step: currentStep, previousStep, nextStep, jumpToStep, direction } = useStep()

  useOverscroll({
    callbackTopOverscroll: previousStep,
    callbackBottomOverscroll: nextStep
  })

  const methods = useForm<FormData>()

  const submit = (data: FormData) => {
    alert(JSON.stringify(data, null, 2))
  }

  return (
    <FormProvider {...methods}>
      <Timeline currentStep={currentStep} setStep={jumpToStep} />
      <FormContainer onSubmit={methods.handleSubmit(submit)}>
        <DirectionContext.Provider value={direction}>
          <TransitionGroup component={null}>
            {stepOrder.filter(step => currentStep === step).map(step => (
              <Content step={step} key={step} />
            ))}
          </TransitionGroup>
        </DirectionContext.Provider>
      </FormContainer>
    </FormProvider>
  )
}

export default MultiStepForm
