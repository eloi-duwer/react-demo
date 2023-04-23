export enum Step {
  PROFILE = 'PROFILE',
  COORDINATES = 'COORDINATES',
  PAYMENT = 'PAYMENT',
  CONFIRM = 'CONFIRM'
}

export const stepOrder = [Step.PROFILE, Step.COORDINATES, Step.PAYMENT, Step.CONFIRM]

export function findStepIndex(step: Step): number {
  return stepOrder.indexOf(step)
}

export function findStepFromIndex(index: number): Step | undefined {
  return stepOrder[index]
}