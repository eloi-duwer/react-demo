import React, { ReactElement } from 'react'
import { Box, styled } from '@mui/material';
import { Step, findStepIndex, stepOrder } from '../types/Step'

import PersonIcon from '@mui/icons-material/Person'
import PlaceIcon from '@mui/icons-material/Place'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import DoneAllIcon from '@mui/icons-material/DoneAll'

const TimelineHeader = styled(Box)({
  marginTop: 20,
  marginBottom: 20,
  display: 'flex',
  flexWrap: 'nowrap',
  alignItems: 'center',
  justifyContent: 'center',
})

const Pad = styled(Box)({
  flex: 1
})

const TimelineContainer = styled(Box)({
  display: 'flex',
  flexWrap: 'nowrap',
  alignItems: 'center',
  justifyContent: 'center'
})

const ProgressBar = styled(Box)({
  width: 75,
  height: 0,
  border: '2px solid',
  transition: 'border-color .5s',
})

const StepIconContainer = styled(Box)({
  display: 'inline-block',
  cursor: 'pointer'
})

const StepIcon = styled(Box)({
  width: 44,
  height: 44,
  border: '2px solid',
  borderRadius: 44,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  transitionProperty: 'color, background-color, border-color',
  transitionDuration: '.5s',
  '& path': {
    transition: 'fill .5s'
  }
})

const previousIconStyle = {
  borderColor: '#40cab0',
  backgroundColor: '#40cab0',
  color: 'white'
}

const currentIconStyle = {
  borderColor: '#40cab0',
  backgroundColor: 'white',
  color: '#40cab0'
}

const futureIconStyle = {
  borderColor: '#eaeaea',
  backgroundColor: '#eaeaea',
  color: '#cacbcb'
}

const Title = styled(Box)({
  color: 'black',
  position: 'absolute',
  top: 55,
  left: '50%',
  transform: 'translate(-50%, -50%)'
})

const timelineIcons: Record<Step, { icon: ReactElement, title: string}> = {
  [Step.PROFILE]: {
    icon: <PersonIcon />,
    title: 'Profile'
  },
  [Step.COORDINATES]: {
    icon: <PlaceIcon />,
    title: 'Coordinates'
  },
  [Step.PAYMENT]: {
    icon: <CreditCardIcon />,
    title: 'Payment'
  },
  [Step.CONFIRM]: {
    icon: <DoneAllIcon />,
    title: 'Confirm'
  }
}

export interface QuestionFormTimelineProps {
  currentStep: Step
  setStep: (step: Step) => void
}

function Timeline ({ currentStep, setStep }: QuestionFormTimelineProps) {

  return (
    <TimelineHeader>
      <Pad />
      <TimelineContainer>
        {stepOrder.map((step: Step, index: number) => {
          const isPrevious = findStepIndex(currentStep) >= findStepIndex(step)
          const isCurrent = findStepIndex(currentStep) === findStepIndex(step)
          return (
          <React.Fragment key={index}>
            {index > 0 && <ProgressBar sx={{
              borderColor: isPrevious ? '#40cab0' : '#eaeaea'
            }} />}
            <StepIconContainer onClick={() => setStep(step)} role='button'>
              <StepIcon sx={
                isCurrent ? currentIconStyle : (isPrevious ? previousIconStyle : futureIconStyle)}>
                {timelineIcons[step].icon}
                <Title sx={{ fontWeight: isCurrent ? 700 : 500 }}>
                  {timelineIcons[step].title}
                </Title>
              </StepIcon>
            </StepIconContainer>
          </React.Fragment>
        )})}
      </TimelineContainer>
      <Pad />
    </TimelineHeader>
  )
}

export default Timeline
