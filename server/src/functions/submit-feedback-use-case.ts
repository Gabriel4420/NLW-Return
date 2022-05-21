import { MailAdapter } from '../adapters/mail-adapter'
import { FeedbacksRepository } from '../repositories/feedbacks-repository'

export interface SubmitFeedbackUseCaseRequest {
  type: string
  comment: string
  screenshot?: string
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter,
  ) {}

  async execute(req: SubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = req

    if (!type) throw new Error('type is required')
    if (!comment) throw new Error('comment is required')

    if (screenshot && !screenshot.startsWith('data:image/png;base64'))
      throw new Error('Invalid Screenshot Format')

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    })

    await this.mailAdapter.sendMail({
      subject: 'Novo Feedback',
      body: [
        `<div style="font-family:sans-serif; font-size:16px; color:#111;">`,
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Comentario: ${comment}</p>`,
        screenshot &&
          `<a href="${screenshot}" target="_blank" ><img src=${screenshot} alt="print da tela" style="width:300px;height:300px;object-fit:contain;"/></a>`,
        `</div>`,
      ].join('\n'),
    })
  }
}
