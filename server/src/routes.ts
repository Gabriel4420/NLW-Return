import { Router } from 'express'
import { SubmitFeedbackUseCase } from './functions/submit-feedback-use-case'
import { PrismaFeedbacksRepository } from './repositories/Prisma/prisma-feedbacks-repository'
import { NodemailerAdapter } from './adapters/nodemailer/nodemailer-mail-adapter'

export const routes = Router()

routes.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository()
  const nodemailerMailAdapter = new NodemailerAdapter()

  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbacksRepository,
    nodemailerMailAdapter,
  )

  await submitFeedbackUseCase.execute({ type, comment, screenshot })

  return res.status(201).send()
})
