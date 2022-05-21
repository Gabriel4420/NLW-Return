//icones internos
import bugIcon from '../../assets/bug.svg'
import ideiaIcon from '../../assets/idea.svg'
import otherIcon from '../../assets/emoji.svg'
import { useState } from 'react'
import { FeedbackTypeStep } from './Steps/FeedbackTypeStep'
import { FeedbackContentStep } from './Steps/FeedbackContentStep'
import { FeedbackSuccessStep } from './Steps/FeedbackSuccessStep'

export const feedbacksTypes = {
  BUG: {
    title: 'Problema',
    image: {
      source: bugIcon,
      alt: 'Imagem de um desenho de um inseto besouro',
    },
  },
  IDEA: {
    title: 'Ideia',
    image: {
      source: ideiaIcon,
      alt: 'Imagem de um desenho de uma lampada acessa',
    },
  },
  OTHER: {
    title: 'Outro',
    image: {
      source: otherIcon,
      alt: 'Imagem de um desenho de um balão de pensamento',
    },
  },
}

export type FeedbackType = keyof typeof feedbacksTypes

export const WidgetForm = () => {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null)

  const [feedbackSent, setFeedbackSent] = useState(false)
  const handleReestartFeedback = () => {
    setFeedbackSent(false)
    setFeedbackType(null)
  }
  return (
    <div
      className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg
    w-[calc(100vw-2rem)] md:w-auto"
    >
      {feedbackSent ? (
        <FeedbackSuccessStep onFeedbackRestart={handleReestartFeedback} />
      ) : (
        <>
          {!feedbackType ? (
            <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
          ) : (
            <FeedbackContentStep
              feedbackType={feedbackType}
              onFeedbackReset={handleReestartFeedback}
              onFeedbackSent={() => setFeedbackSent(true)}
            />
          )}
        </>
      )}

      <footer className="text-xs text-neutral-400">
        feito com &#x2763; pela &nbsp;
        <a
          href="https://rocketseat.com.br"
          target="_blank"
          rel="no-referrer no-follow"
          className="underline underline-offset-2"
        >
          rocketseat
        </a>
      </footer>
    </div>
  )
}
