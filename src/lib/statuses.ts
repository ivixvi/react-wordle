import { solution } from './words'

export type CharStatus = 'absent' | 'present' | 'correct'

export const getStatuses = (
  guesses: string[]
): { [key: string]: CharStatus } => {
  const charObj: { [key: string]: CharStatus } = {}

  guesses.forEach((word) => {
    word.split('').forEach((letter, i) => {
      if (!['*','E','N','T','R','I','N','A'].includes(letter)) {
        // make status absent
        return (charObj[letter] = 'absent')
      }

      if (letter === solution[i]) {
        //make status correct
        return (charObj[letter] = 'correct')
      }

      if (charObj[letter] !== 'correct') {
        //make status present
        return (charObj[letter] = 'present')
      }
    })
  })

  return charObj
}

export const getGuessStatuses = (guess: string): CharStatus[] => {
  const splitSolution = solution.split('') // [*, t, a, i, n]
  const splitGuess = guess.split('') // e, n, t, e, r

  const statuses: CharStatus[] = Array.from(Array(guess.length))

  splitGuess.forEach((letter, i) => {
    
    if (!['*','E','N','T','R','I','N','A'].includes(letter)) {
      // handles the absent case
      statuses[i] = 'absent'
      return
    } else {
      statuses[i] = 'present'
    }

  })

  // handle all correct cases first
  splitGuess.forEach((letter, i) => {
    if (
      letter === splitSolution[i] || 
      (splitSolution[i]==='*' && ['E','N','T','R'].includes(letter))
    ){
      statuses[i] = 'correct'
      return
    }
  })

  return statuses
}
