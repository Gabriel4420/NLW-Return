import { ChatTeardropDots } from 'phosphor-react'
import { Popover } from '@headlessui/react'
import { WidgetForm } from '../WidgetForm'

export const Widget = () => {
  return (
    <Popover className="absolute bottom-4 right-4 md:right-8 md:bottom-8 flex flex-col items-end">
      <Popover.Panel>
        <WidgetForm />
      </Popover.Panel>
      <Popover.Button className="rounded-full bg-brand-500 text-white px-3 h-12 flex items-center group">
        <ChatTeardropDots className="w-6 h-6 " weight="duotone" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-700 ease-linear">
          <span className="pl-2"></span>
          Feedback
        </span>
      </Popover.Button>
    </Popover>
  )
}
