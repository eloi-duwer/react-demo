import { useCallback, useState } from 'react';
import { Step, findStepFromIndex, findStepIndex, stepOrder } from '../types/Step';

export type Direction = -1 | 1

export default function useStep() {
  const [step, setStep] = useState<Step>(stepOrder[0])
  const [direction, setDirection] = useState<Direction>(1)

  const previousStep = useCallback(() => {
    setStep(step => {
      const newStep = findStepFromIndex(findStepIndex(step) - 1)
      if (newStep != null) {
        setDirection(-1)
        return newStep
      }
      return step
    })
  }, [])

  const nextStep = useCallback(() => {
    setStep(step => {
      const newStep = findStepFromIndex(findStepIndex(step) + 1)
      if (newStep != null) {
        setDirection(1)
        return newStep
      }
      return step
    })
  }, [])

  const jumpToStep = useCallback((stepTo: Step) => {
    setStep(step => {
      setDirection(findStepIndex(step) >= findStepIndex(stepTo) ? -1 : 1)
      return stepTo
    })
  }, [])

  return { step, previousStep, nextStep, jumpToStep, direction }
}